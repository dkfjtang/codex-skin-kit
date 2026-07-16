# FlowDeck

由 **TTFlows 天梯流**维护的免费第三方桌面主题工具。FlowDeck 通过本机回环 CDP 注入主题层，保留目标桌面应用的原生交互，不修改官方安装包、签名或 `app.asar`。

> FlowDeck 是非官方第三方项目，与 OpenAI 不存在隶属、认可、授权或赞助关系。OpenAI、Codex、ChatGPT 及相关名称和标识归各自权利人所有。

## Signal Garden

首版内置主题 **Signal Garden** 使用原创抽象视觉：浅色信号网格、青绿色状态轨道和数据节点花园。它不包含动漫人物、公众人物、商业 Logo 或来源不明的第三方壁纸。

![Signal Garden preview](assets/reference-skin/assets/signal-garden-source.png)

## 功能

- 本地安装、启动、验证和恢复主题
- 保留侧边栏、项目选择器、功能卡、输入框和任务内容的原生交互
- 仅连接 `127.0.0.1` 上的本机调试端点
- 不修改官方应用二进制、签名或 `app.asar`
- 支持一键恢复和卸载桌面启动器
- 不读取对话、Cookie、Token 或 API Key
- 不自动修改模型供应商、Base URL 或代理配置

## 快速开始

要求：macOS 12 或更高版本、官方桌面应用、Node.js 18 或更高版本。

```zsh
git clone https://github.com/dkfjtang/flowdeck.git
cd flowdeck/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
```

安装器会把完整主题复制到 `~/.codex/skills/flowdeck-signal-garden`，并在桌面创建：

- `Signal Garden.app`
- `Signal Garden - Restore.app`

启动主题：

```zsh
~/.codex/skills/flowdeck-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
```

验证主题：

```zsh
~/.codex/skills/flowdeck-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/flowdeck-signal-garden-check.png"
```

恢复或卸载：

```zsh
~/.codex/skills/flowdeck-signal-garden/scripts/restore-signal-garden-skin.sh
~/.codex/skills/flowdeck-signal-garden/scripts/restore-signal-garden-skin.sh --restore-base-theme --uninstall
```

> 首次运行可能需要关闭已打开的目标桌面应用，或显式使用 `--restart-existing`。不要在未经用户同意时重启正在使用的窗口。

## 生成自定义主题

FlowDeck 仍保留主题脚手架能力，可基于一张授权图片和一个 GIF 生成独立主题包：

```zsh
python3 scripts/scaffold_skin.py \
  --name "Signal Garden" \
  --slug "flowdeck-signal-garden" \
  --description "TTFlows signal grid theme" \
  --source /absolute/path/source.png \
  --gif /absolute/path/hero.gif \
  --output /absolute/path/flowdeck-signal-garden
```

自定义素材必须是你拥有使用权的图片或明确允许再分发的素材。不要提交动漫角色、公众人物照片、商业 Logo、来源不明壁纸或可能侵犯第三方权利的图片。

## TTFlows 天梯流

**广告披露：TTFlows 天梯流由 FlowDeck 维护方运营。**

TTFlows 天梯流是一站式 AI API 服务平台，汇聚多种主流大模型，支持 OpenAI API 和 Anthropic API 接口，兼容各类 AI 客户端和开发工具，价格透明、接入简单、持续优化，欢迎开发者和 AI 爱好者体验交流。

访问：<https://api.ttflows.com/>

使用 TTFlows 不是安装或使用 FlowDeck 的必要条件。FlowDeck 不会自动创建 TTFlows 账户，不会读取或迁移 API Key，不会自动替换 Base URL、代理设置或模型供应商配置。TTFlows 是独立第三方服务，不是 OpenAI、Anthropic 或其他模型厂商的官方服务。

## 安全边界

- CDP 仅绑定 `127.0.0.1`，不得暴露到局域网接口
- 装饰性注入元素保持 `pointer-events: none`
- 不修改、不解包、不重签官方应用
- 不读取聊天内容、账号凭证、Cookie、Token 或 API Key
- 不自动打开推广页面，不自动写入中转站配置
- 适配失败时应保持原应用不变，并可通过恢复脚本清理

## License

FlowDeck is released under the MIT License. Third-party notices are available in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).