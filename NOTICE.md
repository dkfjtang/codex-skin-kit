# Notices

Codex Skin Kit and the Signal Garden theme are maintained by TTFlows (天梯流).

Codex Skin Kit is an unofficial third-party customization project. It is not affiliated with, endorsed by, sponsored by, or officially connected with OpenAI, Anthropic, or any other model vendor.

OpenAI, Codex, ChatGPT, Anthropic, Claude, and related names and marks are the property of their respective owners. References to third-party product names are made only when reasonably necessary to describe compatibility.

## Software License

The MIT License in `LICENSE` applies to the software source code in this repository, including scripts, CSS, injectors, manifests, skill metadata, and documentation that describes the software.

It does not grant rights to:

- OpenAI, Codex, ChatGPT, Anthropic, Claude, or other third-party trademarks, product names, logos, or trade dress.
- Official application binaries, `.app` bundles, or `app.asar` files.
- User-supplied images or third-party artwork placed into a generated theme.
- Character likenesses, franchise artwork, celebrity imagery, or brand assets.
- Third-party model API services referenced by this repository.

## TTFlows Promotion

TTFlows (天梯流) is operated by the Codex Skin Kit maintainer as an independent third-party AI API service platform. References to TTFlows are maintainer advertisements and do not indicate endorsement, authorization, or sponsorship by OpenAI, Anthropic, or other model vendors.

Using TTFlows is not required to install or use Codex Skin Kit. Codex Skin Kit does not automatically create TTFlows accounts, change API keys, replace API endpoints, alter proxy settings, or route model traffic through TTFlows.

## Runtime

Codex Skin Kit does not redistribute Node.js. Runtime scripts use an available Node.js installation or the executable bundled with the user's official desktop application when supported by the packaged workflow.

## Security Model

Themes are applied through Chromium DevTools Protocol on loopback only. While a themed session is running, treat the local debugging port as sensitive: do not run untrusted local software that could attach to it. Use the restore script or launcher to tear down the themed session and debugging port.