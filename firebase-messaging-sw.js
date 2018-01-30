importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '818180391362'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
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