# web/ — XRP Yearbook site (prototype)

Pure front-end visualization. No build step, no chain yet — the point is to
*see it and iterate.*

## Run it

Easiest: **double-click `index.html`** — it opens in your browser (the relative
`../XRP_Yearbook_Brand_Assets_PNG/...` image paths resolve from disk).

Or serve from the **repo root** so the paths line up:

```
python -m http.server 5173
# then open  http://localhost:5173/web/
```

## What's here

- **Hero** — the moving memory-flow (slow crossfade + oxblood grade + grain +
  Ken Burns), the headline, and the two CTAs. Memory before mechanics.
- **Sign the Ledger** — a working signature pad. Draw a mark inside the X,
  pick one of three brand inks, and "Take your mark" downloads it as a PNG.

## Swap in the Vegas photos

Open `app.js`, find `HERO_IMAGES`, and point it at the real event shots
(drop them in `web/assets/hero/`). The brand renders are just stand-ins so the
crossfade is visible today. Everything else (grade, grain, timing) stays.

## Palette (sampled from the book artifact)

| Token | Hex |
|---|---|
| Ink Black | `#0B0B0B` |
| Leather Black | `#1A1410` |
| Oxblood | `#3D2A1A` |
| Antique Gold | `#C9A24E` |
| Candle Gold | `#FFC80A` |
| Parchment | `#F4ECD6` |

Rule: stay warm, stay matte. No pure white, no cool blue, no chrome.
