# Release Checklist

Before publishing a Codex Skin Kit release:

1. Run `npm run check`.
2. Confirm `README.md`, `NOTICE.md`, `PRIVACY.md`, `SPONSORSHIP.md`, and `THIRD_PARTY_NOTICES.md` are included.
3. Confirm no third-party character, celebrity, commercial logo, or previous promotional image is included.
4. Confirm the package does not contain local absolute paths such as `/Users/` or `C:\Users\`.
5. If live validation was not run, state that clearly in release notes.
6. If the README uses a third-party screenshot, record its source, reuse permission, sensitive-content review, and local verification boundary in `docs/SCREENSHOT_REVIEW.md` and summarize the decision in `docs/EXPERT_REVIEW.md`.
7. Do not describe a generated preview or third-party reference image as a screenshot produced by this repository's macOS verification flow.
8. Update `docs/RELEASE_NOTES_v0.1.0.md` with the final screenshot mode, validation status, commit, tag, archive names, and checksum records.
9. Publish archives with SHA-256 checksums.
