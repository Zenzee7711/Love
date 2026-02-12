# Valentine's Day Website ❤️

A beautiful, romantic Valentine's Day website — pure HTML, CSS & JavaScript.

---

## How to Run Locally

### Option 1 — Simply open the file
1. Navigate to the project folder.
2. Double-click **`index.html`** to open it in your browser.

> **Note:** Some browsers restrict local file navigation. If page links don't work, use Option 2.

### Option 2 — Local server (recommended)
Use any lightweight server. For example with Python:

```bash
# Python 3
cd D:\ED
python -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

Or with Node.js:

```bash
npx serve .
```

Or install the **Live Server** extension in VS Code, right-click `index.html` → "Open with Live Server".

---

## Project Structure

```
D:\ED\
├── index.html        ← Home page (hero + floating hearts)
├── video.html        ← Video player page
├── photos.html       ← Photo gallery page
├── particles.html    ← Particle overlay + background image page
├── letter.html       ← Handwritten love letter page
├── styles.css        ← Shared stylesheet
├── script.js         ← Shared JavaScript
└── README.md         ← This file
```

---

## Adding Your Content

### Photos (photos.html)
Replace the `<div class="photo-placeholder">` elements with actual `<img>` tags:

```html
<div class="gallery-item">
  <img src="photos/photo1.jpg" alt="Our first date">
  <div class="gallery-overlay">
    <span class="heart-badge">❤️</span>
    <p>The day it all began</p>
  </div>
</div>
```

### Video (video.html)
Replace the `<div class="video-placeholder">` with a `<video>` element:

```html
<div class="video-wrapper">
  <video controls preload="metadata" poster="photos/poster.jpg">
    <source src="videos/our-video.mp4" type="video/mp4">
  </video>
</div>
```

### Background Image (particles.html)
Replace the `<div class="particles-bg-placeholder">` with:

```html
<div class="particles-bg-image" style="background-image: url('photos/our-photo.jpg');"></div>
```

### Love Letter (letter.html)
Edit the letter text and signature directly in the HTML.

---

## Features

- Romantic blush pink, deep red, soft cream & gold color palette
- Floating heart animations (canvas-based)
- Interactive particle system with mouse interaction
- Photo gallery with lightbox & hover effects
- Handwritten love letter with fade-in animation
- Smooth page transitions
- Fully responsive (mobile + desktop)
- Google Fonts: Playfair Display, Great Vibes, Lora
- Zero dependencies — pure HTML/CSS/JS
