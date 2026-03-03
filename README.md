# Jack Weinkselbaum — Personal Website

A responsive personal website built with plain HTML, CSS, and JavaScript. No build step or npm required.

## Run locally

Open a terminal in the project folder and run:

```bash
python3 -m http.server 4242
```

Then open **http://localhost:4242** in your browser.

> **Note:** The scroll animations use GSAP loaded from a CDN, so you need an internet connection for them to work. If you're offline the site displays correctly — just without the animations.

## Add your photos

| File | Location | Purpose |
|------|----------|---------|
| `profile.jpg` | `assets/photos/profile.jpg` | Your headshot in the hero section |
| `photo-01.jpg` | `assets/photos/photo-01.jpg` | Gallery — tall left cell |
| `photo-02.jpg` | `assets/photos/photo-02.jpg` | Gallery |
| `photo-03.jpg` | `assets/photos/photo-03.jpg` | Gallery |
| `photo-04.jpg` | `assets/photos/photo-04.jpg` | Gallery — wide cell |
| `photo-05.jpg` | `assets/photos/photo-05.jpg` | Gallery |

Colorful placeholder images display automatically for any photo that hasn't been added yet.

## Customize

- **Content & copy** — `index.html`
- **Colors, fonts, spacing** — `styles.css`
- **Animations** — `script.js`
- **Gallery photos** — `assets/photos/`
