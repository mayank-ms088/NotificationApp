// [START messaging_init_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
        apiKey: "AIzaSyB-8V3zfcU6t3LoRgAzTU3RlZ0Cyx1eHzM",
        authDomain: "notificationapp-9047d.firebaseapp.com",
        projectId: "notificationapp-9047d",
        storageBucket: "notificationapp-9047d.appspot.com",
        messagingSenderId: "52998922155",
        appId: "1:52998922155:web:73357e8fa7ce15e282fcee",
        measurementId: "G-901J2YF9TS"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END messaging_init_in_sw]

// [START messaging_on_background_message]
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload["data"]["title"];
    const notificationOptions = {
        body: payload["data"]["body"],
        icon: payload["data"]["icon"]
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});