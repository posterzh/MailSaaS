import axios from "axios";
import { history } from "../.."
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GOOGLE_LOGIN_USER,
} from "../actionType/actionType"
import { toastOnError, toastOnSuccess, toggleTopLoader, toggleAuthLoader } from "../../utils/Utils";

import Api from "../api/api"
import {
  DJANGO_OAUTH_CLIENT_ID,
  DJANGO_OAUTH_CLIENT_SECRET
} from "../../utils/Common";

export const register = (user) => (dispatch) => {
  toggleAuthLoader(true);
  axios.post("/rest-auth/registration/", user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("access_token", token);

      dispatch({
        type: REGISTER_USER,
        payload: response.data.user,
      });

      history.push("/app/admin/dashboard");
      window.location.reload();
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleAuthLoader(false);
    });
};

export const login = (user) => (dispatch) => {
  toggleAuthLoader(true);
  axios.post("/rest-auth/login/", user)
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem("access_token", token);

    dispatch({
      type: LOGIN_USER,
      payload: response.data.user,
    });

    history.push("/app/admin/dashboard");
    window.location.reload();
  })
  .catch((error) => {
    // toastOnError(error);
  })
  .finally(() => {
    toggleAuthLoader(false);
  });
}

export const logout = () => (dispatch) => {
  toggleTopLoader(true);
  axios.post("/rest-auth/logout/")
    .then((response) => {
      localStorage.removeItem("access_token");

      dispatch({
        type: LOGOUT_USER,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}

export const googleLogin = (user, token) => (dispatch) => {
  const data = {
    "grant_type": "convert_token",
    "client_id": DJANGO_OAUTH_CLIENT_ID,
    "client_secret": DJANGO_OAUTH_CLIENT_SECRET,
    "backend": "google-oauth2",
    "token": token
  }
  toggleAuthLoader(true);
  axios.post("/auth/convert-token", data)
    .then((response) => {
      const token = response.data.access_token;
      localStorage.setItem("access_token", token);

      dispatch({
        type: GOOGLE_LOGIN_USER,
        payload: user
      });

      history.push("/app/admin/dashboard");
      window.location.reload();
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleAuthLoader(false);
    });
}