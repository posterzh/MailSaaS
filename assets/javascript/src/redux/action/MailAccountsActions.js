import axios from "../../utils/axios";
import {
  toastOnError,
  toastOnSuccess,
  toggleTopLoader,
} from "../../utils/Utils";
import {
  GET_MAILACCOUNTS,
  ADD_MAILACCOUNT,
  DELETE_MAILACCOUNT,
  UPDATE_MAILACCOUNT,
} from "../actionType/actionType";

export const getMailAccounts = () => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .get("/mailaccounts/emailaccounts/")
    .then((response) => {
      dispatch({
        type: GET_MAILACCOUNTS,
        payload: response.data,
      });
      return response.data;
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};

export const addMailAccount = (mailAccount) => (dispatch) => {
  toggleTopLoader(true);
  axios
    .post("/mailaccounts/emailaccounts/", mailAccount)
    .then((response) => {
      dispatch({
        type: ADD_MAILACCOUNT,
        payload: response.data,
      });
      toastOnSuccess("Added successfully!");
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};

export const deleteMailAccount = (id) => (dispatch) => {
  toggleTopLoader(true);
  axios
    .delete(`/mailaccounts/emailaccounts/${id}/`)
    .then((response) => {
      dispatch({
        type: DELETE_MAILACCOUNT,
        payload: id,
      });
      toastOnSuccess("Deleted successfully!");
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};

export const updateMailAccount = (id, mailAccount) => (dispatch) => {
  toggleTopLoader(true);
  axios
    .patch(`/mailaccounts/emailaccounts/${id}/`, mailAccount)
    .then((response) => {
      dispatch({
        type: UPDATE_MAILACCOUNT,
        payload: response.data,
      });

      toastOnSuccess("Updated successfully!");

      return response.data;
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};
