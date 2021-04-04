import React from "react";
import axios from 'axios';




export function smsApiCall(sms){
	axios.post('http://localhost:5000/push_notification',sms)
    .then(response =>{
      console.log(response)
    })
    .catch(error =>{
      console.log(error)
    })
	
};
export function pushNotificationApiCall(pushNotification){
	axios.post('http://localhost:5000/push_notification',pushNotification)
    .then(response =>{
      console.log(response)
    })
    .catch(error =>{
      console.log(error)
    })
};

