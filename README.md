# Codex Skin Kit

<p align="center">
  <strong>中文</strong> · <a href="./README.en.md">English</a>
</p>

Windows-first 的 Codex 本地换肤工具，macOS 兼容路径保留但不作为主线。

这是一套可安装、可验证、可恢复的本地皮肤工具；从一套主题开始，给日常编码界面换一种稳定、可回退的视觉状态。

| 平台 | 角色 | 现状 |
|---|---|---|
| Windows | 主线 | PowerShell 安装、启动、验证、恢复脚本在推进中 |
| macOS | 辅助兼容 | 现有 zsh 脚本保留，可继续使用 |

外部主题 / 换肤工具 · 本机 CDP 注入 · 不改官方安装包。首版主题 **Signal Garden** 使用原创抽象信号网格视觉，同时保留原生侧边栏、项目选择器、功能卡、输入框和任务内容。

## 效果预览

## 它能做什么

- Windows 主线可把本地 Codex 皮肤目录安装到 `%USERPROFILE%\.codex\skills\codex-skin-kit-signal-garden`
- Windows 主线可创建桌面启动入口，并通过 `127.0.0.1` 本机 CDP 注入 CSS 和装饰层
- Windows 主线会备份并写入用户级 `~/.codex/config.toml` 的外观主题字段；恢复脚本可用 `-RestoreBaseTheme` 回退这部分配置
- Windows 主线可用 PowerShell 脚本检查注入状态、导出截图、停止注入并清理桌面入口
- macOS 辅助路径保留现有 `.sh` 脚本、桌面启动器和恢复逻辑
- 不读取对话、Cookie、Token 或 API Key，不自动修改模型供应商、Base URL 或代理配置

## 快速开始

### Windows 主线

要求：Windows 11、官方 Codex 桌面版、PowerShell 7 或内置 Windows PowerShell、Node.js 18 或更高版本。脚本默认寻找本机 Codex 可执行文件，也可以用 `-AppPath` 或环境变量手动指定。

```powershell
git clone https://github.com/dkfjtang/codex-skin-kit.git
cd codex-skin-kit\assets\reference-skin
powershell -ExecutionPolicy Bypass -File scripts\install-signal-garden-skin.ps1
```

安装器会把完整主题复制到 `%USERPROFILE%\.codex\skills\codex-skin-kit-signal-garden`，并在桌面创建：

- `Signal Garden.cmd`
- `Signal Garden - Restore.cmd`

启动主题：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\start-signal-garden-skin.ps1 -RestartExisting
```

验证主题并截图：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-signal-garden-skin.ps1 -Screenshot "$env:USERPROFILE\Desktop\codex-skin-kit-signal-garden-check.png"
```

恢复或卸载：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1
powershell -ExecutionPolicy Bypass -File scripts\restore-signal-garden-skin.ps1 -RestoreBaseTheme -Uninstall
```

运行 `restore-signal-garden-skin.ps1` 会停止注入并清理当前皮肤效果；加上 `-RestoreBaseTheme` 时，会把安装前备份的外观主题配置写回 `%USERPROFILE%\.codex\config.toml`。

### macOS 辅助路径

现有 zsh 脚本仍然可用，适合 macOS 环境继续做实机验证和截图补充：

```zsh
cd codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

> Windows 和 macOS 的入口各自保留，主线是 Windows；macOS 只作为辅助兼容与复验路径。

## 自定义皮肤

仓库保留主题脚手架能力，可基于一张图片和一个 GIF 生成独立主题包。脚手架会复制运行脚本、替换主题名称/slug，并生成可安装的皮肤目录；它不会自动保证任何图片都能得到完美布局，生成后仍建议运行安装和验证截图。

```zsh
python3 scripts/scaffold_skin.py \
  --name "My Codex Skin" \
  --slug "codex-skin-kit-my-theme" \
  --description "A custom Codex desktop skin" \
  --source /absolute/path/source.png \
  --gif /absolute/path/hero.gif \
  --output /absolute/path/codex-skin-kit-my-theme
```

请只使用你拥有使用权的图片或明确允许再分发的素材。不要提交动漫角色、公众人物照片、商业 Logo、来源不明壁纸或可能侵犯第三方权利的图片。

## 安全边界

> 非 OpenAI 官方项目。不修改、替换、重签官方应用，也不修改 `app.asar`。OpenAI、Codex、ChatGPT 及相关名称和标识归各自权利人所有。

- CDP 仅绑定 `127.0.0.1`，不得暴露到局域网接口
- 装饰性注入元素保持 `pointer-events: none`
- 不修改、不解包、不重签官方应用
- 不读取聊天内容、账号凭证、Cookie、Token 或 API Key
- 不自动打开推广页面，不自动写入中转站配置
- 适配失败时应保持原应用不变，并可通过恢复脚本清理

## 支持服务

<p align="center">
  <a href="https://api.ttflows.com/">
    <img src="assets/brand/ttflows-logo.png" alt="ttflows 天梯流" width="132">
  </a>
</p>

<p align="center">
  <strong>ttflows 天梯流</strong><br>
  一站式 AI API 服务平台，给各类 AI 客户端和开发工具提供简单稳定的模型接入体验。
</p>

<p align="center">
  <a href="https://api.ttflows.com/"><strong>访问 ttflows 天梯流 →</strong></a>
</p>

Codex Skin Kit 是免费分享的第三方项目，持续维护与体验测试由 ttflows 天梯流提供支持服务。

ttflows 天梯流是一站式 AI API 服务平台，汇聚多种主流大模型，支持 OpenAI API 和 Anthropic API 接口，兼容各类 AI 客户端和开发工具，价格透明、接入简单、持续优化，欢迎开发者和 AI 爱好者体验交流。

使用 ttflows 不是任何皮肤功能的必要条件。本项目不会自动创建账户、读取 API Key，也不会自动修改 Base URL、代理或模型供应商配置。

## License

Codex Skin Kit is released under the MIT License. Third-party notices are available in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
