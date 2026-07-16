import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

const readmeZh = read("README.md");
const readmeEn = read("README.en.md");

const failures = [];

function requireIncludes(file, text, needle) {
  if (!text.includes(needle)) failures.push(`${file}: missing required text: ${needle}`);
}

function requireOrder(file, text, labels) {
  let previousIndex = -1;
  for (const label of labels) {
    const index = text.indexOf(label);
    if (index < 0) {
      failures.push(`${file}: missing required section: ${label}`);
      continue;
    }
    if (index <= previousIndex) failures.push(`${file}: section is out of order: ${label}`);
    previousIndex = index;
  }
}

function requireOnlyAfter(file, text, marker, boundary) {
  const markerIndex = text.indexOf(marker);
  const boundaryIndex = text.indexOf(boundary);
  if (markerIndex < 0 || boundaryIndex < 0) return;
  if (markerIndex < boundaryIndex) failures.push(`${file}: ${marker} appears before ${boundary}`);
}

function requireEmptySection(file, text, start, next) {
  const startIndex = text.indexOf(start);
  const nextIndex = text.indexOf(next);
  if (startIndex < 0 || nextIndex < 0 || nextIndex < startIndex) return;
  const content = text.slice(startIndex + start.length, nextIndex).trim();
  if (content) failures.push(`${file}: section should be empty: ${start}`);
}

requireIncludes("README.md", readmeZh, "<strong>中文</strong> · <a href=\"./README.en.md\">English</a>");
requireIncludes("README.en.md", readmeEn, "<a href=\"./README.md\">中文</a> · <strong>English</strong>");

requireOrder("README.md", readmeZh, [
  "## 效果预览",
  "## 它能做什么",
  "## 快速开始",
  "## 自定义皮肤",
  "## 安全边界",
  "## 支持服务",
  "## License",
]);

requireOrder("README.en.md", readmeEn, [
  "## Preview",
  "## What It Does",
  "## Quick Start",
  "## Custom Skins",
  "## Safety Boundaries",
  "## Support Service",
  "## License",
]);

const ttflowsDescription =
  "ttflows 天梯流是一站式 AI API 服务平台，汇聚多种主流大模型，支持 OpenAI API 和 Anthropic API 接口，兼容各类 AI 客户端和开发工具，价格透明、接入简单、持续优化，欢迎开发者和 AI 爱好者体验交流。";

requireIncludes("README.md", readmeZh, ttflowsDescription);
requireIncludes("README.md", readmeZh, "Codex Skin Kit 是免费分享的第三方项目，持续维护与体验测试由 ttflows 天梯流提供支持服务。");
requireIncludes("README.md", readmeZh, "使用 ttflows 不是任何皮肤功能的必要条件。");
requireIncludes("README.md", readmeZh, "安装时会备份并写入用户级 `~/.codex/config.toml` 的外观主题字段");
requireIncludes("README.md", readmeZh, "加上 `--restore-base-theme` 时，会把安装前备份的外观主题配置写回 `~/.codex/config.toml`");
requireIncludes("README.en.md", readmeEn, "Codex Skin Kit is a free third-party project. Its ongoing maintenance and experience testing are supported by ttflows 天梯流.");
requireIncludes("README.en.md", readmeEn, "Using ttflows is optional and not required for any skin feature.");
requireIncludes("README.en.md", readmeEn, "Backs up and writes user-level `~/.codex/config.toml` appearance theme fields during install");
requireIncludes("README.en.md", readmeEn, "Adding `--restore-base-theme` writes the pre-install appearance-theme backup back to `~/.codex/config.toml`");

requireOnlyAfter("README.md", readmeZh, "https://api.ttflows.com/", "## 支持服务");
requireOnlyAfter("README.en.md", readmeEn, "https://api.ttflows.com/", "## Support Service");

requireEmptySection("README.md", readmeZh, "## 效果预览", "## 它能做什么");
requireEmptySection("README.en.md", readmeEn, "## Preview", "## What It Does");

requireIncludes("README.md", readmeZh, "不自动打开推广页面，不自动写入中转站配置");
requireIncludes("README.en.md", readmeEn, "Promotion pages are not opened automatically, and API relay configuration is not written automatically");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("README structure and support-service scan passed.");
