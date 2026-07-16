from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "reference-skin" / "assets" / "signal-garden-preview.png"


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


def rounded(draw: ImageDraw.ImageDraw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def text(draw: ImageDraw.ImageDraw, xy, value, size=24, fill="#17202a", bold=False):
    draw.text(xy, value, font=font(size, bold), fill=fill)


def main() -> None:
    w, h = 1440, 840
    img = Image.new("RGB", (w, h), "#eaf7f5")
    draw = ImageDraw.Draw(img)

    # Signal Garden grid background.
    for x in range(0, w, 36):
        draw.line([(x, 0), (x, h)], fill="#cfe7e2", width=1)
    for y in range(0, h, 36):
        draw.line([(0, y), (w, y)], fill="#cfe7e2", width=1)

    # Soft theme accents behind the app window.
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse((930, 88, 1190, 348), fill=(15, 145, 137, 40))
    od.ellipse((1030, 410, 1310, 690), fill=(227, 178, 64, 34))
    od.line([(690, 730), (820, 545), (1008, 410), (1170, 365), (1315, 438)], fill=(11, 136, 129, 150), width=5)
    for cx, cy, r in [(820, 545, 26), (1008, 410, 33), (1170, 365, 25), (1315, 438, 31), (1088, 575, 18)]:
        od.ellipse((cx - r - 12, cy - r - 12, cx + r + 12, cy + r + 12), outline=(11, 136, 129, 110), width=10)
        od.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(8, 139, 130, 235))
    img = Image.alpha_composite(img.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(img)

    # App window.
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((86, 76, 1324, 764), radius=28, fill=(0, 0, 0, 54))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img)

    rounded(draw, (76, 60, 1314, 748), 24, "#fbfefd", "#b8dcd7", 2)
    rounded(draw, (76, 60, 1314, 116), 24, "#f5fbfa", "#b8dcd7", 2)
    draw.rectangle((78, 96, 1312, 118), fill="#f5fbfa")
    for i, color in enumerate(["#ff6b5f", "#f5bd4f", "#57c263"]):
        draw.ellipse((112 + i * 34, 80, 132 + i * 34, 100), fill=color)
    text(draw, (228, 78), "Codex Skin Kit · Signal Garden", 22, "#37534f", True)

    # Sidebar.
    rounded(draw, (104, 142, 360, 714), 18, "#eef8f6", "#d0e8e4", 1)
    text(draw, (132, 174), "Workspace", 24, "#17202a", True)
    for y, label, active in [
        (226, "codex-skin-kit", True),
        (278, "theme runtime", False),
        (330, "verification", False),
        (382, "restore scripts", False),
    ]:
        fill = "#d9f0ec" if active else "#f7fcfb"
        rounded(draw, (124, y, 338, y + 38), 12, fill, None)
        draw.ellipse((142, y + 12, 156, y + 26), fill="#0f938a" if active else "#8bb8b2")
        text(draw, (170, y + 8), label, 18, "#203330")

    # Main content.
    text(draw, (404, 156), "Signal Garden is active", 42, "#101820", True)
    text(draw, (406, 212), "Local CDP visual layer · native Codex layout preserved", 22, "#5d706d")
    rounded(draw, (404, 266, 1236, 454), 18, "#ffffff", "#d4e8e4", 1)
    text(draw, (438, 300), "Task", 18, "#60726f", True)
    text(draw, (438, 334), "Refine the README so the theme preview becomes the first hook.", 25, "#16231f", True)
    text(draw, (438, 388), "The skin changes the mood of the workspace without covering content or changing APIs.", 20, "#576b68")

    # Cards.
    cards = [
        (404, 492, 650, 640, "Install", "Copy theme files"),
        (690, 492, 936, 640, "Verify", "Capture screenshot"),
        (976, 492, 1236, 640, "Restore", "Keep app intact"),
    ]
    for x1, y1, x2, y2, title, body in cards:
        rounded(draw, (x1, y1, x2, y2), 18, "#f7fcfb", "#cae4df", 1)
        draw.ellipse((x1 + 28, y1 + 30, x1 + 62, y1 + 64), fill="#0f938a")
        text(draw, (x1 + 80, y1 + 28), title, 24, "#12211f", True)
        text(draw, (x1 + 28, y1 + 86), body, 18, "#60726f")

    rounded(draw, (404, 668, 1236, 710), 14, "#ffffff", "#c8e2de", 1)
    text(draw, (430, 678), "Ask Codex something...", 20, "#7d908d")
    rounded(draw, (1142, 674, 1218, 704), 12, "#0f938a", None)
    text(draw, (1165, 678), "Run", 18, "#ffffff", True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(OUT, quality=92)


if __name__ == "__main__":
    main()
