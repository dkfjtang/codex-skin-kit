# A-方案 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Codex Skin Kit 从“快速套壳推广仓”推进为可信的最小独立 Codex 皮肤工具项目。

**Architecture:** 保留现有本机 CDP 注入、安装、验证、恢复和脚手架能力，但所有 README、预览图和对外描述必须和真实代码能力一致。主预览先保守标注为主题样式预览；如果没有自有 macOS 环境，可以使用第三方授权截图作为过渡，但必须标注来源边界，不能写成由本仓库验证脚本在自有环境生成。

**Tech Stack:** macOS zsh scripts, Node.js ESM CDP injector, CSS theme layer, Python scaffold/preview helper, GitHub README assets.

---

## 项目评估

### 推荐结论

选择 **A-方案**，不继续 B+。

A- 的目标不是完全重写，而是把已有可用运行链路整理成可信的独立项目：真实代码、真实脚本、真实边界、真实截图。B+ 的速度更快，但会继续放大“套壳、照抄、预览不真实”的风险。

### 专家组意见

**实现视角：** 当前仓库已有真实脚本链路，包含 install / start / verify / restore / scaffold。优先清理旧主题残留、收紧 README 承诺、保留真实能力，不建议重写底层运行逻辑。

**验证视角：** Windows 环境只能做静态检查，不能产出官方 Codex macOS 实机截图。主图必须继续标注为主题样式预览，直到 macOS 上运行 `verify-signal-garden-skin.sh --screenshot ...`；如果使用他人提供的截图，则只能标注为“社区提供的运行参考截图”，并记录来源、授权和未在当前工作区复验的边界。

**运营视角：** ttflows 适合作为“支持服务”区域出现，不作为主卖点。用户应先看到皮肤工具真实效果和真实脚本能力，再自然进入支持服务链接。

### 周期估算

| 阶段 | 内容 | 有 macOS + Codex 环境 | 没有 macOS 环境 |
|---|---|---:|---:|
| Phase 1 | 清理 README 与能力边界 | 0.5 天 | 0.5 天 |
| Phase 2 | 清理 CSS/脚本旧残留与验证规则 | 0.5-1 天 | 0.5-1 天 |
| Phase 3 | macOS 实机安装、验证、截图 | 0.5 天 | 使用第三方授权截图时改为来源/授权核验，0.25-0.5 天 |
| Phase 4 | 替换主图、复核 README、补专家记录 | 0.5 天 | 0.5 天，用第三方截图时必须保留来源边界 |
| Phase 5 | 发布前收尾：tag/release notes 可选 | 0.5 天 | 0.5 天 |

**推荐排期：**

- 有 macOS 实机：约 **2-3 个工作日** 可以做到可信首版。
- 没有 macOS 实机且使用第三方授权截图：约 **1.5-2 个工作日** 完成代码、文档可信化和主图替换；真实运行效果仍需在文案里说明为外部截图来源，后续有自有 macOS 环境后再复验。
- 如果要把脚手架扩展成多主题管理器：额外 **2-4 个工作日**，不建议放进 A- 首版。

### 成功标准

- README 不再暗示当前主图是自有环境实机截图，除非已经由验证脚本真实生成；使用第三方截图时，文案必须说明它是授权/许可允许使用的运行参考图。
- `效果预览`、`它能做什么`、`快速开始`、`自定义皮肤` 四段只描述已存在或可验证的能力。
- `npm run check` 通过。
- 旧主题、旧文案、旧品牌残留扫描无命中。
- macOS 环境可运行安装、启动、验证截图、恢复。
- 如采用第三方截图，`docs/EXPERT_REVIEW.md` 必须记录截图来源、授权依据、是否经过裁剪脱敏，以及“当前 Windows 工作区未完成 macOS 复验”。
- ttflows 只保留在 `支持服务` 区域和必要维护说明中。

## 文件结构

