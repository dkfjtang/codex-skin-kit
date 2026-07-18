# Codex Skin Kit

<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

Windows-first Codex local skin toolkit, with macOS kept as a supported auxiliary path.

An installable, verifiable, and restorable local skin toolkit. Start with a theme and give your everyday coding surface a stable, reversible visual state.

| Platform | Role | Current state |
|---|---|---|
| Windows | Mainline | PowerShell install, start, verify, and restore scripts are being used |
| macOS | Auxiliary compatibility | Existing zsh scripts remain available |

External theme / skin toolkit · local CDP injection · no official app package changes. The first theme, **Signal Garden**, uses original abstract signal-grid visuals while keeping the native sidebar, project picker, feature cards, input box, and task content intact.

## Preview

## What It Does

- Windows mainline installs the local Codex skin directory at `%USERPROFILE%\.codex\skills\codex-skin-kit-signal-garden`
- Windows mainline creates desktop launch entries and injects CSS and decorative chrome into the official Codex desktop window through local `127.0.0.1` CDP
- Windows mainline backs up and writes user-level `~/.codex/config.toml` appearance theme fields during install; the restore script can roll those fields back with `-RestoreBaseTheme`
- Windows mainline uses PowerShell scripts to check injection state, export a screenshot, stop the injector process, and clean up launch entries
- macOS retains the existing zsh scripts, desktop launchers, and restore flow as an auxiliary compatibility path
- It does not read chats, cookies, tokens, or API keys, and does not automatically change model providers, Base URL, or proxy settings

## Quick Start

### Windows mainline

Requirements: Windows 11, the official Codex desktop app, PowerShell 7 or built-in Windows PowerShell, and Node.js 18 or later. The scripts look for the official app automatically, or you can point them at a specific executable path.

```powershell
git clone https://github.com/dkfjtang/codex-skin-kit.git
cd codex-skin-kit\assets\reference-skin
powershell -ExecutionPolicy Bypass -File scripts\install-signal-garden-skin.ps1
```

The installer copies the full theme to `%USERPROFILE%\.codex\skills\codex-skin-kit-signal-garden` and creates these desktop launchers:

- `Signal Garden.cmd`
- `Signal Garden - Restore.cmd`

Launch the theme:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\start-signal-garden-skin.ps1 -RestartExisting
```

Verify the theme and capture a screenshot:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-signal-garden-skin.ps1 -Screenshot "$env:USERPROFILE\Desktop\codex-skin-kit-signal-garden-check.png"
```

Restore or uninstall:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1 -RestoreBaseTheme -Uninstall
```

Running `restore-signal-garden-skin.ps1` by itself stops injection and clears the current skin effect. Adding `-RestoreBaseTheme` writes the pre-install appearance-theme backup back to `%USERPROFILE%\.codex\config.toml`.

### macOS auxiliary path

The existing zsh scripts remain available for macOS install, verify, and restore runs:

```zsh
cd codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

> Windows is the mainline path; macOS stays as a supported auxiliary compatibility path and for runtime re-verification.

## Custom Skins

The repository keeps the theme scaffolding workflow. You can generate a standalone theme package from one image and one GIF. The scaffold copies the runtime scripts, replaces the theme name/slug, and creates an installable skin directory; it does not guarantee that every image will produce a perfect layout, so installation and screenshot verification are still recommended.

```zsh
python3 scripts/scaffold_skin.py \
  --name "My Codex Skin" \
  --slug "codex-skin-kit-my-theme" \
  --description "A custom Codex desktop skin" \
  --source /absolute/path/source.png \
  --gif /absolute/path/hero.gif \
  --output /absolute/path/codex-skin-kit-my-theme
```

Use only images that you own or assets that are explicitly licensed for redistribution. Do not submit anime characters, public-figure photos, commercial logos, wallpapers with unclear origins, or images that may infringe third-party rights.

## Safety Boundaries

> This is not an official OpenAI project. It does not modify, replace, or re-sign the official app, and it does not modify `app.asar`. OpenAI, Codex, ChatGPT, and related names and marks belong to their respective owners.

- CDP must bind only to `127.0.0.1` and must not be exposed to LAN interfaces
- Decorative injected elements keep `pointer-events: none`
- The official app is not modified, unpacked, or re-signed
- Chats, account credentials, cookies, tokens, and API keys are not read
- Promotion pages are not opened automatically, and API relay configuration is not written automatically
- If adaptation fails, the original app should remain unchanged and cleanup should be available through the restore script

## Support Service

<p align="center">
  <a href="https://api.ttflows.com/">
    <img src="assets/brand/ttflows-logo.png" alt="ttflows 天梯流" width="132">
  </a>
</p>

<p align="center">
  <strong>ttflows 天梯流</strong><br>
  A one-stop AI API service platform for simple, stable model access in AI clients and developer tools.
</p>

<p align="center">
  <a href="https://api.ttflows.com/"><strong>Visit ttflows 天梯流 →</strong></a>
</p>

Codex Skin Kit is a free third-party project. Its ongoing maintenance and experience testing are supported by ttflows 天梯流.

ttflows 天梯流 is a one-stop AI API service platform that brings together multiple mainstream large models, supports OpenAI API and Anthropic API interfaces, works with many AI clients and developer tools, keeps pricing transparent, makes integration simple, and continues to improve for developers and AI enthusiasts.

Using ttflows is optional and not required for any skin feature. This project does not create accounts, read API keys, or change Base URL, proxy, or model-provider settings.

## License

Codex Skin Kit is released under the MIT License. Third-party notices are available in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
