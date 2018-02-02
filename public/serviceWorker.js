importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': "371619992544"
});

const messaging = firebase.messaging();


self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...');
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ...');
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  //console.log('[Service Worker] Fetching url ....', event.request.url);
  event.respondWith(fetch(event.request));
});

//self.addEventListener('push', function (event) {
//  console.log('push event', event);
//});


messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[Service Worker] Received background message ', payload);
  //// Customize notification here
  //const notificationTitle = 'Background Message Title';
  //const notificationOptions = {
  //  body: 'Background Message body.',
  //  icon: '/firebase-logo.png'
  //};
  //
  //return self.registration.showNotification(notificationTitle,
  //    notificationOptions);
});
