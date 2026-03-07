const CACHE_NAME = 'frederick-tag-v1';
const ASSETS_TO_CACHE = [
  './',
  './game.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install event: cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event: serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});