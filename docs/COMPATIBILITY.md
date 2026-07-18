# Compatibility

Codex Skin Kit v0.1.0 is moving to a Windows-first runtime path while retaining the existing macOS scripts as an auxiliary compatibility path.

## Platform Scope

| Platform | Status | Notes |
|---|---|---|
| Windows | Mainline | PowerShell install, start, verify, and restore scripts are included. |
| macOS | Auxiliary compatibility | Existing zsh scripts remain available and must not be deleted. |

Both paths use loopback-only Chromium DevTools Protocol targets on `127.0.0.1`.

## Validation Boundary

Passing `npm run check` proves static integrity, README structure, screenshot-mode consistency, JavaScript/Python syntax, and PowerShell syntax when PowerShell is available.

It does not prove live desktop injection unless install/start/verify/restore is run on the target platform with the official desktop app.

## Recheck Triggers

Re-run platform validation when any of these changes:

- the official desktop app version;
- Chromium DevTools Protocol launch behavior;
- Windows executable path discovery;
- macOS app bundle identifier or launch path;
- DOM structure used by the injected CSS or renderer bridge;
- screenshot, restore, or launcher scripts.
