# Jack Weinkselbaum — Personal Website

Personal site for Jack Weinkselbaum, Technical Project Manager at the WNBA. Built with plain HTML, CSS, and JavaScript — no build step or npm required.

Live at **[weinkselbaum.com](https://weinkselbaum.com)**, deployed via Cloudflare Pages.

## Sections

| # | Section | Description |
|---|---------|-------------|
| — | Hero | Name, title, profile photo, CTA buttons |
| — | Marquee | Scrolling ticker of skills and interests |
| 01 | About | Sticky headline + three pillar cards (Who I am, What I do, How I work) |
| 02 | Work | Bento grid of work highlights at the WNBA |
| 03 | Interests | Running, Broadway, Growth cards |
| 04 | Photos | Asymmetric gallery with click-to-expand lightbox |
| 05 | Connect | LinkedIn CTA |

## Run locally

```bash
python3 -m http.server 4242
```

Then open **http://localhost:4242** in your browser.

> **Note:** Scroll animations use GSAP loaded from a CDN — an internet connection is required for them to work. The site displays correctly offline, just without animations.

## Photos

| File | Location | Purpose |
|------|----------|---------|
| `profile.jpg` | `assets/photos/profile.jpg` | Headshot in the hero section |
| `photo-01.jpg` | `assets/photos/photo-01.jpg` | Gallery — NYC Marathon finish line |
| `photo-02.jpg` | `assets/photos/photo-02.jpg` | Gallery — Central Park pre-race selfie |
| `photo-03.jpg` | `assets/photos/photo-03.jpg` | Gallery — WNBA All-Star Game |
| `photo-04.jpg` | `assets/photos/photo-04.jpg` | Gallery — Broadway (tall cell, col 3) |
| `photo-05.jpg` | `assets/photos/photo-05.jpg` | Gallery — winter half marathon |

SVG placeholders display automatically for any photo not yet added.

## Stack

- **HTML/CSS/JS** — no framework, no build step
- **GSAP 3.12.5** + ScrollTrigger — scroll-driven animations (CDN)
- **Sora** + **Space Grotesk** — fonts via Google Fonts
- **Cloudflare Pages** — hosting and deployment (auto-deploys on push to `main`)
- **DNS** — managed via Cloudflare, domain registered at Squarespace

## File structure

```
index.html          — Full site structure and content
styles.css          — Design system and all styles
script.js           — GSAP animations, nav, lightbox logic
assets/
  favicon.svg       — Orange circle JW favicon
  photos/           — Profile photo and gallery images
.claude/
  launch.json       — Local preview server config
```

## Deployment

Every push to `main` auto-deploys to Cloudflare Pages. No manual steps required.
