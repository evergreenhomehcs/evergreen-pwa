
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('evergreen-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/logo-512.png',
        '/logo-1024.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(() => caches.match('/offline.html'))
  );
});
