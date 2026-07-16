---
name: codex-skin-kit
description: Build distributable macOS desktop themes from authorized artwork or an original visual brief. Use when Codex needs to create or update a Codex Skin Kit theme with a static hero, optional animated GIF, native interactive controls preserved, loopback-only CDP injection, install/activate/verify/restore scripts, and a shareable package without modifying app.asar.
---

# Codex Skin Kit

Create a complete local theme package, not a screenshot overlay. Preserve the target desktop application's native DOM and interactions while changing the visual layer.

## Required Outcome

Deliver all of the following:

- Authorized source artwork and optional animated hero GIF.
- Theme CSS and renderer injection code.
- macOS install, activate, verify, and restore scripts.
- A `skin.json` manifest and skill metadata.
- A complete folder ready for packaging.
- Evidence from static validation and, when authorized, isolated install/restore validation.

Use the bundled implementation under `assets/reference-skin/` as the runtime base. Do not rebuild CDP/WebSocket logic from memory unless the bundled implementation is incompatible with the installed desktop version.

## Safety Invariants

- Never modify, replace, re-sign, or unpack the official desktop application or `app.asar`.
- Bind the debugging endpoint to `127.0.0.1`; never expose it on a LAN interface.
- Keep decorative injected elements `pointer-events: none`.
- Provide a live cleanup path and a full base-theme restore path.
- Do not terminate or restart the user's active window without explicit permission.
- Run initial installation tests with an isolated `HOME` and desktop directory.
- Treat reference images and linked IP as user-provided creative direction. Confirm redistribution rights when unclear.

## TTFlows Boundary

TTFlows 天梯流 may be mentioned as the maintainer's independent AI API service, but Codex Skin Kit must not automatically register accounts, change API keys, replace Base URLs, or route traffic through TTFlows.

## Validation

Before release, run:

```zsh
npm run check
```

Only claim live-app verification when a screenshot or manual inspection was actually completed.