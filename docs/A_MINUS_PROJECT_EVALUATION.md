# A- Project Evaluation

This document records the current delivery decision for Codex Skin Kit v0.1.0.

## Decision

Use the A- path.

A- keeps the existing runnable skin workflow, but makes the public repository credible: real scripts, clear boundaries, explicit screenshot provenance, and no over-claiming in the README. It is faster than a full rewrite and safer than a direct wrapper approach.

## Why Not B+

B+ would be the fastest way to publish a repository, but it would keep the main risk concentrated in the public surface:

- the project may look like a promotional shell rather than a useful skin tool;
- screenshot claims may outrun what the current environment has verified;
- copied wording and old theme residue are harder to defend once the repo is public;
- ttflows promotion would become too dominant and reduce user trust.

## Current Scope

Included in A- v0.1.0:

- Signal Garden reference skin;
- Windows install, start, verify, restore, and uninstall scripts;
- macOS install, start, verify, restore, and uninstall scripts retained as auxiliary compatibility;
- local-only CDP injection through `127.0.0.1`;
- empty README preview section until a reviewed image is available;
- bilingual README with Chinese as the default entry;
- ttflows as a support-service section, not a required runtime dependency;
- static branding, screenshot, syntax, and metadata checks.

Not included in A- v0.1.0:

- verified Windows runtime evidence with the official desktop app;
- a verified macOS runtime screenshot from this Windows workspace;
- automatic ttflows account, Base URL, proxy, or model-provider setup;
- multi-theme marketplace or theme manager behavior.

## Expert Review Summary

Implementation view:

- The repo contains a real runtime path instead of only README marketing copy.
- The theme is implemented in CSS and injected through CDP without modifying the official app package.
- The public wording should stay tied to features that scripts actually provide.

Verification view:

- `npm run check` is the required local gate.
- Windows static checks and PowerShell syntax checks do not prove live desktop injection.
- A third-party screenshot can be used only as a community-provided runtime reference screenshot after source, permission, and sensitive-content checks are recorded.

Operations and security view:

- CDP must remain bound to `127.0.0.1`.
- Restore/uninstall remains the rollback path.
- The project must not read chats, cookies, tokens, API keys, account credentials, billing data, or model-provider configuration.
- ttflows remains optional and must not be automatically configured by the skin scripts.

## Schedule

Without a self-owned runtime environment:

- code and document credibility pass: completed for the current A- static state;
- third-party screenshot intake and README replacement: 0.25-0.5 workday after a usable screenshot, source, and permission evidence are provided;
- final release notes and tag/archive preparation: 0.5 workday after the screenshot decision.

With a Windows runtime environment:

- install/start/verify/restore validation: 0.5 workday;
- real screenshot replacement and expert-review update: 0.5 workday;
- release notes and tag/archive preparation: 0.5 workday.

With a macOS environment:

- install/start/verify/restore validation: 0.5 workday;
- real screenshot replacement and expert-review update: 0.5 workday;
- release notes and tag/archive preparation: 0.5 workday.

## Current State

The repository is ready for a Windows-first A- static release draft. It is not yet ready to claim a real Windows or macOS runtime screenshot.

The next decision is the README preview section mode:

- keep `pending` until a better asset exists;
- switch to `thirdParty` after completing `docs/SCREENSHOT_REVIEW.md`;
- switch to `verified` only after macOS verification evidence is recorded.
