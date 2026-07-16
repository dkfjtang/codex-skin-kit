import crypto from "node:crypto";
import net from "node:net";

// Node 20+ exposes a browser-compatible WebSocket. desktop users on macOS often
// still have Node 18, so keep a small dependency-free RFC 6455 client here.
class NodeWebSocket {
  constructor(address) {
    this.url = new URL(address);
    this.listeners = new Map();
    this.buffer = Buffer.alloc(0);
    this.fragments = [];
    this.fragmentOpcode = null;
    this.readyState = 0;
    this.socket = null;
    this.connect();
  }

  addEventListener(type, listener, options = {}) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push({ listener, once: Boolean(options.once) });
    this.listeners.set(type, listeners);
  }

  dispatch(type, event = {}) {
    const listeners = [...(this.listeners.get(type) ?? [])];
    for (const entry of listeners) {
      try { entry.listener(event); } catch (error) { queueMicrotask(() => { throw error; }); }
      if (entry.once) {
        const current = this.listeners.get(type) ?? [];
        this.listeners.set(type, current.filter((candidate) => candidate !== entry));
      }
    }
  }

  connect() {
    if (this.url.protocol !== "ws:") {
      queueMicrotask(() => this.dispatch("error", new Error(`Unsupported WebSocket URL: ${this.url}`)));
      return;
    }
    const port = Number(this.url.port || 80);
    const key = crypto.randomBytes(16).toString("base64");
    const expectedAccept = crypto
      .createHash("sha1")
      .update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
      .digest("base64");
    const socket = net.createConnection({ host: this.url.hostname, port });
    this.socket = socket;
    let handshake = Buffer.alloc(0);
    let upgraded = false;

    socket.once("connect", () => {
      const resource = `${this.url.pathname}${this.url.search}`;
      socket.write([
        `GET ${resource} HTTP/1.1`,
        `Host: ${this.url.host}`,
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Key: ${key}`,
        "Sec-WebSocket-Version: 13",
        "",
        "",
      ].join("\r\n"));
    });
    socket.on("data", (chunk) => {
      if (upgraded) {
        this.consume(chunk);
        return;
      }
      handshake = Buffer.concat([handshake, chunk]);
      const end = handshake.indexOf("\r\n\r\n");
      if (end < 0) return;
      const header = handshake.subarray(0, end).toString("utf8");
      const remainder = handshake.subarray(end + 4);
      const status = header.split("\r\n", 1)[0];
      const accept = header.match(/^sec-websocket-accept:\s*(.+)$/im)?.[1]?.trim();
      if (!/^HTTP\/1\.[01] 101\b/.test(status) || accept !== expectedAccept) {
        socket.destroy(new Error(`WebSocket upgrade failed: ${status}`));
        return;
      }
      upgraded = true;
      this.readyState = 1;
      this.dispatch("open", {});
      if (remainder.length) this.consume(remainder);
    });
    socket.on("error", (error) => this.dispatch("error", error));
    socket.on("close", () => {
      const wasClosed = this.readyState === 3;
      this.readyState = 3;
      if (!wasClosed) this.dispatch("close", {});
    });
  }

  consume(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (this.buffer.length >= 2) {
      const first = this.buffer[0];
      const second = this.buffer[1];
      const final = Boolean(first & 0x80);
      const opcode = first & 0x0f;
      const masked = Boolean(second & 0x80);
      let length = second & 0x7f;
      let offset = 2;
      if (length === 126) {
        if (this.buffer.length < 4) return;
        length = this.buffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        if (this.buffer.length < 10) return;
        const largeLength = this.buffer.readBigUInt64BE(2);
        if (largeLength > BigInt(Number.MAX_SAFE_INTEGER)) {
          this.socket.destroy(new Error("WebSocket frame is too large"));
          return;
        }
        length = Number(largeLength);
        offset = 10;
      }
      const maskOffset = offset;
      if (masked) offset += 4;
      if (this.buffer.length < offset + length) return;
      const mask = masked ? Buffer.from(this.buffer.subarray(maskOffset, maskOffset + 4)) : null;
      const payload = Buffer.from(this.buffer.subarray(offset, offset + length));
      this.buffer = this.buffer.subarray(offset + length);
      if (masked) {
        for (let index = 0; index < payload.length; index += 1) payload[index] ^= mask[index % 4];
      }
      this.handleFrame(opcode, final, payload);
    }
  }

  handleFrame(opcode, final, payload) {
    if (opcode === 0x8) {
      if (this.readyState === 1) this.writeFrame(0x8, payload);
      this.readyState = 3;
      this.socket.end();
      this.dispatch("close", {});
      return;
    }
    if (opcode === 0x9) {
      this.writeFrame(0xA, payload);
      return;
    }
    if (opcode === 0xA) return;
    if (opcode === 0x1 || opcode === 0x2) {
      if (final) this.emitMessage(opcode, payload);
      else {
        this.fragmentOpcode = opcode;
        this.fragments = [payload];
      }
      return;
    }
    if (opcode === 0x0 && this.fragmentOpcode !== null) {
      this.fragments.push(payload);
      if (final) {
        this.emitMessage(this.fragmentOpcode, Buffer.concat(this.fragments));
        this.fragmentOpcode = null;
        this.fragments = [];
      }
    }
  }

  emitMessage(opcode, payload) {
    this.dispatch("message", { data: opcode === 0x1 ? payload.toString("utf8") : payload });
  }

  writeFrame(opcode, value) {
    if (!this.socket || this.socket.destroyed) return;
    const payload = Buffer.isBuffer(value) ? value : Buffer.from(String(value));
    const mask = crypto.randomBytes(4);
    let header;
    if (payload.length < 126) {
      header = Buffer.alloc(2);
      header[1] = 0x80 | payload.length;
    } else if (payload.length <= 0xffff) {
      header = Buffer.alloc(4);
      header[1] = 0x80 | 126;
      header.writeUInt16BE(payload.length, 2);
    } else {
      header = Buffer.alloc(10);
      header[1] = 0x80 | 127;
      header.writeBigUInt64BE(BigInt(payload.length), 2);
    }
    header[0] = 0x80 | opcode;
    const masked = Buffer.allocUnsafe(payload.length);
    for (let index = 0; index < payload.length; index += 1) masked[index] = payload[index] ^ mask[index % 4];
    this.socket.write(Buffer.concat([header, mask, masked]));
  }

  send(value) {
    if (this.readyState !== 1) throw new Error("WebSocket is not open");
    this.writeFrame(0x1, value);
  }

  close() {
    if (this.readyState === 3) return;
    if (this.readyState === 1) this.writeFrame(0x8, Buffer.alloc(0));
    this.readyState = 3;
    this.socket?.end();
  }
}

export function createWebSocket(address) {
  return typeof globalThis.WebSocket === "function"
    ? new globalThis.WebSocket(address)
    : new NodeWebSocket(address);
}

