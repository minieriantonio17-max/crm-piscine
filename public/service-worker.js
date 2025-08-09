self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('crm-piscine-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.webmanifest',
        '/service-worker.js'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
