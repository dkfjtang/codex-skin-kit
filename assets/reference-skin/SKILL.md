---
name: codex-skin-kit-signal-garden
description: Apply, launch, verify, update, or restore the Signal Garden theme for the Windows-first Codex desktop skin path, with macOS compatibility scripts retained. Use when the user wants an abstract signal-grid visual layer, loopback-only CDP reinjection, or a safe rollback without modifying app.asar.
---

# Signal Garden

Apply a reversible animated renderer theme through Chromium DevTools Protocol. Windows is the mainline path; macOS scripts remain available as an auxiliary compatibility path. Never modify or re-sign the official application bundle, executable, or `app.asar`.

## Windows Mainline

1. Run `scripts/install-signal-garden-skin.ps1` once. It installs the complete skill under `%USERPROFILE%\.codex\skills\codex-skin-kit-signal-garden`, backs up appearance theme settings, and creates desktop command launchers.
2. Run `scripts/start-signal-garden-skin.ps1`; add `-RestartExisting` only when restarting an open app is authorized.
3. Run `scripts/verify-signal-garden-skin.ps1 -Screenshot <absolute-path>` and inspect against `references/qa-inventory.md`.
4. Run `scripts/restore-signal-garden-skin.ps1` for live removal. Add `-Uninstall` to delete launchers and `-RestoreBaseTheme` to restore backed-up appearance theme fields.

## macOS Auxiliary Path

1. Run `scripts/install-signal-garden-skin.sh` once.
2. Run `scripts/start-signal-garden-skin.sh`; add `--restart-existing` only when restarting an open app is authorized.
3. Run `scripts/verify-signal-garden-skin.sh --screenshot <absolute-path>`.
4. Run `scripts/restore-signal-garden-skin.sh`; add `--uninstall` and `--restore-base-theme` when needed.

## Rules

- Preserve the official executable, signature, user tasks, projects, plugins, skills, and authentication state.
- Use `signal-garden-hero.gif` only inside the hero and decorative node crop. Keep feature cards, project selector, composer, sidebar, and navigation native and clickable.
- Keep CDP on `127.0.0.1` only.
- On reduced-motion systems use `signal-garden-source.png` and disable CSS animations.
- Do not configure TTFlows automatically. Promotion links must stay user-initiated.
