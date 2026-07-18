# Development

Use `npm run check` for static validation.

The bundled Signal Garden runtime is under `assets/reference-skin/`. Keep runtime identifiers, state directories, CSS classes, and environment variables unique to Codex Skin Kit so it does not collide with other local theme projects.

Do not add generated or third-party imagery unless the redistribution rights are clear and recorded.

## Local Validation

Run this before committing public-facing changes:

```powershell
npm run check
```

The check currently covers:

- branding and legacy-theme residue scanning;
- README section order, Chinese-default entry, support-service placement, and ttflows wording;
- README screenshot-mode consistency;
- screenshot review-gate regression cases;
- PowerShell syntax checks for Windows mainline scripts when PowerShell is available;
- Python syntax checks for helper scripts;
- JavaScript syntax checks for the injector and renderer bridge;
- `skin.json` JSON parsing.

## Screenshot Modes

The README preview section must be in exactly one mode:

- `pending`: the README preview section is intentionally empty;
- `generated`: the current repository-generated theme-style preview;
- `thirdParty`: a community-provided runtime reference screenshot with completed source, permission, and sensitive-content review;
- `verified`: a real macOS runtime screenshot produced by this repository's verification script.

Do not mix these modes in README wording. If a third-party image is used, complete `docs/SCREENSHOT_REVIEW.md` before replacing the hero asset.

## Runtime Validation

Windows is the mainline runtime path. Validate it with the official desktop app before claiming live Windows support:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\install-signal-garden-skin.ps1
powershell -ExecutionPolicy Bypass -File scripts\start-signal-garden-skin.ps1 -RestartExisting
powershell -ExecutionPolicy Bypass -File scripts\verify-signal-garden-skin.ps1 -Screenshot "$env:USERPROFILE\Desktop\codex-skin-kit-signal-garden-check.png"
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1 -RestoreBaseTheme -Uninstall
```

macOS remains an auxiliary compatibility path:

```zsh
/bin/zsh scripts/install-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh
```

Record runtime evidence in `docs/EXPERT_REVIEW.md` before describing the README preview section as a verified runtime screenshot.
