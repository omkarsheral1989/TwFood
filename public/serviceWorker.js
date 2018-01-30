console.log('log from service worker');

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...');
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ...');
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ....', event);
  event.respondWith(fetch(event.request));
});

self.addEventListener('push', function (event) {
  console.log('push event', event);
});