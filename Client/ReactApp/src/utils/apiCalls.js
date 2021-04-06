import axios from 'axios';
import baseUrl from "utils/baseUrl.js";
import {sendMessage} from "raven/api/index.js";
import { RAVEN_SECRET_KEY, RAVEN_APP_ID, USER_ID, RAVEN_USER, DEVICE_TOKEN, DEVICE_ID} from 'raven/constants'
var Token;
export function setToken(token){
  Token = token;
}
export function smsApiCall(sms){
	axios.post(baseUrl + '/SMS',sms)
    .then(response =>{
      console.log(response)
    })
    .catch(error =>{
      console.log(error)
    })
	
};
export function pushNotificationApiCall(pushNotification){
  const notification = {
    title: pushNotification.title,
    body: pushNotification.body
  }
  let user = localStorage.getItem(RAVEN_USER);
  user = JSON.parse(user)
  let user_id = user.user_id
  let email = user.email;
  let mobile = user.mobile;
  console.log();
	sendMessage(user_id,email,mobile,notification);
};

