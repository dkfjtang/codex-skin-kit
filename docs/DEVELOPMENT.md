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
- Python syntax checks for helper scripts;
- JavaScript syntax checks for the injector and renderer bridge;
- `skin.json` JSON parsing.

## Screenshot Modes

The README hero must be in exactly one mode:

- `generated`: the current repository-generated theme-style preview;
- `thirdParty`: a community-provided runtime reference screenshot with completed source, permission, and sensitive-content review;
- `verified`: a real macOS runtime screenshot produced by this repository's verification script.

Do not mix these modes in README wording. If a third-party image is used, complete `docs/SCREENSHOT_REVIEW.md` before replacing the hero asset.

## Runtime Validation

macOS runtime validation is separate from Windows static validation. On macOS, validate the full path:

```zsh
/bin/zsh scripts/install-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh
```

Record runtime evidence in `docs/EXPERT_REVIEW.md` before describing the README hero as a verified runtime screenshot.
