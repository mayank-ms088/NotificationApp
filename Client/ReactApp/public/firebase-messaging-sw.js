importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyB-8V3zfcU6t3LoRgAzTU3RlZ0Cyx1eHzM",
  authDomain: "notificationapp-9047d.firebaseapp.com",
  projectId: "notificationapp-9047d",
  storageBucket: "notificationapp-9047d.appspot.com",
  messagingSenderId: "52998922155",
  appId: "1:52998922155:web:73357e8fa7ce15e282fcee",
  measurementId: "G-901J2YF9TS"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});