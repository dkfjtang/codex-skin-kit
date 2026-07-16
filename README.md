# Codex Skin Kit

<p align="center">
  <strong>中文</strong> · <a href="./README.en.md">English</a>
</p>

给 Codex 桌面端换一张会呼吸的脸。

外部主题 / 换肤工具 · 本机 CDP 注入 · 不改官方安装包。首版主题 **Signal Garden** 使用原创抽象信号网格视觉，让 Codex 桌面界面更有氛围，同时保留原生侧边栏、项目选择器、功能卡、输入框和任务内容。

## 效果预览

![Signal Garden desktop preview](assets/reference-skin/assets/signal-garden-preview.png)

Signal Garden 的目标不是盖一张壁纸，而是在保留 Codex 原生布局和交互的前提下，给工作区加上轻量、可恢复的视觉层。

## 它能做什么

- 安装一套可运行的 Codex 桌面皮肤
- 保留 Codex 原生 DOM 和交互，不做整窗截图覆盖
- 通过 `127.0.0.1` 本机 CDP 注入视觉层
- 提供启动、验证、截图检查、恢复和卸载脚本
- 不修改官方应用二进制、签名或 `app.asar`
- 不读取对话、Cookie、Token 或 API Key
- 不自动修改模型供应商、Base URL 或代理配置

## 快速开始

要求：macOS 12 或更高版本、官方 Codex 桌面版、Node.js 18 或更高版本。

```zsh
git clone https://github.com/dkfjtang/codex-skin-kit.git
cd codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
```

安装器会把完整主题复制到 `~/.codex/skills/codex-skin-kit-signal-garden`，并在桌面创建：

- `Signal Garden.app`
- `Signal Garden - Restore.app`

启动主题：

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
```

验证主题并截图：

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
```

恢复或卸载：

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

> 首次运行可能需要关闭已打开的 Codex 窗口，或显式使用 `--restart-existing`。不要在未经用户同意时重启正在使用的窗口。

## 自定义皮肤

仓库保留主题脚手架能力，可基于一张授权图片和一个 GIF 生成独立主题包：

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

## 赞助商

Codex Skin Kit 是免费分享的第三方项目，持续维护由 [TTFlows 天梯流](https://api.ttflows.com/) 支持。TTFlows 是一站式 AI API 服务平台，支持 OpenAI API 和 Anthropic API 接口，兼容各类 AI 客户端和开发工具。

使用 TTFlows 不是任何皮肤功能的必要条件。本项目不会自动创建账户、读取 API Key，也不会自动修改 Base URL、代理或模型供应商配置。

## License

Codex Skin Kit is released under the MIT License. Third-party notices are available in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

---

Star 一下，然后挑一张图，把你的 Codex 变成今天想要的样子。
