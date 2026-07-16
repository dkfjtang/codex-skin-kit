#!/usr/bin/env python3
"""Scaffold a new macOS Codex Skin Kit theme from the bundled reference implementation."""

from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path


TEXT_SUFFIXES = {".md", ".json", ".yaml", ".yml", ".sh", ".mjs", ".js", ".cjs", ".css", ".toml", ".plist"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--name", required=True, help="User-facing name, for example 'Signal Garden'")
    parser.add_argument("--slug", required=True, help="Lowercase hyphen-case package id")
    parser.add_argument("--description", required=True, help="One-line theme description")
    parser.add_argument("--source", required=True, type=Path, help="Static PNG source artwork")
    parser.add_argument("--gif", required=True, type=Path, help="Animated GIF hero")
    parser.add_argument("--output", required=True, type=Path, help="New output directory")
    parser.add_argument("--port", type=int, default=9335, help="Default loopback CDP port")
    return parser.parse_args()


def fail(message: str) -> None:
    raise SystemExit(message)


def key_from_slug(slug: str) -> str:
    key = re.sub(r"^codex-skin-kit-", "", slug)
    key = re.sub(r"-skin$", "", key)
    key = re.sub(r"-theme$", "", key)
    return key or "custom"


def pascal(value: str) -> str:
    return "".join(part.capitalize() for part in value.split("-") if part)


def rename_tree(root: Path, replacements: list[tuple[str, str]]) -> None:
    paths = sorted(root.rglob("*"), key=lambda path: len(path.parts), reverse=True)
    for path in paths:
        new_name = path.name
        for old, new in replacements:
            new_name = new_name.replace(old, new)
        if new_name != path.name:
            path.rename(path.with_name(new_name))


def replace_text(root: Path, replacements: list[tuple[str, str]]) -> None:
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        text = path.read_text(encoding="utf-8")
        updated = text
        for old, new in replacements:
            updated = updated.replace(old, new)
        if updated != text:
            path.write_text(updated, encoding="utf-8")


def write_metadata(root: Path, args: argparse.Namespace, key: str) -> None:
    manifest_path = root / "skin.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest.update({
        "id": args.slug,
        "name": args.name,
        "description": args.description,
        "preview": f"assets/{key}-source.png",
        "animatedHero": f"assets/{key}-hero.gif",
    })
    manifest["requirements"]["defaultPort"] = args.port
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    (root / "agents" / "openai.yaml").write_text(
        "interface:\n"
        f"  display_name: {json.dumps(args.name, ensure_ascii=False)}\n"
        f"  short_description: {json.dumps(args.description[:64], ensure_ascii=False)}\n"
        f"  default_prompt: {json.dumps(f'Use ${args.slug} to install, activate, verify, or restore this Codex Skin Kit theme.', ensure_ascii=False)}\n",
        encoding="utf-8",
    )

    (root / "SKILL.md").write_text(
        "---\n"
        f"name: {args.slug}\n"
        f"description: Install, activate, verify, update, or restore {args.name}, a packaged macOS Codex Skin Kit theme using loopback-only CDP injection without modifying app.asar.\n"
        "---\n\n"
        f"# {args.name}\n\n"
        "Use the scripts in this package for installation, activation, verification, and restore. "
        "Read `references/runtime-notes.md` before changing CDP or launcher behavior and "
        "`references/qa-inventory.md` before release. Preserve native desktop interactions and never expose the debug port beyond 127.0.0.1.\n",
        encoding="utf-8",
    )

    (root / "README.zh-CN.md").write_text(
        f"# {args.name}（macOS）\n\n"
        f"{args.description}。主视觉使用独立循环 GIF，侧边栏、功能卡、项目选择器、输入框和任务内容仍保留原生 DOM 与交互。\n\n"
        "皮肤通过仅监听 `127.0.0.1` 的 Chromium DevTools Protocol 动态注入，不修改、不重签官方应用，也不修改 `app.asar`。\n\n"
        "## 安装\n\n"
        "```zsh\n"
        f"cd /path/to/{args.slug}\n/bin/zsh scripts/install-{key}-skin.sh\n"
        "```\n\n"
        f"安装器会在桌面创建 `{args.name}.app` 和 `{args.name} - Restore.app`。\n\n"
        "## 验证与恢复\n\n"
        "```zsh\n"
        f"~/.codex/skills/{args.slug}/scripts/verify-{key}-skin.sh --screenshot \"$HOME/Desktop/{key}-check.png\"\n"
        f"~/.codex/skills/{args.slug}/scripts/restore-{key}-skin.sh\n"
        "```\n",
        encoding="utf-8",
    )

    (root / "references" / "runtime-notes.md").write_text(
        "# Runtime notes\n\n"
        f"- Package: `{args.slug}`\n- Default CDP port: `{args.port}` on `127.0.0.1` only.\n"
        "- Official bundle id: `com.openai.codex`; keep this value in sync with supported desktop releases.\n"
        "- Renderer reinjection is idempotent and survives route changes and reloads.\n"
        "- Restore removes injected DOM/CSS and can restore pre-install desktop theme keys.\n",
        encoding="utf-8",
    )
    (root / "references" / "qa-inventory.md").write_text(
        "# QA inventory\n\n"
        "1. Shell and JavaScript syntax pass.\n2. Manifest paths exist.\n3. GIF loops and static PNG fallback works.\n"
        "4. Native sidebar, project selector, cards, task content, and composer remain interactive.\n"
        "5. CDP listens only on 127.0.0.1.\n6. Isolated install and full restore round trip pass.\n"
        "7. ZIP contains the complete package and no creator-specific absolute paths.\n",
        encoding="utf-8",
    )


