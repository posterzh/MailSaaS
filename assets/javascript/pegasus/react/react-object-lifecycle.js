'use strict';
import React from "react";
import ReactDOM from "react-dom";
import EmployeeApplication from "./App";
import IndexView from "./src/views/Index.js";


let auth = new coreapi.auth.SessionAuthentication({
  csrfCookieName: 'csrftoken',
  csrfHeaderName: 'X-CSRFToken'
});
let client = new coreapi.Client({ auth: auth });
let domContainer = document.querySelector('#object-lifecycle-home');
domContainer ? ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/rtl" render={props => <RTLLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} /> */}
      <Route path="/" render={props => <IndexView {...props} />} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
  , domContainer) : null;
