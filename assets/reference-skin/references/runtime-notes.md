# Runtime notes

- The launcher discovers the signed app by Bundle ID `com.openai.codex`; current macOS releases may still use `/Applications/ChatGPT.app/Contents/MacOS/ChatGPT`.
- It launches with `--remote-debugging-address=127.0.0.1 --remote-debugging-port=<port>` and injects through CDP.
- Default port is `9335`; keep a custom port consistent across start, verify, and restore.
- The injector polls app page targets and reinjects after document loads. Renderer-side mutation observation covers in-page route changes.
- State and logs live under `~/Library/Application Support/CodexSkinKitSignalGarden`.
- The installer copies the entire skill to `~/.codex/skills/codex-skin-kit-signal-garden`; desktop launchers point to this stable path.
- The animated GIF is converted to a blob URL in the renderer. Reduced-motion mode selects `signal-garden-source.png` before creating the blob URL.
- The start script stops the known previous theme daemon; the renderer also calls previous theme cleanup so visual layers do not mix.
- Environment overrides are `CODEX_SKIN_KIT_SIGNAL_GARDEN_APP_PATH`, `CODEX_SKIN_KIT_SIGNAL_GARDEN_NODE`, `CODEX_SKIN_KIT_SIGNAL_GARDEN_STATE_ROOT`, `CODEX_SKIN_KIT_SIGNAL_GARDEN_CONFIG_PATH`, and `CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR`.

