import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const checker = path.join(path.dirname(fileURLToPath(import.meta.url)), "check-screenshot-review.mjs");

const generated = {
  zh: "上图是基于当前 `signal-garden-skin.css` 生成的主题样式预览",
  en: "The image above is a theme-style preview generated from the current `signal-garden-skin.css`.",
};
const thirdParty = {
  zh: "上图为社区提供的 Signal Garden 运行参考截图",
  en: "The image above is a community-provided Signal Garden runtime reference screenshot",
};
const verified = {
  zh: "上图为 Signal Garden 在 macOS 官方 Codex 桌面版中的实际运行截图",
  en: "The image above is a real Signal Garden runtime screenshot captured on macOS",
};

const generatedReview = [
  "- Hero image status: generated theme-style preview.",
  "- Third-party screenshot: not provided yet.",
].join("\n");

const filledThirdPartyReview = [
  "- Source: https://example.invalid/source",
  "- Provider: Example provider",
  "- Permission: explicit written approval",
  "- Permission evidence: approval message archived by maintainer",
  "- Screenshot file: assets/reference-skin/assets/signal-garden-preview.png",
  "- Public README use approved: yes",
  "- Sensitive content review: passed",
  "- Visual match review: passed",
  "- Crop or redaction applied: none",
  "- Runtime boundary: not locally re-verified",
  "- README wording: community-provided runtime reference screenshot",
  "- Reviewer: repository maintainer",
  "- Review date: 2026-07-16",
].join("\n");

function runCase({ zh, en, screenshotReview, expertReview }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "codex-skin-kit-screenshot-gate-"));
  try {
    fs.mkdirSync(path.join(root, "docs"));
    fs.writeFileSync(path.join(root, "README.md"), zh);
    fs.writeFileSync(path.join(root, "README.en.md"), en);
    fs.writeFileSync(path.join(root, "docs", "SCREENSHOT_REVIEW.md"), screenshotReview);
    fs.writeFileSync(path.join(root, "docs", "EXPERT_REVIEW.md"), expertReview);
    return spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

const generatedPass = runCase({
  zh: generated.zh,
  en: generated.en,
  screenshotReview: generatedReview,
  expertReview: "generated theme-style preview",
});
assert.equal(generatedPass.status, 0, generatedPass.stderr);

const mismatchFail = runCase({
  zh: thirdParty.zh,
  en: generated.en,
  screenshotReview: generatedReview,
  expertReview: "generated theme-style preview",
});
assert.notEqual(mismatchFail.status, 0);
assert.match(mismatchFail.stderr, /wording mismatch/);

const incompleteThirdPartyFail = runCase({
  zh: thirdParty.zh,
  en: thirdParty.en,
  screenshotReview: generatedReview,
  expertReview: "third-party authorized runtime reference screenshot",
});
assert.notEqual(incompleteThirdPartyFail.status, 0);
assert.match(incompleteThirdPartyFail.stderr, /field is empty/);

const thirdPartyPass = runCase({
  zh: thirdParty.zh,
  en: thirdParty.en,
  screenshotReview: filledThirdPartyReview,
  expertReview: "third-party authorized runtime reference screenshot",
});
assert.equal(thirdPartyPass.status, 0, thirdPartyPass.stderr);

const unverifiedRuntimeFail = runCase({
  zh: verified.zh,
  en: verified.en,
  screenshotReview: generatedReview,
  expertReview: "runtime review pending",
});
assert.notEqual(unverifiedRuntimeFail.status, 0);
assert.match(unverifiedRuntimeFail.stderr, /requires macOS verification evidence/);

const verifiedPass = runCase({
  zh: verified.zh,
  en: verified.en,
  screenshotReview: generatedReview,
  expertReview: "A real macOS screenshot was produced with the verification script.",
});
assert.equal(verifiedPass.status, 0, verifiedPass.stderr);

console.log("Screenshot review gate tests passed (6 cases).");
