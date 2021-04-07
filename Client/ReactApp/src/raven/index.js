import { register } from './registerServiceWorker';
import { initializeFirebase } from './fcm';
import { getToken } from './fcm';
import * as api from './api';
import { DEVICE_TOKEN, FIREBASE_CONFIG, FIREBASE_VAPID_KEY, RAVEN_USER, USER_ID, DEVICE_ID } from './constants';

export function initialize() {
    register();
    initializeFirebase(FIREBASE_CONFIG);
    api.getUser()
}


export function setUser(userId, mobile, email) {
    if (!userId || (!mobile && !email)) {
        return
    }

    //set user id
    localStorage.setItem(USER_ID, userId)

    //check if data is already set for the user
    var user = localStorage.getItem(RAVEN_USER)
    if (user) {
        user = JSON.parse(user)
    }

    var isMobileSet = false;
    if (mobile) {
        if (user && user.mobile === mobile) {
            isMobileSet = true;
        }
    } else {
        isMobileSet = true;
    }

    var isEmailSet = false;
    if (email) {
        if (user && user.email === email) {
            isEmailSet = true;
        }
    } else {
        isEmailSet = true;
    }

    if (!isEmailSet || !isMobileSet) {
        api.setUser(userId, email, mobile)
    }
}

/*
    onError (error, isPermanentDenial)
*/
export function setupPushNotification(onError) {

    // [START messaging_request_permission]
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            //check if token already present locally
            var token = localStorage.getItem(DEVICE_TOKEN)
            if (!token) {
                getToken(FIREBASE_VAPID_KEY, onTokenReceived)
            }
        } else {
            console.log('Unable to get permission to notify.');
            onError('Unable to get permission to notify.')
        }
    });
    // [END messaging_request_permission]
}


export function logout() {
    var deviceId = localStorage.getItem(DEVICE_ID)
    if (!deviceId) {
        return
    }

    let userId = localStorage.getItem(USER_ID)
    api.removeDevice(userId, deviceId)
}


function onTokenReceived(token) {

    if (!token) {
        return
    }

    //check if token already exists
    var localToken = localStorage.getItem(DEVICE_TOKEN)
    if (token === localToken) {
        return
    }

    var user = localStorage.getItem(RAVEN_USER)
    if (user) {
        user = JSON.parse(user)
    }
    if (user && user.devices) {
        for (var it in user.devices) {
            if (it["fcm_token"] === token) {
                localStorage.setItem(DEVICE_TOKEN, token)
                localStorage.setItem(DEVICE_ID, it["device_sid"])
                return
            }
        }
    }

    //get user id
    let userId = localStorage.getItem(USER_ID)

    api.setUserDevice(userId, token)
}