// Service Worker para notificaciones push de la Feria del Litoral.
// NO cachea nada (siempre va a la red) para no servir versiones viejas.
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

// Recibir una notificación push y mostrarla
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { title: 'Feria del Litoral', body: e.data ? e.data.text() : '' }; }
  const title = d.title || 'Feria del Litoral';
  const options = {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: d.url || 'mi-local.html' },
    tag: d.tag || 'feria',
    renotify: true
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// Al tocar la notificación, abrir / enfocar Mi Local
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || 'mi-local.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(wins => {
      for (const w of wins) { if (w.url.includes('mi-local') && 'focus' in w) return w.focus(); }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
