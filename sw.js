// Service Worker - siempre carga la última versión (network-first)
const CACHE = 'encargado-v' + '20260913';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Siempre intenta traer la versión nueva de la red; si no hay internet, usa la cacheada
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
