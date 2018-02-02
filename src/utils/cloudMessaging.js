import firebase from './firebase';
import * as Constants from './constants';


export function registerFcmServiceWorker() {
  console.log('[Notification] Registering FCM service worker');
  if (!'Notification' in window) {
    console.log('[Notification] Notification is not supported on this device');
    return;
  }

  const messaging = firebase.messaging();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration()
        .then((registration)=> {
          messaging.useServiceWorker(registration);
          console.log('[Notification] registered FCM service worker');
        })
        .then(()=> {
          registerForegroundFCMHandler();
        });
  }
}

export function requestNotificationPermission() {
  console.log('[Notification] Requesting notification permission');

  if (!'Notification' in window) {
    console.log('[Notification] Notification is not supported on this device');
    return;
  }

  const messaging = firebase.messaging();

  if (isNofiticationPermissionGranted()) {
    console.log("[Notification] permission is already granted");
    registerForTokenRefresh();
    return;
  }

  messaging.requestPermission()
      .then(()=> {
        console.log('[Notification] permission granted.');

        registerForTokenRefresh();

        return messaging.getToken();
      })
      .then((token)=> {
        if (token) {
          console.log('[Notification] got FCM token:', token);
          registerInGroup(token, Constants.CITY_PUNE);
        } else {
          console.log('[Notification] No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('[Notification] Error in getting permission or token', err);
      });
}

function registerForegroundFCMHandler() {
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

function isNofiticationPermissionGranted() {
  return Notification.permission === 'granted';
}

function registerForTokenRefresh() {
  const messaging = firebase.messaging();

  console.log('[Notification] registering handler for token refresh');

  messaging.onTokenRefresh(()=> {
    messaging.getToken()
        .then((refreshedToken) => {
          console.log('[Notification] Token refreshed.', refreshedToken);
          registerInGroup(refreshedToken, Constants.CITY_PUNE);
        })
        .catch((err) => {
          console.log('[Notification] Error retrieving refreshed token ', err);
        });
  });
}

function registerInGroup(token, city) {
  console.log('[Notification] registering the clien in pune group for notifications.');
  fetch(
      `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${city}`,
      {
        'method': 'POST',
        'headers': {
          'Authorization': 'key=AIzaSyCnRs-xF5U84T7VA-I0W35yxaFYwx45oUk',  //server key
          'Content-Type': 'application/json'
        }
      }
  ).then((response) => {
    if (response.ok) {
      console.log('[Notification] registered successfully in group');
    } else {
      console.log('[Notification] error registering in group, response was not OK', response);
    }
  }).catch((error)=> {
    console.error('[Notification] error registering in group', error);
  });
}