// Service Worker for The Ape Rooms
// This enables PWA installation on Meta Quest browser,
// which triggers the proper system menu (Resume/Quit) when Meta button is pressed.

const CACHE = 'ape-rooms-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/map.glb',
  '/monster.glb',
  '/flashlight.glb',
  '/desk.glb',
  '/roar.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
