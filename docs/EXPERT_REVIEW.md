# Expert Review Notes

This review records the current truth boundary for the README focus areas.

## Implementation Review

- The repository contains real macOS shell scripts for install, launch, verify, restore, and uninstall flows.
- The runtime uses local CDP injection through `127.0.0.1`; it does not modify the official app bundle, binary signature, or `app.asar`.
- `Signal Garden` is implemented in `assets/reference-skin/assets/signal-garden-skin.css` and injected by `assets/reference-skin/assets/renderer-inject.js`.
- The README image is currently a theme-style preview generated from the theme direction, not a macOS live runtime screenshot.

## Verification Review

- Static verification is covered by `npm run check`, including branding scan, Python syntax compilation, JavaScript syntax checks, and `skin.json` parsing.
- Runtime verification is designed for macOS with the official Codex desktop app and should use:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
```

- A real macOS screenshot has not been produced in this Windows workspace. README must not call the generated preview a real runtime screenshot until that verification is completed.

## Operations And Safety Review

- CDP is intended to bind only to `127.0.0.1`.
- The restore script removes the injected skin and can uninstall local launchers.
- The project must not read conversations, cookies, tokens, or API keys.
- The project must not automatically change model providers, Base URL, proxy settings, or ttflows configuration.

## Recommendation

Keep the existing reused runtime approach, but keep the README wording tied to proven behavior. Replace the generated theme-style preview with a real macOS verification screenshot once available.
