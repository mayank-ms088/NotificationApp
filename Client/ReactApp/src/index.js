import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import home from "views/HomePage/home.js";
import events from "views/Events/event.js";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
     	<Route path="/" component={home} />
      
    </Switch>
  </Router>,
  document.getElementById("root")
);
