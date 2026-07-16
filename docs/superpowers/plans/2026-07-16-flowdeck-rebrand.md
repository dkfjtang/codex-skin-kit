# FlowDeck Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first FlowDeck repository content by rebranding an MIT-licensed theme runtime with TTFlows as the maintainer brand and low-profile third-party notices.

**Architecture:** Keep the known CDP runtime under `assets/reference-skin/`, replace public branding with FlowDeck / TTFlows, and keep upstream attribution only in license/notice files. Add automated text scanning so old brands, risky promotional names, and previous demo assets do not reappear.

**Tech Stack:** Node.js ESM scripts, Python scaffold script, macOS zsh runtime scripts, local PNG/GIF theme assets.

---

### Task 1: Repository Bootstrap

**Files:** all top-level project files copied into the empty `dkfjtang/flowdeck` checkout.

- [x] Clone empty FlowDeck repository.
- [x] Copy MIT-licensed runtime source into the checkout.
- [x] Remove previous top-level demo screenshots.

### Task 2: FlowDeck Branding And TTFlows Promotion

**Files:** `README.md`, `NOTICE.md`, `SPONSORSHIP.md`, `PRIVACY.md`, `SECURITY.md`, `CONTRIBUTING.md`, `THIRD_PARTY_NOTICES.md`.

- [x] Make FlowDeck / TTFlows the public-facing brand.
- [x] Use `https://api.ttflows.com/` as the TTFlows promotion link.
- [x] State that TTFlows is independent and not required for FlowDeck.
- [x] Keep upstream MIT attribution low-profile in `LICENSE` and `THIRD_PARTY_NOTICES.md`.

### Task 3: Signal Garden Reference Theme

**Files:** `assets/reference-skin/**`.

- [x] Rename runtime identifiers to FlowDeck Signal Garden.
- [x] Replace high-risk character imagery with original abstract Signal Garden PNG/GIF assets.
- [x] Replace visible runtime copy with Signal Garden / TTFlows copy.
- [x] Preserve loopback-only CDP and restore behavior.

### Task 4: Verification

**Files:** `package.json`, `scripts/check-branding.mjs`, `scripts/scaffold_skin.py`.

- [x] Add `npm run check`.
- [x] Check branding/compliance text.
- [x] Check Python scaffold syntax.
- [x] Check JS runtime syntax.
- [x] Parse `skin.json`.

### Remaining Follow-Up

- [ ] Run live macOS install/restore validation on a machine with the target desktop app installed.
- [ ] Capture real screenshots after live validation.
- [ ] Decide whether to publish a GitHub Release archive and checksum.