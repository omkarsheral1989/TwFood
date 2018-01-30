import firebase from './firebase';


function isNofiticationPermissionGranted() {
  return Notification.permission === 'granted';
}

export function requestNotificationPermission() {
  if (isNofiticationPermissionGranted()) {
    console.log("[Notification] permission is already granted");
    return;
  }
  console.log('[Notification] Requesting permission');

  const messaging = firebase.messaging();
  messaging.requestPermission()
      .then(()=> {
        console.log('[Notification] permission granted.');
        return messaging.getToken();
      })
      .then((token)=> {
        if (token) {
          //sendTokenToServer(token);
          //updateUIForPushEnabled(token);
          console.log('[Notification] got FCM token:', token);

          //TODO register as group.


        } else {
          console.log('[Notification] No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('[Notification] Error in getting permission or token', err);
      });
}

export function registerForegroundFCMHandler() {
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
  const messaging = firebase.messaging();
  messaging.onMessage(function (payload) {
    console.log("[Notification] Foreground Message received. ", payload);
    //ignore as app is already in foreground.
  });
}