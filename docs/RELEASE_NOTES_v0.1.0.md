# Codex Skin Kit v0.1.0 Release Notes Draft

## Summary

Codex Skin Kit v0.1.0 is the first A- readiness release draft for the Signal Garden Codex desktop skin toolkit.

This release positions the repository as a real, reversible local Codex skin tool rather than a pure wrapper repository. It keeps the support-service placement secondary to the skin workflow and keeps screenshot wording tied to verifiable evidence.

## Included

- Signal Garden reference skin assets and runtime scripts.
- Windows install, start, verify, restore, and uninstall paths.
- macOS install, start, verify, restore, and uninstall paths retained as auxiliary compatibility.
- Install-time backup and appearance-theme write for `~/.codex/config.toml`, with `--restore-base-theme` rollback documentation.
- Local-only CDP injection through `127.0.0.1`.
- Theme scaffolding helper for generating a standalone skin package from owned or redistributable assets.
- Chinese default README and English README.
- ttflows support-service section, without making ttflows required for any skin feature.
- Branding and compliance scan.
- README structure and support-service placement scan.
- Screenshot review gate and six regression cases for README screenshot wording modes.
- GitHub Actions static validation workflow for `npm run check`.
- Third-party screenshot issue template for README preview image intake.
- A- project evaluation, schedule, and expert-review boundary in `docs/A_MINUS_PROJECT_EVALUATION.md`.
- A- static audit record in `docs/release/v0.1.0-a-minus-static-audit.md`.

## Verification

Static verification must pass before release:

```powershell
npm run check
```

Current verified output in the Windows workspace:

```text
Branding and compliance scan passed.
README structure and support-service scan passed.
Screenshot review gate passed (pending).
Screenshot review gate tests passed (7 cases).
```

Hosted verification must pass for the exact release commit before publication. Record the final GitHub Actions run URL and head SHA here only after the release commit is selected.

## Screenshot Status

- Current README preview section: empty.
- Current screenshot mode: `pending`.
- Windows runtime screenshot: not produced with the official desktop app yet.
- macOS runtime screenshot: not produced in this workspace.
- Third-party screenshot: not provided yet.
- Publication gate for a third-party screenshot: `docs/SCREENSHOT_REVIEW.md`.

Do not describe an empty preview section, generated preview, or third-party reference image as a screenshot produced by this repository's macOS verification flow.

## Runtime Validation Status

Not executed with the official desktop app yet:

- Windows install with `install-signal-garden-skin.ps1`.
- Windows start with `start-signal-garden-skin.ps1`.
- Windows screenshot capture with `verify-signal-garden-skin.ps1 -Screenshot`.
- Windows restore with `restore-signal-garden-skin.ps1`.
- macOS install with `install-signal-garden-skin.sh`.
- macOS start with `start-signal-garden-skin.sh`.
- macOS screenshot capture with `verify-signal-garden-skin.sh --screenshot`.
- macOS restore with `restore-signal-garden-skin.sh`.

Release notes for a public GitHub Release must state this clearly unless a Windows or macOS verification record is added before publication.

## Security And Operations Notes

- The runtime must bind CDP only to `127.0.0.1`.
- The project must not modify, unpack, replace, or re-sign the official app bundle or `app.asar`.
- The installer writes only Codex appearance-theme fields in `~/.codex/config.toml`; it must not write model provider, Base URL, proxy, account, token, or API key settings.
- The project must not read chats, cookies, tokens, API keys, payment data, or account credentials.
- The project must not automatically change model provider, Base URL, proxy, or ttflows configuration.
- The restore script is the rollback path for injected runtime state and local launchers.

## Screenshot Replacement Path

Use one of these paths before adding a runtime screenshot to the README preview section:

- Preferred: produce a real macOS screenshot with `verify-signal-garden-skin.sh --screenshot` and record the evidence in `docs/EXPERT_REVIEW.md`.
- Interim: use a third-party authorized runtime reference screenshot only after `docs/SCREENSHOT_REVIEW.md` is fully completed and `npm run check` passes.

## Remaining Before Final Public Release

- Decide whether to publish this as a docs-only readiness release or wait for a runtime screenshot.
- If using a third-party screenshot, provide the file, source, permission evidence, and sensitive-content review result.
- If using a real macOS screenshot, run install/start/verify/restore on macOS and record the result.
- If publishing archives, produce SHA-256 checksums.
