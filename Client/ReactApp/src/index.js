import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import home from "views/HomePage/home.js";
import {messaging} from "utils/init-fcm.js";
import {setToken} from "utils/apiCalls.js";
var hist = createBrowserHistory();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

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
messaging.requestPermission()
            .then(()=>{
                console.log("Notification Permission");
                return messaging.getToken();
            })
            .then((token) =>{
                setToken(token);
            })
            .catch((reason)=> {
                console.log(reason);
            });
navigator.serviceWorker.addEventListener("message", (message) => console.log(message));

ReactDOM.render(
  <Router history={hist}>
    <Switch>
     	<Route path="/" component={home} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
