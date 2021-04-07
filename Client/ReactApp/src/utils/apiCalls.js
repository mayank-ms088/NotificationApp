import axios from 'axios';
import baseUrl from "utils/baseUrl.js";
import { RAVEN_SECRET_KEY, RAVEN_APP_ID, USER_ID, RAVEN_USER, DEVICE_TOKEN, DEVICE_ID} from 'raven/constants';
import {sendMessage} from "raven/api/index.js";
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
  pushNotification.token = Token;
	axios.post(baseUrl + '/push_notification',pushNotification)
    .then(response =>{
      console.log(pushNotification)
    })
    .catch(error =>{
      console.log(error)
    })
};
export function ravenApiCall(){
  const user = JSON.parse(localStorage.getItem(RAVEN_USER));
  const email = user.email;
  const mobile = user.mobile;
  const user_id = user.user_id;
  const token = localStorage.getItem(DEVICE_TOKEN);
  console.log(token);
  sendMessage(user_id,email,mobile,token);
}
