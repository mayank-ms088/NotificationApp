import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB-8V3zfcU6t3LoRgAzTU3RlZ0Cyx1eHzM",
  authDomain: "notificationapp-9047d.firebaseapp.com",
  projectId: "notificationapp-9047d",
  storageBucket: "notificationapp-9047d.appspot.com",
  messagingSenderId: "52998922155",
  appId: "1:52998922155:web:73357e8fa7ce15e282fcee",
  measurementId: "G-901J2YF9TS"
};
function IntitalizeFireBaseMessaging(messaging) {
        messaging.requestPermission()
            .then(()=>{
                console.log("Notification Permission");
                return messaging.getToken();
            })
            .then((token) =>{
                console.log("Token : "+token);
                document.getElementById("token").innerHTML=token;
            })
            .catch((reason)=> {
                console.log(reason);
            });
}
export function initFirebase(){
    firebase.initializeApp(firebaseConfig);
    const messaging=firebase.messaging();



messaging.onMessage(function (payload) {
        console.log(payload);
        const notificationOption={
            body:payload.notification.body,
            icon:payload.notification.icon
        };

        if(Notification.permission==="granted"){
            var notification=new Notification(payload.notification.title,notificationOption);

            notification.onclick=function (ev) {
                ev.preventDefault();
                window.open(payload.notification.click_action,'_blank');
                notification.close();
            }
        }

    });
messaging.onTokenRefresh(function () {
        messaging.getToken()
            .then(function (newtoken) {
                console.log("New Token : "+ newtoken);
            })
            .catch(function (reason) {
                console.log(reason);
            })
})
IntitalizeFireBaseMessaging(messaging);
}