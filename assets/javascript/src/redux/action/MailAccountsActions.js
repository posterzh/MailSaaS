import axios from "../../utils/axios";
import { toastOnError } from "../../utils/Utils";
import {
  GET_MAILACCOUNTS,
  ADD_MAILACCOUNT,
  DELETE_MAILACCOUNT,
  UPDATE_MAILACCOUNT,
} from "../actionType/actionType";

export const getMailAccounts = () => (dispatch) => {
  axios
    .get("/mailaccounts/")
    .then((response) => {
      dispatch({
        type: GET_MAILACCOUNTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addMailAccount = (mailAccount) => (dispatch) => {
  axios
    .post("/mailaccounts/", mailAccount)
    .then((response) => {
      dispatch({
        type: ADD_MAILACCOUNT,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const deleteMailAccount = (id) => (dispatch) => {
  axios
    .delete(`/mailaccounts/${id}/`)
    .then((response) => {
      dispatch({
        type: DELETE_MAILACCOUNT,
        payload: id,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const updateMailAccount = (id, mailAccount) => (dispatch) => {
  axios
    .patch(`/mailaccounts/${id}/`, mailAccount)
    .then((response) => {
      dispatch({
        type: UPDATE_MAILACCOUNT,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
