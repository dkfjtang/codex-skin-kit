# Codex Skin Kit

<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

Make Codex desktop easier on the eyes and closer to your own workspace.

An installable, verifiable, and restorable local skin toolkit. Start with an image and give your everyday coding surface a stable, reversible visual state.

External theme / skin toolkit · local CDP injection · no official app package changes. The first theme, **Signal Garden**, uses original abstract signal-grid visuals while keeping the native sidebar, project picker, feature cards, input box, and task content intact.

## Preview

## What It Does

- Installs a local Codex skin directory at `~/.codex/skills/codex-skin-kit-signal-garden`
- Creates `Signal Garden.app` and `Signal Garden - Restore.app` desktop launchers
- Injects CSS and decorative chrome into the official Codex desktop window through local `127.0.0.1` CDP
- Keeps the native Codex DOM and interactions instead of covering the window with a screenshot or replacing the app package
- Backs up and writes user-level `~/.codex/config.toml` appearance theme fields during install; the restore script can roll those fields back with `--restore-base-theme`
- Uses `verify-signal-garden-skin.sh` to check injection state and optionally export a screenshot
- Uses `restore-signal-garden-skin.sh` to remove the skin, stop the injector process, and optionally uninstall launchers
- Does not read chats, cookies, tokens, or API keys, and does not automatically change model providers, Base URL, or proxy settings

## Quick Start

Requirements: macOS 12 or later, the official Codex desktop app, and Node.js 18 or later. The scripts look for the official app with Bundle ID `com.openai.codex` and bind only to a local `127.0.0.1` debugging port.

```zsh
git clone https://github.com/dkfjtang/codex-skin-kit.git
cd codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
```

The installer copies the full theme to `~/.codex/skills/codex-skin-kit-signal-garden` and creates these desktop launchers:

- `Signal Garden.app`
- `Signal Garden - Restore.app`

The installer also backs up the current `~/.codex/config.toml` into the skin state directory and writes Codex appearance-theme fields so the desktop app can load Signal Garden's base theme settings. This configuration change is limited to appearance fields; it does not write model, Base URL, proxy, or API key settings.

Launch the theme:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
```

Verify the theme and capture a screenshot:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
```

Restore or uninstall:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

Running `restore-signal-garden-skin.sh` by itself stops injection and clears the current skin effect. Adding `--restore-base-theme` writes the pre-install appearance-theme backup back to `~/.codex/config.toml`.

> The first run may require closing existing Codex windows or explicitly using `--restart-existing`. Do not restart an active user window without permission.

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
