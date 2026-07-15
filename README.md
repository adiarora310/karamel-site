# heykaramel.com

Static marketing site. No build step, no dependencies, no framework. What is in `main` is what is live.

- **Live:** https://heykaramel.com (GitHub Pages, `adiarora310/karamel-site`, branch `main`, root path)
- **Source of truth:** `~/Documents/Claude/karamel/web`
- **DNS:** GoDaddy. Apex `A -> 185.199.108.153`. `www` CNAMEs to the apex. The `CNAME` file here pins the custom domain, and GitHub commits that file itself when the Pages domain is toggled, so always `git pull --rebase` before pushing after a domain change.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The live homepage. Self-contained: inline styles, inline script. |
| `404.html` | Not-found page. Self-contained, same system as the homepage. |
| `assets/` | `emblem.svg` is the mark in use. Also colour variants, the OG card, product crops. |
| `v2/` – `v6/` | Frozen archives of past versions, kept for comparison and never edited. `v6` mirrors the current root. |
| `robots.txt`, `sitemap.xml` | SEO basics, pointed at https://heykaramel.com |

## Design system as built

White page, near-black `#0a0a0a` type, caramel `#e0952b` primary, cream `#f4ead9` footer. Hanken Grotesk throughout.
Four pastel pills carry the section accents, used as accents only and never as background fills: peach `#fcc9ab`, sky `#bedffe`, lime `#eef773`, pink `#f8b9e4`.
Brown is retired as a UI and type colour. It survives only inside illustration artwork.
All motion respects `prefers-reduced-motion`.

## Local preview

```
cd web && python3 -m http.server 4399
# open http://localhost:4399
```

The harness `preview_start` wrapper drops `--directory` and will 404 everything, so run the server directly.

## The design loop

Design authority lives in the Claude Design project, not in this repo. Claude Design authors the look; this repo carries the converted result. Conversion is faithful: no substituting assets or "fixing" things in transit. See `../DEV_LOOP.md` and `../HANDOFF.md`.

## Known gaps

- **The waitlist stores nothing.** `FORM_ACTION` and `EMAIL_FIELD` in `index.html` are still empty, so every submitted email is dropped while the visitor is shown a success state. Blocked on creating the Google Form.
- `assets/og.png` is functional bones, not a designed card. It is due a Claude Design pass.
