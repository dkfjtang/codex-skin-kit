# Visual workflow

## Reference analysis

Before prompting, write a compact character lock:

- silhouette and proportions;
- face shape, eyes, mouth, ears, markings, and outline;
- pose and props;
- medium, texture, palette, and line quality;
- features that must not drift into a generic cat/person/mascot.

For a screenshot containing many stickers, identify traits repeated across the whole set. Do not select one pose and miss the character system.

## Production prompt shape

Use an `illustration-story` or equivalent raster use case:

```text
Asset type: ultra-wide desktop app hero for a Codex theme
Primary request: <character> in a small work scene that fits <theme>
Input images: Image 1 is the character and style reference
Subject: lock <silhouette, markings, face, outline, expression>
Composition: 16:7; left 45% calm negative space; subject and desk in right 50%; safe margins
Style: polished sticker illustration matching the reference medium
Motion planning: leave room for <particles/prop glow/camera drift>
Constraints: no text, logo, watermark, UI chrome, extra character, or photorealism
Avoid: generic substitute character, anime eyes unless present, distorted limbs, clutter
```

Inspect the output at full size. Reject it when the identity lock is weak even if the scene is attractive.

## GIF design

- Use 10–16 frames and a 1–2 second loop.
- Keep camera motion under roughly 2% scale/translation.
- Use two or three independent motion layers at most.
- Place particles where they do not cover Codex copy.
- Quantize to 128–256 colors and inspect banding around soft gradients.
- Keep the static PNG as a reduced-motion fallback.

The reference builder animates subtle zoom/pan, falling coins, and an envelope glow. Change its overlay SVG coordinates and colors for a different composition rather than forcing every theme to use coins.

## Interface palette

Sample five roles from the artwork:

1. ink/text;
2. main surface;
3. sidebar surface;
4. accent/border;
5. semantic success/error/skill colors.

Maintain readable contrast. The hero can be expressive; task content and the composer should remain quiet enough for long sessions.