def main() -> None:
    args = parse_args()
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.slug):
        fail("--slug must use lowercase letters, digits, and hyphens only")
    if not 1024 <= args.port <= 65535:
        fail("--port must be between 1024 and 65535")
    if args.output.exists():
        fail(f"output already exists: {args.output}")
    if not args.source.is_file() or args.source.suffix.lower() != ".png":
        fail("--source must point to an existing PNG")
    if not args.gif.is_file() or args.gif.suffix.lower() != ".gif":
        fail("--gif must point to an existing GIF")

    skill_root = Path(__file__).resolve().parents[1]
    template = skill_root / "assets" / "reference-skin"
    if not (template / "skin.json").is_file():
        fail(f"reference skin is incomplete: {template}")

    key = key_from_slug(args.slug)
    upper = key.replace("-", "_").upper()
    lower = key.replace("-", "_")
    camel = pascal(key)
    state_dir = f"CodexSkinKitTheme-{args.slug}"
    replacements = [
        ("codex-skin-kit-signal-garden", args.slug),
        ("CodexSkinKitSignalGarden", state_dir),
        ("Signal Garden", args.name),
        ("SIGNAL_GARDEN", upper),
        ("signal_garden", lower),
        ("SignalGarden", camel),
        ("signal-garden", key),
        ("TTFlows theme layer", f"{args.name} theme layer"),
        ("Local theme active", "Theme active"),
        ("9335", str(args.port)),
    ]

    shutil.copytree(template, args.output)
    rename_tree(args.output, replacements)
    replace_text(args.output, replacements)

    assets = args.output / "assets"
    shutil.copy2(args.source, assets / f"{key}-source.png")
    shutil.copy2(args.gif, assets / f"{key}-hero.gif")
    write_metadata(args.output, args, key)

    print(json.dumps({
        "output": str(args.output.resolve()),
        "slug": args.slug,
        "name": args.name,
        "key": key,
        "port": args.port,
        "source": str((assets / f"{key}-source.png").resolve()),
        "gif": str((assets / f"{key}-hero.gif").resolve()),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
