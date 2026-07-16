# QA

## Static checks

```zsh
for f in scripts/*.sh; do /bin/zsh -n "$f"; done
for f in scripts/*.mjs assets/renderer-inject.js; do node --check "$f"; done
node -e 'JSON.parse(require("fs").readFileSync("skin.json", "utf8"))'
rg -n '/Users/|/tmp/|TemporaryItems|generated_images' .
```

Confirm every `skin.json` path exists and every shell script is executable in the release folder.

## Media checks

Use an image library to confirm:

- the PNG is a wide RGB/RGBA image;
- the GIF is wide, has more than one frame, and loops forever;
- frame duration is stable;
- the subject is not cropped and left-side copy space remains usable;
- reduced motion selects the PNG.

## Isolated install/restore

Create a temporary HOME with a sample `~/.codex/config.toml`, install into it, and set `CODEX_*_DESKTOP_DIR` to its Desktop. Confirm both `.app` launchers and the copied skill exist. Add an unrelated config key after install, then restore with `--restore-base-theme --uninstall`.

The final config must preserve both the original content and the unrelated post-install key. No launcher should remain.

## Live validation

Run only with user permission when it could restart the active Codex process.

Verify:

- style and decorative nodes exist once;
- decorative chrome has `pointer-events: none`;
- home hero, suggestion cards, project selector, sidebar, and composer have plausible bounds;
- normal task pages remain readable;
- no horizontal document overflow;
- reload and route change reapply once;
- restore removes the root class, style node, chrome node, and watcher state.

Capture and visually inspect a screenshot. A passing DOM probe is necessary but not sufficient.

## Release

- Re-run static checks after the last visual edit.
- Build the ZIP from the folder's parent so the archive has one top-level directory.
- List archive contents and compute SHA-256.
- Report any live check skipped due to lack of permission.
