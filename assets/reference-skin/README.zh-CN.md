# Signal Garden（macOS）

Signal Garden 是 Codex Skin Kit 内置的原创抽象主题。顶部使用本仓生成的信号网格视觉，侧边栏、功能卡、项目选择器、输入框和任务内容仍保留原生 DOM 与交互，不是整张截图覆盖。

主题通过只绑定到 `127.0.0.1` 的 Chromium DevTools Protocol 动态注入，不修改、不重签官方 `.app`，也不修改 `app.asar`。支持页面刷新、任务切换、应用重启、升级后重新应用和一键恢复。

## 首次安装

要求：macOS 12 或更高版本、官方桌面版、Node.js 18 或更高版本。

```zsh
cd /path/to/codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
```

安装器会把完整主题复制到 `~/.codex/skills/codex-skin-kit-signal-garden`，备份并设置基础主题，在桌面创建：

- `Signal Garden.app`
- `Signal Garden - Restore.app`

以后双击 `Signal Garden` 即可启动。若其他本地主题正在运行，请先恢复旧主题，避免两套主题叠加。

## 验证与恢复

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh
```

同时恢复安装前的基础配色并删除桌面启动器：

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

## 素材

- `assets/signal-garden-hero.gif`：原创抽象信号网格 GIF。
- `assets/signal-garden-source.png`：原创静态主视觉；系统开启“减少动态效果”时自动使用此图。
- `assets/signal-garden-skin.css`：信号网格、数据节点、卡片与输入框视觉层。
- 状态与日志位于 `~/Library/Application Support/CodexSkinKitSignalGarden`。