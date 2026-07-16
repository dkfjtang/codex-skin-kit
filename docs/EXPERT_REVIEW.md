# Expert Review Notes

This review records the current truth boundary for the README focus areas.

## Review Status

- Review date: 2026-07-16.
- Scope: README truth boundary, Signal Garden runtime assets, static verification, screenshot provenance, and support-service placement.
- Runtime status: macOS live installation and CDP injection were not executed in this Windows workspace.
- Screenshot status: the README currently uses a generated theme-style preview, not a locally verified runtime screenshot.

## Implementation Review

- The repository contains real macOS shell scripts for install, launch, verify, restore, and uninstall flows.
- The runtime uses local CDP injection through `127.0.0.1`; it does not modify the official app bundle, binary signature, or `app.asar`.
- `Signal Garden` is implemented in `assets/reference-skin/assets/signal-garden-skin.css` and injected by `assets/reference-skin/assets/renderer-inject.js`.
- The README image is currently a theme-style preview generated from the theme direction, not a macOS live runtime screenshot.
- Legacy money/cat presentation markers are prohibited by `scripts/check-branding.mjs`; the injected chrome now uses Signal Garden/local visual-layer wording.

## Verification Review

- Static verification is covered by `npm run check`, including branding scan, Python syntax compilation, JavaScript syntax checks, and `skin.json` parsing.
- Runtime verification is designed for macOS with the official Codex desktop app and should use:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
```

- A real macOS screenshot has not been produced in this Windows workspace. README must not call the generated preview a real runtime screenshot until that verification is completed.
- If a third-party screenshot is used before local macOS verification is available, README must describe it as a community-provided runtime reference screenshot. The source, reuse permission, sensitive-content check, and lack of local re-verification must be recorded before publishing.

## Operations And Safety Review

- CDP is intended to bind only to `127.0.0.1`.
- The restore script removes the injected skin and can uninstall local launchers.
- The project must not read conversations, cookies, tokens, or API keys.
- The project must not automatically change model providers, Base URL, proxy settings, or ttflows configuration.
- The ttflows reference remains in the README support-service section and is not required by install, start, verify, or restore flows.

## Cross-Check

- Chinese and English READMEs describe the same install, start, verify, and restore commands.
- The Chinese default README now contains an explicit preview image and states that it is generated, not a local macOS runtime capture.
- `docs/RELEASE.md` requires provenance and permission review before a third-party screenshot can be published.
- Runtime claims are cross-checked against `install-signal-garden-skin.sh`, `start-signal-garden-skin.sh`, `verify-signal-garden-skin.sh`, `restore-signal-garden-skin.sh`, and `injector.mjs`.

## Re-Validation

- Required static command: `npm run check`.
- Required residue scan: `rg -n 'old theme signature|money symbol|paw marker' assets README.md README.en.md` should have no matches after translating those labels into the concrete legacy markers under review.
- macOS install, injection, screenshot, and restore remain explicitly not executed.

## Recommendation

Keep the existing reused runtime approach, but keep the README wording tied to proven behavior. Prefer replacing the generated theme-style preview with a real macOS verification screenshot once available. If a third-party screenshot is used as an interim hero image, treat it as a licensed reference asset, not as local verification evidence.
