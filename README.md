# Café del Mar website

Six-page site for Café del Mar, Ilha de Luanda. It's plain HTML, CSS and JavaScript, so there's no build step.

| Page | What's on it |
| --- | --- |
| `index.html` | Hero with arched title, pinned plate journey (5 moments), ocean band, "Dias na Ilha" cards, cocktails scene, bar cards, dish slider, day → night wipe, agenda, reservations CTA |
| `sobre.html` | Story, framed images, clickable story-card stack, "O que nos define" slider |
| `menu.html` | Full menu (Carta): category tabs, every item with price, highlight badges and allergen icons, legend |
| `galeria.html` | Filterable photo grid (Cozinha / Ambiente / Bar) with lightbox |
| `contacto.html` | Map, live opening hours, contact details |
| `reservas.html` | Three-step reservation request that opens a pre-filled email |

## Run it

Open `index.html` in a browser. For a test closer to production, serve the folder instead (`npx serve .`). To deploy, upload the whole folder to any static host.

Animations use GSAP + ScrollTrigger and Lenis smooth scroll, loaded from a CDN. Without them, or with *reduce motion* switched on, every section falls back to a static layout.

## Adding Instagram videos

Instagram blocks automated downloads, so these slots show photos for now. Save the clips into `assets/video/` with these exact names, and each one fades in over its photo:

- `hero.mp4`: opening screen
- `atmosfera.mp4`: "Venha pela Ilha" band
- `ondas.mp4`: "Reserve o seu pôr do sol" section

Use 10-20 s loops, MP4 (H.264), no sound, ideally under 8 MB each.

## Editing content

- **Menu (Carta)** lives in `assets/data/menu.js`: edit names, descriptions and prices there (`value` 10500 is shown as 10,500). It was extracted from the restaurant's FineDine menu on 2026-10-05: 35 sections and 198 items.
- **Opening hours** live in two places: the `HOURS` table at the top of `assets/js/main.js` (it drives the live "Aberto agora" status and the reservation time slots), and the hours text in `contacto.html`.
- **Brunch date** is calculated automatically (first Sunday of each month).
- **Header, menu overlay and footer** are repeated in each page, so edit all six when you change them.
- **Reservations** use email because there's no server. Swap in a booking service (or a form service like Formspree) when you have one.
