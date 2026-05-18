importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBhGsBIFzm-aoSNycttr1djw-c5QuwBNwg",
    authDomain: "mariam-b85f5.firebaseapp.com",
    databaseURL: "https://mariam-b85f5-default-rtdb.firebaseio.com/",
    projectId: "mariam-b85f5",
    storageBucket: "mariam-b85f5.firebasestorage.app",
    messagingSenderId: "199175505566",
    appId: "1:199175505566:web:29aa95ae9e6397fe701d8f"
});

const messaging = firebase.messaging();

// استقبال الإشعار لما التطبيق في الخلفية
messaging.onBackgroundMessage(payload => {
    const title = payload.notification?.title || payload.data?.title || 'إشعار جديد';
    const body = payload.notification?.body || payload.data?.body || '';
    self.registration.showNotification(title, {
        body: body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2904/2904979.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2904/2904979.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [200, 100, 200],
        tag: 'mariam-notif',
        renotify: true
    });
});

// لما المستخدم يضغط على الإشعار
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
