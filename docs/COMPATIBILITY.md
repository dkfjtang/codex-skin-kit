# Compatibility

Codex Skin Kit v0.1.0 is scoped to macOS desktop application builds that expose Chromium DevTools Protocol targets on `127.0.0.1` when launched with a local debugging port.

Windows support is not claimed in this release. Do not publish Windows installation instructions until a Windows implementation and restore path are verified.

Compatibility must be rechecked after target desktop application upgrades because DOM structure and class names may change.

## Claimed Runtime

The current release only claims the repository structure and scripts needed for macOS Codex desktop skinning. A passing Windows `npm run check` confirms static integrity, not live desktop compatibility.

## Recheck Triggers

Re-run macOS install/start/verify/restore validation when any of these changes:

- the official desktop app version;
- Chromium DevTools Protocol launch behavior;
- app bundle identifier or launch path;
- DOM structure used by the injected CSS or renderer bridge;
- screenshot, restore, or launcher scripts.
