# Security

FlowDeck applies themes through a local Chromium DevTools Protocol endpoint.

## Boundaries

- Bind debug endpoints to `127.0.0.1` only.
- Do not expose the debug endpoint to LAN or public interfaces.
- Do not modify, unpack, replace, or re-sign official application bundles.
- Do not read cookies, tokens, API keys, chats, account state, or model-provider configuration.
- Do not automatically change Base URL, proxy, API key, or model-provider settings.
- Keep decorative injected elements non-interactive with `pointer-events: none`.

## Reporting

Please report security concerns through GitHub Issues only when the report does not contain secrets or private user data. For sensitive reports, use the contact channel published by the repository owner.