- `README.md`: 中文默认 README，重写四个重点区域和截图边界。
- `README.en.md`: 英文 README，和中文能力边界一致。
- `docs/EXPERT_REVIEW.md`: 专家组三视角复核记录，持续更新真实截图状态。
- `assets/reference-skin/assets/signal-garden-skin.css`: Signal Garden 实际主题样式。
- `assets/reference-skin/assets/renderer-inject.js`: 注入层 DOM/CSS 挂载逻辑。
- `assets/reference-skin/scripts/*.sh`: macOS 安装、启动、验证、恢复脚本。
- `assets/reference-skin/scripts/injector.mjs`: CDP 注入、验证、截图核心逻辑。
- `scripts/check-branding.mjs`: 品牌和旧主题残留扫描。
- `scripts/render_readme_preview.py`: 当前主题样式预览图生成器，保留为过渡资产生成工具。

---

### Task 1: README 真实能力边界

**Files:**
- Modify: `README.md`
- Modify: `README.en.md`

- [ ] **Step 1: 复核主图措辞**

确认中文 README 包含下面文字：

```md
上图是基于当前 `signal-garden-skin.css` 生成的主题样式预览，用来说明这套皮肤的目标效果。真正的运行截图请在 macOS + 官方 Codex 桌面环境中通过验证脚本生成：
```

确认英文 README 包含下面文字：

```md
The image above is a theme-style preview generated from the current `signal-garden-skin.css`.
```

- [ ] **Step 2: 复核能力列表**

确认能力列表只包含这些真实能力：

```md
- 安装一套本地 Codex 皮肤目录到 `~/.codex/skills/codex-skin-kit-signal-garden`
- 创建 `Signal Garden.app` 和 `Signal Garden - Restore.app` 两个桌面启动器
- 通过 `127.0.0.1` 本机 CDP 把 CSS 和装饰层注入到官方 Codex 桌面窗口
- 用 `verify-signal-garden-skin.sh` 检查注入状态，并可导出当前窗口截图
- 用 `restore-signal-garden-skin.sh` 移除皮肤、停止注入进程，并可卸载桌面启动器
```

- [ ] **Step 3: 运行文案审计**

Run:

```powershell
rg -n "真实运行截图|real runtime screenshot|主题样式预览|theme-style preview" README.md README.en.md docs/EXPERT_REVIEW.md
```

Expected:

```text
README.md contains 主题样式预览 and explicitly says not to call the generated image a real runtime screenshot.
README.en.md contains theme-style preview and the same boundary.
docs/EXPERT_REVIEW.md records that no macOS screenshot has been produced in this Windows workspace.
```

- [ ] **Step 4: Commit**

```powershell
git add README.md README.en.md
git commit -m "docs: align readme with real skin capabilities"
```

### Task 2: 主题代码真实性清理

**Files:**
- Modify: `assets/reference-skin/assets/signal-garden-skin.css`
- Modify: `assets/reference-skin/assets/renderer-inject.js`
- Modify: `scripts/check-branding.mjs`

- [ ] **Step 1: 扫旧主题残留**

Run:

```powershell
npm run check
```

Expected:

```text
Branding and compliance scan passed.
```

- [ ] **Step 2: 确认 Signal Garden 实际 CSS 使用青绿色方向**

Run:

```powershell
rg -n "#0f938a|signal-garden-teal|Local visual layer active|Native Codex layout preserved" assets/reference-skin/assets/signal-garden-skin.css
```

Expected:

```text
Matches in signal-garden-skin.css for the teal palette and runtime copy.
```

- [ ] **Step 3: 确认注入层不修改应用包**

Run:

```powershell
rg -n "app.asar|codesign|ditto|Runtime.evaluate|documentElement.classList.add" assets/reference-skin/scripts assets/reference-skin/assets
```

Expected:

```text
Runtime.evaluate and documentElement.classList.add appear in injector/renderer code.
No app.asar modification command appears.
codesign appears only for local desktop launcher creation in install script.
```

- [ ] **Step 4: Commit**

