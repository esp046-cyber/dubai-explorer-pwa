# Dubai Explorer: Ultimate Tourist & Urban Guide

Offline-first PWA with **102 curated Dubai places** in six categories (🏛️ Museums & Culture, 🌆 Iconic Views, 🍽️ Food, ☕ Cafes & Nightlife, 🏃 Active, ❄️ Indoor Chill). Each has GPS, tips, tags, a Google Maps link and the nearest Metro/Tram/Bus.

## Features
Live search and category filters, favourites (LocalStorage), details drawer with navigation, install prompt, cache-first service worker with `offline.html` fallback. No build step, plain HTML/CSS/JS.

## Structure
```
index.html  style.css  script.js  manifest.json  service-worker.js  offline.html
favicon.ico  icon-192.png  icon-512.png  robots.txt  sitemap.xml  browserconfig.xml
api/places.json   assets/   screenshots/   config/app.config.js
tests/app.test.js  docs/   backend/   database/schema.sql
```

## Deploy
See `docs/DEPLOYMENT_GUIDE_IPHONE.md` (GitHub Pages via iPhone). Any static host works.

## Data note
Coordinates and transit hints are curated approximations. Verify opening hours, prices, and metro/bus details with the RTA S'hail app and official sites before travelling.

## Tests
`node tests/app.test.js` (optional).

MIT License.
