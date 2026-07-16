import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

const readmeZh = read("README.md");
const readmeEn = read("README.en.md");
const screenshotReview = read("docs/SCREENSHOT_REVIEW.md");
const expertReview = read("docs/EXPERT_REVIEW.md");

const modes = {
  generated: {
    zh: "上图是基于当前 `signal-garden-skin.css` 生成的主题样式预览",
    en: "The image above is a theme-style preview generated from the current `signal-garden-skin.css`.",
  },
  thirdParty: {
    zh: "上图为社区提供的 Signal Garden 运行参考截图",
    en: "The image above is a community-provided Signal Garden runtime reference screenshot",
  },
  verified: {
    zh: "上图为 Signal Garden 在 macOS 官方 Codex 桌面版中的实际运行截图",
    en: "The image above is a real Signal Garden runtime screenshot captured on macOS",
  },
};

const failures = [];
const sectionBetween = (text, start, next) => {
  const startIndex = text.indexOf(start);
  const nextIndex = text.indexOf(next);
  if (startIndex < 0 || nextIndex < 0 || nextIndex < startIndex) return null;
  return text.slice(startIndex + start.length, nextIndex).trim();
};

const activeModes = Object.entries(modes).filter(([, markers]) => {
  const zh = readmeZh.includes(markers.zh);
  const en = readmeEn.includes(markers.en);
  if (zh !== en) failures.push(`README screenshot wording mismatch for mode: ${markers.zh}`);
  return zh && en;
});

const pendingPreview =
  sectionBetween(readmeZh, "## 效果预览", "## 它能做什么") === "" &&
  sectionBetween(readmeEn, "## Preview", "## What It Does") === "" &&
  !readmeZh.includes("signal-garden-preview.png") &&
  !readmeEn.includes("signal-garden-preview.png");

if (!pendingPreview && activeModes.length !== 1) {
  failures.push(`expected exactly one README screenshot mode, found ${activeModes.length}`);
}

const field = (name) => {
  const match = screenshotReview.match(new RegExp(`^- ${name}:\\s*(.+)$`, "m"));
  return match?.[1].trim() ?? "";
};

const activeMode = pendingPreview ? "pending" : activeModes[0]?.[0];
if (activeMode === "pending") {
  if (!screenshotReview.includes("- Hero image status: pending.")) {
    failures.push("pending preview mode requires matching SCREENSHOT_REVIEW status");
  }
  if (!expertReview.includes("README preview section is intentionally empty")) {
    failures.push("pending preview mode requires matching EXPERT_REVIEW evidence");
  }
}

if (activeMode === "generated") {
  if (!screenshotReview.includes("- Hero image status: generated theme-style preview.")) {
    failures.push("generated preview mode requires matching SCREENSHOT_REVIEW status");
  }
  if (!expertReview.includes("generated theme-style preview")) {
    failures.push("generated preview mode requires matching EXPERT_REVIEW evidence");
  }
}

if (activeMode === "thirdParty") {
  const requiredFields = [
    "Source",
    "Provider",
    "Permission",
    "Permission evidence",
    "Screenshot file",
    "Sensitive content review",
    "Visual match review",
    "Runtime boundary",
    "README wording",
    "Reviewer",
    "Review date",
  ];
  for (const name of requiredFields) {
    if (!field(name)) failures.push(`third-party screenshot review field is empty: ${name}`);
  }
  if (field("Public README use approved").toLowerCase() !== "yes") {
    failures.push("third-party screenshot requires Public README use approved: yes");
  }
  if (!expertReview.includes("third-party authorized runtime reference screenshot")) {
    failures.push("third-party screenshot mode requires EXPERT_REVIEW closeout evidence");
  }
}

if (activeMode === "verified") {
  if (!expertReview.includes("A real macOS screenshot was produced with")) {
    failures.push("verified screenshot mode requires macOS verification evidence in EXPERT_REVIEW");
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Screenshot review gate passed (${activeMode}).`);
