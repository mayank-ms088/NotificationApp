import { RAVEN_SECRET_KEY, RAVEN_APP_ID, USER_ID, RAVEN_USER, DEVICE_TOKEN, DEVICE_ID} from '../constants'

const AUTHORIZATION = `AuthKey ${RAVEN_SECRET_KEY}`
const BASE_URL = `https://api.ravenapp.dev/v1/apps/${RAVEN_APP_ID}`
const GET_USER = `${BASE_URL}/users/%s`
const SET_USER = `${BASE_URL}/users`
const SET_USER_DEVICE = `${BASE_URL}/users/%s/devices`
const REMOVE_USER_DEVICE = `${BASE_URL}/users/%s/devices/%s`
const SEND_URL = 'https://api.ravenapp.dev/v1/apps/'+RAVEN_APP_ID+'/events/send';
String.prototype.format = function () {
    return [...arguments].reduce((p, c) => p.replace(/%s/, c), this);
};

export function getUser() {

    var userId = localStorage.getItem(USER_ID)
    if (!userId) {
        return
    }

    //get user api
    fetch(GET_USER.format(userId), {
        headers: {
            'Authorization': AUTHORIZATION,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success fetching user:', data);
            localStorage.setItem(RAVEN_USER, JSON.stringify(data));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function setUser(userId, email, mobile) {

    if (!userId) {
        return
    }

    //get user api
    fetch(SET_USER, {
        method: 'POST',
        headers: {
            'Authorization': AUTHORIZATION,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "mobile": mobile,
            "email": email
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success setting user:', data);

            var user = localStorage.getItem(RAVEN_USER)
            if (user) {
                user = JSON.parse(user)
            }

            if (user && user.devices) {
                user = Object.assign(data, user.devices);
                localStorage.setItem(RAVEN_USER, JSON.stringify(user));
            } else {
                localStorage.setItem(RAVEN_USER, JSON.stringify(data));
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function setUserDevice(userId, token) {

    if (!userId || !token) {
        return
    }

    //get user api
    fetch(SET_USER_DEVICE.format(userId), {
        method: 'POST',
        headers: {
            'Authorization': AUTHORIZATION,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "platform": "web",
            "fcm_token": token
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success setting user device:', data);

            localStorage.setItem(DEVICE_TOKEN, token)
            localStorage.setItem(DEVICE_ID, data["device_sid"])

            var user = localStorage.getItem(RAVEN_USER)
            if (user) {
                user = JSON.parse(user)
            }

            if (user && user.devices) {
                let devices = [...user.devices]
                devices.push(data)
                user = Object.assign(user, devices);
                localStorage.setItem(RAVEN_USER, JSON.stringify(user));
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
export function sendMessage(userId, email, mobile, notification){
    //console.log(userId);
    if (!userId || !email || !mobile || !notification) {
        return
    }
    // send message api
    fetch(SEND_URL, {
        method: 'POST',
        headers: {
            'Authorization': AUTHORIZATION,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "event" : "test_event",
                "user" : {
                    "mobile" : '+91'+mobile,
                    "email" : email,
                    "whatsapp_mobile" : "", // if empty, `mobile` is considered for whatsapp
                },
                "notification": notification,
                "data" : {
                    "name" : "Mayank Sharma",
                    "date" : "Apr 6"
                }
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success setting user device:', data);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function removeDevice(userId, deviceId) {

    if (!userId || !deviceId) {
        return
    }

    //get user api
    fetch(REMOVE_USER_DEVICE.format(userId, deviceId), {
        method: 'DELETE',
        headers: {
            'Authorization': AUTHORIZATION,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success deleting user device:', deviceId);

            localStorage.setItem(DEVICE_TOKEN, null)
            localStorage.setItem(DEVICE_ID, null)
            localStorage.setItem(RAVEN_USER, null)
            localStorage.setItem(USER_ID, null)

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}