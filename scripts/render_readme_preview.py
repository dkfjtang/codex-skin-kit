from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "reference-skin" / "assets" / "signal-garden-preview.png"


PALETTE = {
    "ink": "#132321",
    "muted": "#5f7470",
    "teal": "#0f938a",
    "teal_light": "#d9f0ec",
    "panel": "#fbfefd",
    "panel_soft": "#eef8f6",
    "line": "#c7e3de",
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/seguisb.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for item in candidates:
        try:
            return ImageFont.truetype(item, size)
        except OSError:
            pass
    return ImageFont.load_default()


def text(draw: ImageDraw.ImageDraw, xy, value, size=24, fill=None, bold=False):
    draw.text(xy, value, font=font(size, bold), fill=fill or PALETTE["ink"])


def rounded(draw: ImageDraw.ImageDraw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def main() -> None:
    w, h = 1440, 840
    img = Image.new("RGB", (w, h), "#e9f7f4")
    draw = ImageDraw.Draw(img)

    for x in range(0, w, 36):
        draw.line([(x, 0), (x, h)], fill=PALETTE["line"], width=1)
    for y in range(0, h, 36):
        draw.line([(0, y), (w, y)], fill=PALETTE["line"], width=1)

    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((940, 82, 1194, 336), fill=(15, 147, 138, 38))
    gd.ellipse((1050, 410, 1310, 670), fill=(217, 164, 61, 24))
    glow = glow.filter(ImageFilter.GaussianBlur(4))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    draw = ImageDraw.Draw(img)

    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((84, 74, 1324, 764), radius=28, fill=(21, 84, 78, 42))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img)

    rounded(draw, (76, 60, 1314, 748), 24, PALETTE["panel"], "#b8dcd7", 2)
    rounded(draw, (76, 60, 1314, 116), 24, "#f5fbfa", "#b8dcd7", 2)
    draw.rectangle((78, 96, 1312, 118), fill="#f5fbfa")
    for i, color in enumerate(["#ff6b5f", "#f5bd4f", "#57c263"]):
        draw.ellipse((112 + i * 34, 80, 132 + i * 34, 100), fill=color)
    text(draw, (228, 78), "Codex Skin Kit · Signal Garden", 22, "#37534f", True)

    rounded(draw, (104, 142, 360, 714), 18, PALETTE["panel_soft"], "#d0e8e4", 1)
    text(draw, (132, 174), "Workspace", 24, bold=True)
    for y, label, active in [
        (226, "codex-skin-kit", True),
        (278, "theme runtime", False),
        (330, "verification", False),
        (382, "restore scripts", False),
    ]:
        rounded(draw, (124, y, 338, y + 38), 12, PALETTE["teal_light"] if active else "#f7fcfb")
        draw.ellipse((142, y + 12, 156, y + 26), fill=PALETTE["teal"] if active else "#8bb8b2")
        text(draw, (170, y + 8), label, 18, "#203330")

    text(draw, (404, 156), "Signal Garden is active", 42, bold=True)
    text(draw, (406, 212), "Local visual layer active · native Codex layout preserved", 22, PALETTE["muted"])

    rounded(draw, (404, 266, 1236, 454), 18, "#ffffff", "#d4e8e4", 1)
    text(draw, (438, 300), "Task", 18, PALETTE["muted"], True)
    text(draw, (438, 334), "Theme the workspace without covering content.", 27, bold=True)
    text(draw, (438, 388), "Same layout, same app package, a calmer Signal Garden surface.", 20, PALETTE["muted"])

    for x1, title, body in [
        (404, "Install", "Copy theme files"),
        (690, "Verify", "Capture screenshot"),
        (976, "Restore", "Keep app intact"),
    ]:
        rounded(draw, (x1, 492, x1 + 260, 640), 18, "#f7fcfb", "#cae4df", 1)
        draw.ellipse((x1 + 28, 522, x1 + 62, 556), fill=PALETTE["teal"])
        text(draw, (x1 + 80, 528), title, 24, bold=True)
        text(draw, (x1 + 28, 586), body, 18, PALETTE["muted"])

    rounded(draw, (404, 668, 1236, 710), 14, "#ffffff", "#c8e2de", 1)
    text(draw, (430, 678), "Ask Codex something...", 20, "#7d908d")
    rounded(draw, (1142, 674, 1218, 704), 12, PALETTE["teal"])
    text(draw, (1165, 678), "Run", 18, "#ffffff", True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(OUT, quality=92)


if __name__ == "__main__":
    main()
