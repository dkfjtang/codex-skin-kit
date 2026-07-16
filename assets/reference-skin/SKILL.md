---
name: flowdeck-signal-garden
description: Apply, launch, verify, update, or restore the Signal Garden theme for the macOS desktop app. Use when the user wants an abstract TTFlows signal-grid visual layer, update-safe CDP reinjection, or a safe rollback without modifying app.asar.
---

# Signal Garden

Apply a reversible animated renderer theme through Chromium DevTools Protocol while launching the official app discovered by Bundle ID `com.openai.codex`. Never modify or re-sign the official application bundle or `app.asar`.

## Commands

1. Run `scripts/install-signal-garden-skin.sh` once. It installs the complete skill under `~/.codex/skills/flowdeck-signal-garden`, sets matching base colors, and creates desktop launch/restore apps.
2. Run `scripts/start-signal-garden-skin.sh`; add `--restart-existing` only when restarting an open app is authorized.
3. Run `scripts/verify-signal-garden-skin.sh --screenshot <absolute-path>` and inspect against `references/qa-inventory.md`.
4. Run `scripts/restore-signal-garden-skin.sh` for live removal. Add `--uninstall` to delete launchers and `--restore-base-theme` to restore backed-up base colors.

## Rules

- Preserve the official executable, signature, user tasks, projects, plugins, skills, and authentication state.
- Use `signal-garden-hero.gif` only inside the hero and decorative node crop. Keep feature cards, project selector, composer, sidebar, and navigation native and clickable.
- Keep CDP on `127.0.0.1` only.
- On reduced-motion systems use `signal-garden-source.png` and disable CSS animations.
- Do not configure TTFlows automatically. Promotion links must stay user-initiated.