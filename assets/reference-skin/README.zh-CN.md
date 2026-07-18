# Signal Garden

Signal Garden 是 Codex Skin Kit 内置的原创抽象主题。Windows 是当前主线；macOS 脚本保留为辅助兼容路径。

主题通过只绑定到 `127.0.0.1` 的 Chromium DevTools Protocol 动态注入，不修改、不重签官方应用，也不修改 `app.asar`。侧边栏、功能卡、项目选择器、输入框和任务内容仍保留原生 DOM 与交互。

## Windows 主线

要求：Windows 11、官方桌面版、PowerShell、Node.js 18 或更高版本。

```powershell
cd C:\path\to\codex-skin-kit\assets\reference-skin
powershell -ExecutionPolicy Bypass -File scripts\install-signal-garden-skin.ps1
```

安装器会把完整主题复制到 `%USERPROFILE%\.codex\skills\codex-skin-kit-signal-garden`，备份并设置外观主题字段，并在桌面创建：

- `Signal Garden.cmd`
- `Signal Garden - Restore.cmd`

启动、验证、恢复：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\start-signal-garden-skin.ps1 -RestartExisting
powershell -ExecutionPolicy Bypass -File scripts\verify-signal-garden-skin.ps1 -Screenshot "$env:USERPROFILE\Desktop\codex-skin-kit-signal-garden-check.png"
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1
```

同时恢复安装前的外观主题字段并删除桌面启动器：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1 -RestoreBaseTheme -Uninstall
```

## macOS 辅助路径

```zsh
cd /path/to/codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

## 素材

- `assets/signal-garden-hero.gif`：原创抽象信号网格 GIF。
- `assets/signal-garden-source.png`：原创静态主视觉；系统开启“减少动态效果”时自动使用。
- `assets/signal-garden-skin.css`：信号网格、数据节点、卡片与输入框视觉层。
