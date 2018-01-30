export default function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
        .then(() => {
          console.log("service worker registered");
        })
        .catch((e) => {
          console.log("service worker registration failed", e);
        });
  }
}