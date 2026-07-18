// Service worker de "Mi Local" (portal de locatarios).
// No cachea datos de la planilla: siempre trae información fresca del backend.
const CACHE = 'milocal-v2';
const CORE = ['./mi-local.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(()=>{}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Las llamadas al backend (Apps Script) NUNCA se cachean.
  if (url.indexOf('script.google.com') >= 0) { e.respondWith(fetch(e.request)); return; }
  // El resto: red primero; si no hay conexión, del caché.
  e.respondWith(fetch(e.request).then(r => { const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp).catch(()=>{})); return r; }).catch(()=>caches.match(e.request)));
});
