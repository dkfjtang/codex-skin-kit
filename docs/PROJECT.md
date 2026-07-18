# Flowdeck Project Notes

Flowdeck is an unofficial Codex desktop skin toolkit. It applies external
themes through local loopback CDP injection and does not modify the official
application package, binary, signature, `.app`, `app.asar`, or WindowsApps
installation.

## What It Provides

- Windows and macOS theme entry points
- Full-window background themes while keeping native Codex controls interactive
- Local theme switching and restore flows
- Image guidance for creating UI-free backgrounds
- Clear separation between skin features and API relay configuration

## Repository Layout

```text
flowdeck/
├── README.md
├── README.en.md
├── docs/
│   ├── PROJECT.md
│   ├── platforms.md
│   ├── reference-background-prompt-guide.md
│   └── images/
├── macos/
│   ├── README.md
│   ├── scripts/
│   ├── assets/
│   └── presets/
└── windows/
    ├── README.md
    ├── scripts/
    ├── assets/
    └── tests/
```

## Safety Boundary

- CDP binds to `127.0.0.1` only
- Official Codex application files are not patched or repackaged
- API Key, Base URL, proxy, and provider settings are not changed by the skin
  scripts
- Third-party relay services, including ttflows, must be configured separately

## Acknowledgements

This project uses and references open-source work from
[Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
Thanks to the upstream author and community contributors.

## Support Service

ttflows 天梯流 provides the support-service link shown in the public README:
https://api.ttflows.com/