```powershell
git add assets/reference-skin/assets/signal-garden-skin.css assets/reference-skin/assets/renderer-inject.js scripts/check-branding.mjs
git commit -m "fix: clean signal garden runtime truth"
```

### Task 3: macOS 实机验证

**Files:**
- Runtime output: `$HOME/Desktop/codex-skin-kit-signal-garden-check.png`
- Optional modify after verification: `assets/reference-skin/assets/signal-garden-preview.png`
- Optional modify after verification: `README.md`
- Optional modify after verification: `README.en.md`
- Modify after verification: `docs/EXPERT_REVIEW.md`

- [ ] **Step 1: 在 macOS 上安装**

Run on macOS:

```zsh
git clone https://github.com/dkfjtang/codex-skin-kit.git
cd codex-skin-kit/assets/reference-skin
/bin/zsh scripts/install-signal-garden-skin.sh
```

Expected:

```text
安装完成。双击桌面的“Signal Garden”即可启动；双击 Restore 可一键还原。
```

- [ ] **Step 2: 启动皮肤**

Run on macOS:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/start-signal-garden-skin.sh --restart-existing
```

Expected:

```text
Signal Garden皮肤已在端口 9335 生效。
```

- [ ] **Step 3: 生成真实截图**

Run on macOS:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/verify-signal-garden-skin.sh --screenshot "$HOME/Desktop/codex-skin-kit-signal-garden-check.png"
```

Expected:

```text
Command exits 0.
Screenshot exists at $HOME/Desktop/codex-skin-kit-signal-garden-check.png.
```

- [ ] **Step 4: 恢复**

Run on macOS:

```zsh
~/.codex/skills/codex-skin-kit-signal-garden/scripts/restore-signal-garden-skin.sh
```

Expected:

```text
Signal Garden皮肤已从当前窗口移除。
```

- [ ] **Step 5: 记录验证结果**

Edit `docs/EXPERT_REVIEW.md` and replace:

```md
- A real macOS screenshot has not been produced in this Windows workspace.
```

with:

```md
- A real macOS screenshot was produced with `verify-signal-garden-skin.sh --screenshot` and should be used as the README hero image.
```

- [ ] **Step 6: Commit**

```zsh
git add docs/EXPERT_REVIEW.md
git commit -m "docs: record macos runtime verification"
```

### Task 3B: 第三方截图过渡方案

Use this task only when no self-owned macOS + official Codex environment is available.

**Files:**
- Input: the third-party screenshot file
- Modify: `docs/EXPERT_REVIEW.md`
- Optional modify: `assets/reference-skin/assets/signal-garden-preview.png`
- Optional modify: `README.md`
- Optional modify: `README.en.md`

- [ ] **Step 1: 核验截图使用边界**

Before copying the screenshot into the repository, record these facts in `docs/EXPERT_REVIEW.md`:

```md
## Third-Party Screenshot Review

- Source: provided by [person/project/link].
- Permission: [explicit permission / license / public reusable source].
- Content check: no private conversations, tokens, email addresses, account names, API keys, paid usage data, or internal hostnames are visible.
- Runtime boundary: this screenshot was not produced in the current Windows workspace and has not been re-verified with `verify-signal-garden-skin.sh` here.
- README wording: describe it as a community-provided runtime reference screenshot, not as a screenshot generated by this repository's verification flow.
```

Expected:

```text
The source and permission are explicit enough to defend public README use.
The screenshot contains no sensitive user data.
```

- [ ] **Step 2: 拒绝不合格截图**

Do not use the screenshot if any of these checks fail:

```text
No clear permission to reuse publicly.
Visible private conversation, token, email, account, payment, or internal host data.
Looks unrelated to the actual Signal Garden skin behavior.
Heavy editing makes it look like an effect the code cannot produce.
```

Expected:

```text
Only an authorized, non-sensitive, behavior-matching screenshot may become the README hero image.
```

- [ ] **Step 3: Commit**

```powershell
git add docs/EXPERT_REVIEW.md
git commit -m "docs: record third-party screenshot boundary"
```

