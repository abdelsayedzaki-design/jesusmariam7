// Service Worker - غصن مثمر PWA
const CACHE_NAME = 'ghosn-mothmr-v1';
const urlsToCache = [
  '/jesusmariam7/jesusmariamstudend.html',
  '/jesusmariam7/manifest.json',
  '/jesusmariam7/icon-192.png',
  '/jesusmariam7/icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
