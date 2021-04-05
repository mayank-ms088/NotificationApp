import axios from 'axios';
import baseUrl from "utils/baseUrl.js";
var Token;
export function setToken(token){
  Token = token;
}
export function smsApiCall(sms){
	axios.post(baseUrl + '/push_notification',sms)
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

