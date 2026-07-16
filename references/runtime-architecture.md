# Runtime architecture

## Data flow

1. The launcher discovers the official app by bundle id `com.openai.codex`.
2. It starts Codex with a loopback remote-debugging address and chosen port.
3. `injector.mjs` reads CSS, renderer JS, animated GIF, and static PNG.
4. The injector connects to `app://` renderer targets through CDP.
5. The renderer payload attaches one style node and one decorative chrome node.
6. A mutation observer and low-frequency timer repair the skin after route changes.
7. Restore calls the renderer cleanup function, stops the watcher, and optionally restores base theme keys.

## Fragile points

- The application may be named `ChatGPT.app` or `Codex.app`; trust the bundle id, not the filename.
- Node.js 18 does not provide the same WebSocket surface as newer releases. Keep the bundled zero-install WebSocket client.
- CDP payloads can contain multi-megabyte GIF data URLs. Preserve large-frame handling in the WebSocket client.
- DOM class names can change after Codex upgrades. Prefer semantic hooks and verify by screenshot.
- A page reload invalidates renderer state. The watcher must detect and reapply.
- Multiple skins must not stack. Clean known prior state before applying a new theme.
- Decorative chrome must follow `main.main-surface` bounds and remain non-interactive.

## Theme config restore

Only manage the desktop appearance keys owned by the skin. On restore:

- restore prior values for keys that existed;
- remove only owned keys that did not exist before;
- retain unrelated settings added after install;
- remove an empty `[desktop]` section only when the backup had no such section.

## Port and state isolation

Use a per-skin state directory and a validated port in `1024..65535`. Bind to `127.0.0.1`. Before launch, detect whether the port belongs to a Codex CDP target; never attach blindly to an unrelated service.
