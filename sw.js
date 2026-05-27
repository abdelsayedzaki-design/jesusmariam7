importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBhGsBIFzm-aoSNycttr1djw-c5QuwBNwg",
    authDomain: "mariam-b85f5.firebaseapp.com",
    databaseURL: "https://mariam-b85f5-default-rtdb.firebaseio.com",
    projectId: "mariam-b85f5",
    messagingSenderId: "199175505566",
    appId: "1:199175505566:web:29aa95ae9e6397fe701d8f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    const { title, body } = payload.notification;
    self.registration.showNotification(title, {
        body,
        icon: '/jesusmariam7/icon-192.png',
        badge: '/jesusmariam7/icon-192.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [200, 100, 200],
        requireInteraction: true
    });
});
