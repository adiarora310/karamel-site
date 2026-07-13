# Karamel landing page

Static one-page marketing site for Karamel. No build step, no framework. Just
`index.html`, `styles.css`, `script.js`, and a few assets. Deploys anywhere that
serves static files.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page |
| `styles.css` | All styles, including the Modal-fidelity animation layer |
| `script.js` | Nav state, scroll reveals, the hero typewriter, the waitlist form |
| `favicon.svg` | Tab icon (the Karamel waveform mark) |
| `og.svg` | Source for the social share image (see "Share image" below) |
| `robots.txt`, `sitemap.xml` | SEO basics (point at https://getkaramel.ai) |
| `404.html` | Branded not-found page |

## Design notes

Visual system is modeled on modal.com, flipped to a white background.
- Accent green is Modal's exact `#7FEE64`.
- Body font **Inter**, mono **Fira Mono** (both match Modal). Headlines use
  **Schibsted Grotesk**, the closest free, commercially-licensed stand-in for
  Modal's proprietary "Goga". To use a different display font, change `--display`
  in `styles.css`.
- Recreated effects: 80s infinite two-direction marquee, CTA shimmer, staggered
  reveals, the hero draft typewriter, growing metric bars. All respect
  `prefers-reduced-motion`.

## Preview locally

```
python3 -m http.server 4321 --directory .
# open http://localhost:4321
```

## Two steps before launch

1. **Wire the waitlist.** Create a free form at https://formspree.io and replace
   `FORM_ENDPOINT` in `script.js` with `https://formspree.io/f/XXXXXXXX`. Until
   then the form confirms locally but stores nothing. (Buttondown or a Supabase
   table work too; swap the fetch.)
2. **Generate the share image.** Convert `og.svg` to a 1200x630 `og.png` (open
   `og.svg` in a browser at that size and export, or use any SVG-to-PNG tool).
   The meta tags already point at `/og.png`.

## Deploy (all free)

Pick one. The site is plain static files, so any of these work in minutes:
- **Cloudflare Pages / Netlify:** drag this folder into the dashboard, or connect
  the repo. Set no build command, publish directory = this folder.
- **GitHub Pages:** push this folder to a repo, enable Pages on the branch.
- **Vercel:** `vercel` in this folder, accept the static defaults.

Then point `getkaramel.ai` (or `.io`) at the host and update the absolute URLs in
the `<head>` Open Graph tags, `robots.txt`, and `sitemap.xml` if the domain
differs.

## Canonical location

Source of truth lives in `~/Documents/Claude/karamel/web`. (During local preview
in this environment the files are mirrored to `/tmp/karamel-web` because the
preview sandbox only reads its declared working directories.)
