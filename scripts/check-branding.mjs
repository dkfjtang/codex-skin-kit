import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const textExtensions = new Set([".md", ".json", ".yaml", ".yml", ".sh", ".mjs", ".js", ".cjs", ".css", ".toml", ".txt", ".py"]);
const skippedFiles = new Set(["scripts/check-branding.mjs"]);
const allowed = new Map([
  ["Codex Skin Builder", new Set(["LICENSE", "THIRD_PARTY_NOTICES.md"])],
  ["Codex Skin Builder contributors", new Set(["LICENSE", "THIRD_PARTY_NOTICES.md"])],
  ["OpenAI", new Set(["README.md", "README.en.md", "NOTICE.md", "SECURITY.md", "SPONSORSHIP.md", "assets/reference-skin/SKILL.md", "references/runtime-architecture.md"])],
  ["ChatGPT", new Set(["README.md", "README.en.md", "NOTICE.md", "references/runtime-architecture.md", "assets/reference-skin/references/runtime-notes.md", "assets/reference-skin/scripts/lib.sh"])],
  ["Anthropic", new Set(["README.md", "README.en.md", "NOTICE.md", "SPONSORSHIP.md"])],
  ["Claude", new Set(["NOTICE.md"])],
]);
const forbidden = [
  "codex-skin-builder",
  "codex-monthly-salary-cat-skin",
  "salary-cat",
  "SalaryCat",
  "SALARY_CAT",
  "monthly salary cat",
  "Monthly Salary Cat",
  "工资",
  "月薪",
  "到账",
  "喵",
  "Fei-Away",
  "MeridianAI",
  "passion8",
  "legacy theme",
  "TTFlows theme layer",
  "content: \"¥\"",
  "🐾",
  "💰",
  "今天在哪儿打工",
  "#f5c343",
  "#d98c22",
  "#f1b84b",
  "#dc812f",
  "#efb53e",
  "#d57b2e"
];

function walk(dir) {
  const entries = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) entries.push(...walk(full));
    else entries.push(full);
  }
  return entries;
}

const failures = [];
for (const file of walk(root)) {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  if (skippedFiles.has(rel)) continue;
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const word of forbidden) {
    if (text.includes(word)) failures.push(`${rel}: forbidden term ${word}`);
  }
  for (const [word, files] of allowed) {
    if (text.includes(word) && !files.has(rel)) failures.push(`${rel}: ${word} is not allowed here`);
  }
}

const required = [
  "README.md",
  "LICENSE",
  "NOTICE.md",
  "PRIVACY.md",
  "SECURITY.md",
  "SPONSORSHIP.md",
  "THIRD_PARTY_NOTICES.md",
  "docs/A_MINUS_PROJECT_EVALUATION.md",
  "docs/SCREENSHOT_REVIEW.md",
  "docs/RELEASE_NOTES_v0.1.0.md",
  "scripts/check-screenshot-review.mjs",
  "scripts/check-screenshot-review.test.mjs",
  "assets/brand/ttflows-logo.png",
  "assets/reference-skin/preview.html",
  "assets/reference-skin/assets/signal-garden-source.png",
  "assets/reference-skin/assets/signal-garden-preview.png",
  "assets/reference-skin/assets/signal-garden-hero.gif"
];
for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`missing required file ${rel}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Branding and compliance scan passed.");
