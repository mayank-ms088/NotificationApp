import firebase from 'firebase';

export const initializeFirebase = (config) => {
    firebase.initializeApp(config);
    receiveMessage()
}

function receiveMessage() {
    const messaging = firebase.messaging();
    // [START messaging_receive_message]
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.onBackgroundMessage` handler.
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        navigator.serviceWorker.getRegistration().then(function (reg) {
            displayNotification(reg, payload)
        });
    });
    // [END messaging_receive_message]
}

export function getToken(vapidKey, onTokenReceived) {
    const messaging = firebase.messaging();
    // [START messaging_get_token]
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken({ vapidKey: vapidKey }).then((currentToken) => {
        if (currentToken) {
            console.log('Token ', currentToken);
            onTokenReceived(currentToken)
            receiveMessage()
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // requestPermission(onError)
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        //Permission was denied
        // ...
    });
    // [END messaging_get_token]
}

function deleteToken() {
    const messaging = firebase.messaging();

    // [START messaging_delete_token]
    messaging.deleteToken().then(() => {
        console.log('Token deleted.');
        // ...
    }).catch((err) => {
        console.log('Unable to delete token. ', err);
    });
    // [END messaging_delete_token]
}

export function displayNotification(reg, payload) {
    const notificationTitle = payload["data"]["title"];
    const notificationOptions = {
        body: payload["data"]["body"],
        icon: payload["data"]["icon"]
    };
    reg.showNotification(notificationTitle, notificationOptions);
}