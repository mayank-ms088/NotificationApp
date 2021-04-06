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
    apiKey: "AIzaSyBfhzlaOuvzV04oHNOGN2afunCOpJJGaNs",
    authDomain: "raven-test-app.firebaseapp.com",
    databaseURL: "https://raven-test-app.firebaseio.com",
    projectId: "raven-test-app",
    storageBucket: "raven-test-app.appspot.com",
    messagingSenderId: "720703019142",
    appId: "1:720703019142:web:92852a2073af849b391907",
    measurementId: "G-9T19QD6LCS"
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