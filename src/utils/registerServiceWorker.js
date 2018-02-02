export default function registerServiceWorker() {
  console.log('[Service Worker] Registering Service worker');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
        .then(() => {
          console.log("[Service Worker] service worker registered");
        })
        .catch((e) => {
          console.log("[Service Worker] service worker registration failed", e);
        });
  } else {
    console.log('[Service Worker] Service worker not supported in this browser');
  }
}