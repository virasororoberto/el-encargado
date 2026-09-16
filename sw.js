// Service Worker que se AUTODESTRUYE: borra toda la caché vieja, se elimina y recarga.
// Después de esto, la app siempre carga la última versión de la red (sin caché).
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.clients.claim();
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(c => { try { c.navigate(c.url); } catch(e){} });
    } catch (e) {}
  })());
});
// Mientras exista, siempre va a la red (nunca sirve caché vieja)
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
