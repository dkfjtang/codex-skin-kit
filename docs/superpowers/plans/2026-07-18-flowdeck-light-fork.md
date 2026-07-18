# Flowdeck Light Fork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `flowdeck` into a low-maintenance upstream-following fork of `Fei-Away/Codex-Dream-Skin`, with clear upstream credit and a small ttflows support-service promotion layer.

**Architecture:** Use upstream as the code baseline and keep local divergence shallow. Local changes live mainly in README, sponsorship/support docs, notices, package metadata, and branding assets; core install/injection/restore logic should stay close to upstream so future sync remains cheap.

**Tech Stack:** Git, Markdown, PowerShell, JavaScript/Node, Shell, CSS.

---

### Task 1: Protect Current State and Import Upstream Baseline

**Files:**
- Modify: repository git refs and working tree
- Preserve: current `main` through a backup branch before replacing baseline

- [ ] Create a backup branch named `backup/pre-upstream-light-fork-20260718` at the current commit.
- [ ] Add or update remote `upstream` as `https://github.com/Fei-Away/Codex-Dream-Skin.git`.
- [ ] Fetch `upstream/main`.
- [ ] Replace the working tree with upstream files while keeping git history recoverable via the backup branch.
- [ ] Verify `git status --short` lists the upstream baseline replacement.

### Task 2: Add Local Promotion and Attribution Layer

**Files:**
- Modify: `README.md`
- Modify: `README.en.md` if upstream has it; otherwise create a small English pointer only if needed
- Modify: `NOTICE.md`
- Modify: `THIRD_PARTY_NOTICES.md` if present, otherwise create it
- Modify: `SPONSORSHIP.md` or create `SUPPORT.md` if upstream has no sponsorship document
- Add/keep: `assets/brand/ttflows-logo.png`

- [ ] Keep README default Chinese-facing where practical.
- [ ] Add `ttflows 天梯流` support-service block near the top but keep it clearly optional.
- [ ] Add the exact user-provided ttflows description.
- [ ] Add upstream acknowledgement: based on `Fei-Away/Codex-Dream-Skin`, MIT license, upstream authors retained.
- [ ] Avoid claiming ttflows is required for any skin feature.
- [ ] Do not hide upstream information.

### Task 3: Keep Divergence Low

**Files:**
- Modify: package/project metadata only if present
- Avoid modifying: upstream runtime scripts unless required for names/links

- [ ] Set repo-facing name/description to `flowdeck` only in metadata and docs.
- [ ] Do not change upstream core script behavior.
- [ ] Avoid deleting Windows/macOS paths.
- [ ] Add a short maintainer note explaining this fork follows upstream and local patches are intentionally shallow.

### Task 4: Validate

**Files:**
- Run existing checks from upstream/local package if available

- [ ] Inspect `package.json` scripts.
- [ ] Run available no-install checks only.
- [ ] Run `git diff --stat` and review attribution/promotion content.
- [ ] Report skipped checks explicitly if dependencies are missing or scripts require download/install.
