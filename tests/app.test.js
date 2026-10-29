// Run: node tests/app.test.js  (Node 16+ only needed for this optional test)
const fs = require('fs'), path = require('path'), assert = require('assert');
const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'api/places.json'), 'utf8'));
assert(data.places.length >= 100, 'needs 100+ places');
const cats = new Set(data.categories.map((c) => c.id));
data.places.forEach((p) => {
  ['name','category','badge','tags','description','tip','lat','lng','mapsUrl','transit'].forEach((k) => assert(p[k] !== undefined && p[k] !== '', p.name + ' missing ' + k));
  assert(cats.has(p.category), p.name + ' bad category');
  assert(p.lat > 24 && p.lat < 26 && p.lng > 54 && p.lng < 57, p.name + ' GPS outside Dubai area');
  assert(p.mapsUrl === `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`, p.name + ' bad maps url');
});
const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
assert(sw.includes('offline.html') && sw.includes('caches.match'), 'service worker offline fallback missing');
const m = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
assert(m.display === 'standalone' && m.start_url === './index.html');
console.log(`OK: ${data.places.length} places, offline + manifest checks passed`);
