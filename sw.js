self.addEventListener('install', (e) => {
  console.log('Frederick Tag Service Worker Installed');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
