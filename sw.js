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
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
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

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// ✅ Push Notifications
self.addEventListener('push', event => {
  let data = { title: 'غصن مثمر', body: 'في رسالة جديدة!' };
  if (event.data) {
    try { data = event.data.json(); } catch(e) { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/jesusmariam7/icon-192.png',
      badge: '/jesusmariam7/icon-192.png',
      dir: 'rtl',
      lang: 'ar',
      vibrate: [200, 100, 200],
      data: data
    })
  );
});

// ✅ لما المستخدم يضغط على الإشعار
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('/jesusmariam7/jesusmariamstudend.html');
    })
  );
});

// ✅ Firebase Cloud Messaging background messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
