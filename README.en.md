# Flowdeck

<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

<p align="center">
  <strong>Give Codex a face that breathes.</strong><br>
  External themes for the Codex desktop app · local CDP injection · no official package mutation
</p>

<p align="center">
  One image, one mood · code with atmosphere
</p>

<p align="center">
  Unofficial. Does not modify <code>.app</code> / <code>app.asar</code> / WindowsApps.
</p>

## Support Service

<p align="center">
  <a href="https://api.ttflows.com/">
    <img src="assets/brand/ttflows-logo.png" alt="ttflows 天梯流" height="72">
  </a>
</p>

<p align="center">
  <strong>ttflows 天梯流</strong><br>
  <sub>One-stop AI API service platform · simple integration · transparent pricing · continuous improvement</sub>
</p>

<p align="center">
  <a href="https://api.ttflows.com/"><strong>Visit ttflows 天梯流 →</strong></a>
</p>

ttflows 天梯流 is a one-stop AI API service platform that brings together multiple mainstream large models, supports OpenAI API and Anthropic API interfaces, works with many AI clients and developer tools, keeps pricing transparent, makes integration simple, and continues to improve for developers and AI enthusiasts.

Theme install and API configuration stay separate. Using ttflows is optional and not required for any skin feature; this project does not create accounts, read API keys, or change Base URL, proxy, or model-provider settings.

## Acknowledgements

This project uses and references open-source work from [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin). Thanks to the upstream author and community contributors. See [`NOTICE.md`](./NOTICE.md) and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for license and source details.

## Tested Featured Presets

### Gothic Void Crusade

One of the upstream tested featured presets, switchable through the bundled theme scripts.

<p align="center">
  <img src="docs/images/presets/gothic-void-crusade-preview.jpg" alt="Gothic Void Crusade theme running in Codex" width="900"><br>
  <sub>Real injected Codex home screen from upstream preview</sub>
</p>

### Arina Hashimoto

This preset comes from the upstream repository. The sidebar, cards, project picker, and composer shown below are native Codex controls. Confirm likeness, asset, and trademark rights before public or commercial redistribution.

<p align="center">
  <img src="docs/images/presets/arina-hashimoto-light.jpg" alt="Arina Hashimoto theme tested in light appearance" width="900"><br>
  <sub>Light · real injected screenshot from upstream preview</sub>
</p>

<p align="center">
  <img src="docs/images/presets/arina-hashimoto-dark.jpg" alt="Arina Hashimoto theme tested in dark appearance" width="900"><br>
  <sub>Dark · real injected screenshot from upstream preview</sub>
</p>

## What It Does

- **Real UI**: Sidebar, cards, project picker, and input stay native. Not a fake full-window screenshot.
- **Continuous wallpaper**: One 16:9 image spans the full window while native content stays readable.
- **Swappable art**: Drop in a UI-free image you like and turn it into a theme.
- **Saved themes**: Switch local themes from the macOS menu bar or Windows system tray.
- **Restorable**: One-click restore to the stock look.
- **Safer path**: Local-loopback CDP injection only. No official binary or signature changes.

## Quick Start

| Platform | Dir | Entry |
|------|------|------|
| Windows | [`windows/`](./windows/) | `scripts/install-dream-skin.ps1` → `start-dream-skin.ps1` |
| Apple Silicon / Intel Mac | [`macos/`](./macos/) | Double-click `Install Codex Dream Skin.command` |

Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\scripts\install-dream-skin.ps1
powershell -ExecutionPolicy Bypass -File .\windows\scripts\start-dream-skin.ps1
```

macOS:

```bash
cd macos
./scripts/install-dream-skin-macos.sh --no-launch
./scripts/start-dream-skin-macos.sh
```

More:

- Windows: [`windows/README.md`](./windows/README.md)
- macOS: [`macos/README.md`](./macos/README.md)
- Paths: [`docs/platforms.md`](./docs/platforms.md)
- Reference prompt guide: [`docs/reference-background-prompt-guide.en.md`](./docs/reference-background-prompt-guide.en.md)
- Project notes: [`docs/PROJECT.md`](./docs/PROJECT.md)

## Safety

- CDP binds `127.0.0.1` only
- Does not touch the official install directory, official binary, code signature, or `app.asar`
- Does not write API Key / Base URL / proxy / model-provider configuration
- Theme features and relay services stay separate

## License

- Based on [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin), under the upstream MIT license
- See [`macos/LICENSE`](./macos/LICENSE), [`NOTICE.md`](./NOTICE.md), and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)
- Unofficial; Codex, OpenAI, ChatGPT, and related names belong to their owners
- People / IP material in bundled presets and previews is illustrative only; confirm rights before public or commercial redistribution

---

Pick a look and make Codex yours for today.
