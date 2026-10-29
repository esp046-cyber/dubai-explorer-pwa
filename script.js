(() => {
'use strict';
const FAV_KEY = 'dubaiExplorer.favs';
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let places = [], cats = [], cat = 'all', q = '', view = 'all';
let favs = new Set();
try { favs = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch (e) {}
const saveFavs = () => { try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch (e) {} };

async function load() {
  try {
    const r = await fetch('api/places.json');
    const d = await r.json();
    places = d.places; cats = d.categories;
  } catch (e) {
    $('#grid').innerHTML = '<p class="muted center">Could not load places. Open once online to cache data.</p>';
    return;
  }
  renderChips(); render();
}
function renderChips() {
  const all = [{ id: 'all', icon: '✨', name: 'All' }, ...cats];
  $('#chips').innerHTML = all.map((c) => `<button class="chip ${c.id === cat ? 'on' : ''}" data-c="${c.id}" role="tab">${c.icon} ${esc(c.name)}</button>`).join('');
}
function filtered() {
  const t = q.trim().toLowerCase();
  return places.filter((p) =>
    (cat === 'all' || p.category === cat) &&
    (view !== 'favs' || favs.has(p.id)) &&
    (!t || [p.name, p.description, p.transit, p.tags.join(' ')].join(' ').toLowerCase().includes(t)));
}
function render() {
  const list = filtered();
  $('#count').textContent = `${list.length} place${list.length === 1 ? '' : 's'}`;
  $('#empty').hidden = list.length > 0;
  $('#grid').innerHTML = list.map((p) => `
    <article class="card" data-id="${p.id}" tabindex="0">
      <button class="fav" data-fav="${p.id}" aria-label="Save ${esc(p.name)}">${favs.has(p.id) ? '⭐' : '☆'}</button>
      <span class="badge">${esc(p.badge)}</span>
      <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>
      <div class="tags">${p.tags.slice(0, 3).map((t) => `<span>#${esc(t)}</span>`).join('')}</div>
    </article>`).join('');
}
function openDrawer(id) {
  const p = places.find((x) => x.id === id); if (!p) return;
  $('#dBody').innerHTML = `
    <span class="badge">${esc(p.badge)}</span>
    <h2 id="dTitle">${esc(p.name)}</h2><p>${esc(p.description)}</p>
    <dl><dt>💡 Travel tip</dt><dd>${esc(p.tip)}</dd>
    <dt>🚇 Nearest Metro / Tram / Bus</dt><dd>${esc(p.transit)}</dd>
    <dt>📍 GPS</dt><dd>${p.lat}, ${p.lng}</dd></dl>
    <div class="tags">${p.tags.map((t) => `<span>#${esc(t)}</span>`).join('')}</div>
    <div class="actions">
      <a class="btn" href="${esc(p.mapsUrl)}" target="_blank" rel="noopener">Navigate in Google Maps</a>
      <button class="btn alt" data-fav="${p.id}">${favs.has(p.id) ? '⭐ Saved' : '☆ Save'}</button>
    </div>`;
  $('#drawer').hidden = false;
}
const closeDrawer = () => { $('#drawer').hidden = true; };

document.addEventListener('click', (e) => {
  const f = e.target.closest('[data-fav]');
  if (f) {
    e.stopPropagation();
    const id = +f.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id);
    saveFavs(); render();
    if (!$('#drawer').hidden) openDrawer(id);
    return;
  }
  const chip = e.target.closest('.chip');
  if (chip) { cat = chip.dataset.c; renderChips(); render(); return; }
  const card = e.target.closest('.card');
  if (card) { openDrawer(+card.dataset.id); return; }
  const nav = e.target.closest('.bottom [data-view]');
  if (nav) {
    view = nav.dataset.view;
    document.querySelectorAll('.bottom [data-view]').forEach((b) => b.classList.toggle('on', b === nav));
    render(); return;
  }
  if (e.target.id === 'topBtn' || e.target.closest('#topBtn')) window.scrollTo({ top: 0 });
  if (e.target.id === 'drawer' || e.target.id === 'close') closeDrawer();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
  if (e.key === 'Enter' && e.target.classList.contains('card')) openDrawer(+e.target.dataset.id);
});
$('#search').addEventListener('input', (e) => { q = e.target.value; render(); });

// PWA install prompt
let deferred;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; $('#installBtn').hidden = false; });
$('#installBtn').addEventListener('click', async () => {
  if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $('#installBtn').hidden = true;
});
if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !navigator.standalone) $('#iosHint').hidden = false;

// Service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {}));
}
load();
})();
