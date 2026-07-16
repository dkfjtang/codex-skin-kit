# Release Checklist

Before publishing a Codex Skin Kit release:

1. Run `npm run check`.
2. Confirm `README.md`, `NOTICE.md`, `PRIVACY.md`, `SPONSORSHIP.md`, and `THIRD_PARTY_NOTICES.md` are included.
3. Confirm no third-party character, celebrity, commercial logo, or previous promotional image is included.
4. Confirm the package does not contain local absolute paths such as `/Users/` or `C:\Users\`.
5. Confirm the `check` GitHub Actions workflow has run for the intended commit, or state why hosted validation is not available.
6. If live validation was not run, state that clearly in release notes.
7. If the README uses a third-party screenshot, record its source, reuse permission, sensitive-content review, and local verification boundary in `docs/SCREENSHOT_REVIEW.md` and summarize the decision in `docs/EXPERT_REVIEW.md`.
8. Do not describe a generated preview or third-party reference image as a screenshot produced by this repository's macOS verification flow.
9. Update `docs/RELEASE_NOTES_v0.1.0.md` with the final screenshot mode, validation status, commit, tag, archive names, and checksum records.
10. Publish archives with SHA-256 checksums.

## Current Audit Record

The current A- static audit record is `docs/release/v0.1.0-a-minus-static-audit.md`.

## Source Control Gate

Before tagging or publishing:

1. Confirm local `main` and `origin/main` point to the intended commit.
2. Confirm the worktree is clean, or list every uncommitted change and its disposition.
3. Confirm the release notes identify the exact commit and screenshot mode.
4. Do not rewrite history to hide attribution, review records, or screenshot provenance.

## A- Release Modes

Choose one release mode and keep the README, release notes, screenshot review, and expert review aligned.

- `generated`: allowed for an A- static readiness release; must state that macOS live validation was not executed in this Windows workspace.
- `thirdParty`: allowed only after `docs/SCREENSHOT_REVIEW.md` is complete and `npm run check` passes.
- `verified`: allowed only after macOS install/start/verify/restore evidence is recorded.
