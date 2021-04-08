/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
// react library for routing
import { Router, Route, Switch, Redirect } from "react-router-dom";

// bootstrap rtl for rtl support page
// // import "assets/vendor/bootstrap-rtl/bootstrap-rtl.scss";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// plugins styles downloaded
import "../../vendor/nucleo/css/nucleo.css";
// core styles
import "../../scss/argon-dashboard-pro-react.scss?v1.2.0";

// import RTLLayout from "layouts/RTL.js";
// import AuthLayout from "layouts/Auth.js";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import IndexView from "./views/Index.js";
import {store, persistor} from "./redux/store/store";
import PrivateRoute from "./layouts/PrivateRoute";
import { createBrowserHistory } from "history";
import { PersistGate } from 'redux-persist/integration/react';
export const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Switch>
          <PrivateRoute
            path="/app/admin"
            render={(props) => <AdminLayout {...props} />}
          />
          <Route path="/app/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/app" render={(props) => <IndexView {...props} />} />
        </Switch>
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById("object-lifecycle-home")
);