### Task 4: 替换 README 主图

**Files:**
- Modify: `assets/reference-skin/assets/signal-garden-preview.png`
- Modify: `README.md`
- Modify: `README.en.md`

- [ ] **Step 1: 用实机截图替换当前预览图**

Run after copying the verified screenshot into the repository root:

```powershell
Copy-Item -LiteralPath .\codex-skin-kit-signal-garden-check.png -Destination .\assets\reference-skin\assets\signal-garden-preview.png -Force
```

Expected:

```text
assets/reference-skin/assets/signal-garden-preview.png is the verified macOS screenshot.
```

- [ ] **Step 2A: 自有实机截图时更新 README 措辞**

Replace the Chinese preview boundary with:

```md
上图为 Signal Garden 在 macOS 官方 Codex 桌面版中的实际运行截图。不同 Codex 版本、窗口宽度和系统字体可能会带来轻微差异。
```

Replace the English preview boundary with:

```md
The image above is a real Signal Garden runtime screenshot captured on macOS with the official Codex desktop app. The actual UI may vary slightly by Codex version, window size, and system fonts.
```

- [ ] **Step 2B: 第三方授权截图时更新 README 措辞**

If Task 3B was used instead of Task 3, replace the Chinese preview boundary with:

```md
上图为社区提供的 Signal Garden 运行参考截图，用来展示这套皮肤在官方 Codex 桌面版中的目标效果。当前 Windows 工作区尚未完成 macOS 实机复验；不同 Codex 版本、窗口宽度和系统字体可能会带来轻微差异。
```

Replace the English preview boundary with:

```md
The image above is a community-provided Signal Garden runtime reference screenshot for the official Codex desktop app. It has not been re-captured in this Windows workspace. The actual UI may vary slightly by Codex version, window size, and system fonts.
```

- [ ] **Step 3: 运行验证**

Run:

```powershell
npm run check
```

Expected:

```text
Branding and compliance scan passed.
```

- [ ] **Step 4: Commit**

```powershell
git add README.md README.en.md assets/reference-skin/assets/signal-garden-preview.png
git commit -m "docs: use verified runtime screenshot"
```

### Task 5: 发布前评估

**Files:**
- Modify: `docs/EXPERT_REVIEW.md`
- Optional modify: `docs/RELEASE.md`

- [ ] **Step 1: 确认工作区状态**

Run:

```powershell
git status --short
git log -1 --oneline --decorate
npm run check
```

Expected:

```text
git status --short shows no unstaged changes.
npm run check exits 0.
```

- [ ] **Step 2: 复核支持服务位置**

Run:

```powershell
rg -n "支持服务|Support Service|ttflows 天梯流" README.md README.en.md SPONSORSHIP.md
```

Expected:

```text
Support service appears in README support sections and SPONSORSHIP.md only.
```

- [ ] **Step 3: 专家组结论更新**

Append this section to `docs/EXPERT_REVIEW.md` after real macOS screenshot replacement:

```md
## A- Closeout

- README hero uses either a verified macOS runtime screenshot or a third-party authorized runtime reference screenshot with explicit source boundaries.
- README capability claims match install/start/verify/restore scripts.
- Static verification passed with `npm run check`.
- Support service placement remains secondary to the skin tool.
```

- [ ] **Step 4: Commit**

```powershell
git add docs/EXPERT_REVIEW.md docs/RELEASE.md
git commit -m "docs: close a-minus readiness review"
```

## 当前阻塞项

当前 Windows 工作区不能完成 macOS 官方 Codex 实机截图。A- 首版可以继续做代码和 README 真实化；如果用户提供第三方截图，可以替换主图，但必须先完成来源、授权、脱敏和文案边界记录。

## 执行建议

优先执行 Task 1、Task 2、Task 5 中的静态部分。没有 macOS 环境时，先执行 Task 3B，再执行 Task 4 的第三方截图分支。不要在没有自有实机验证前把 README 主图标成“由本仓库验证脚本生成的真实运行截图”。
