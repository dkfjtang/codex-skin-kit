#!/usr/bin/env node
const path = require("node:path");
const sharp = require("sharp");

const input = path.resolve(process.argv[2] || path.join(__dirname, "..", "assets", "signal-garden-source.png"));
const output = path.resolve(process.argv[3] || path.join(__dirname, "..", "assets", "signal-garden-hero.gif"));
const width = 1264;
const height = 553;
const frameCount = 12;

function overlaySvg(frame) {
  const phase = (frame / frameCount) * Math.PI * 2;
  const glow = 0.14 + (Math.sin(phase) + 1) * 0.08;
  const coins = [
    { x: 1120, baseY: 120, r: 11, speed: 1 },
    { x: 1048, baseY: 70, r: 8, speed: 1.35 },
    { x: 1180, baseY: 20, r: 7, speed: 0.8 },
  ].map((coin, index) => {
    const y = (coin.baseY + frame * 25 * coin.speed) % 420;
    const rotate = frame * 21 + index * 33;
    return `<g transform="translate(${coin.x} ${y}) rotate(${rotate})">
      <ellipse rx="${coin.r}" ry="${Math.max(3, coin.r * Math.abs(Math.cos(phase + index)))}" fill="#f4b92f" stroke="#9b5c16" stroke-width="2"/>
      <path d="M-${coin.r / 2} 0h${coin.r}" stroke="#fff0a5" stroke-width="1.5" stroke-linecap="round"/>
    </g>`;
  }).join("");
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="pay"><stop stop-color="#fff7b0" stop-opacity="${glow}"/><stop offset="1" stop-color="#ffcd4f" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="1010" cy="469" rx="174" ry="72" fill="url(#pay)"/>
    ${coins}
    <g transform="translate(1086 472) scale(${1 + Math.sin(phase) * 0.08})">
      <path d="M0-10L3-3L10 0L3 3L0 10L-3 3L-10 0L-3-3Z" fill="#fff4b7" opacity="${0.55 + glow}"/>
    </g>
  </svg>`);
}

(async () => {
  const metadata = await sharp(input).metadata();
  const frames = [];
  for (let frame = 0; frame < frameCount; frame += 1) {
    const phase = (frame / frameCount) * Math.PI * 2;
    const zoom = 1.018 + Math.sin(phase) * 0.009;
    const cropWidth = Math.round(metadata.width / zoom);
    const cropHeight = Math.round(metadata.height / zoom);
    const maxLeft = metadata.width - cropWidth;
    const maxTop = metadata.height - cropHeight;
    const left = Math.max(0, Math.min(maxLeft, Math.round(maxLeft * (0.5 + Math.sin(phase) * 0.22))));
    const top = Math.max(0, Math.min(maxTop, Math.round(maxTop * (0.5 + Math.cos(phase) * 0.18))));
    const raw = await sharp(input)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(width, height, { fit: "fill" })
      .composite([{ input: overlaySvg(frame), blend: "over" }])
      .ensureAlpha()
      .raw()
      .toBuffer();
    frames.push(raw);
  }
  await sharp(Buffer.concat(frames), {
    raw: { width, height: height * frameCount, channels: 4, pageHeight: height },
  })
    .gif({ loop: 0, delay: Array(frameCount).fill(110), colours: 128, dither: 0.55, effort: 5 })
    .toFile(output);
  const result = await sharp(output, { animated: true }).metadata();
  console.log(JSON.stringify({ output, width: result.width, pageHeight: result.pageHeight, pages: result.pages, loop: result.loop, delay: result.delay }));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
