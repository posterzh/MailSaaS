import axios from "../../utils/axios";
import { history } from "../..";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GOOGLE_LOGIN_USER,
} from "../actionType/actionType";
import {
  toastOnError,
  toastOnSuccess,
  toggleTopLoader,
  toggleAuthLoader,
} from "../../utils/Utils";

import Api from "../api/api";
import {
  DJANGO_OAUTH_CLIENT_ID,
  DJANGO_OAUTH_CLIENT_SECRET,
} from "../../utils/Common";

export const register = (user) => (dispatch) => {
  dispatch({
    type: REGISTER_USER,
    payload: user,
  });
};

export const login = (user) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: user,
  });
};

export const logout = () => (dispatch) => {
  toggleTopLoader(true);
  axios
    .post("/rest-auth/logout/")
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
};

export const googleLogin = (user) => (dispatch) => {
  dispatch({
    type: GOOGLE_LOGIN_USER,
    payload: user
  });
}
