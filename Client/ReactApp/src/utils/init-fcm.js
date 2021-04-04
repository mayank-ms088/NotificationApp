import firebase from "firebase";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
        apiKey: "AIzaSyB-8V3zfcU6t3LoRgAzTU3RlZ0Cyx1eHzM",
        authDomain: "notificationapp-9047d.firebaseapp.com",
        projectId: "notificationapp-9047d",
        storageBucket: "notificationapp-9047d.appspot.com",
        messagingSenderId: "52998922155",
        appId: "1:52998922155:web:73357e8fa7ce15e282fcee",
        measurementId: "G-901J2YF9TS"
});
const messaging = initializedFirebaseApp.messaging();
export { messaging };