import {
  GET_UNSUBSCRIBES,
  ADD_UNSUBSCRIBE_EMAILS,
  ADD_UNSUBSCRIBE_CSV,
  DELETE_UNSUBSCRIBE_EMAILS,
} from "../actionType/actionType"
import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../utils/Utils";
import axios from "../../utils/axios";

export const getUnsubscribes = (search) => (dispatch) => {
  toggleTopLoader(true);
  axios.get('/unsubscribes/', {search})
    .then((response) => {
      dispatch({
        type: GET_UNSUBSCRIBES,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};

export const addUnsubscribeEmails = (emailList, user) => (dispatch) => {
  toggleTopLoader(true);
  const data = emailList.map(email => ({
    email: email,
    mail_account: user.email,
    name: user.first_name,   
  }))
  axios.post('/unsubscribes/add-emails', data)
    .then((response) => {
      dispatch({
        type: ADD_UNSUBSCRIBE_EMAILS,
        payload: response.data
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}

export const addUnsubscribeCSV = (file) => (dispatch) => {
  let fileData = new FormData();
  fileData.append("file", file);
  toggleTopLoader(true);
  axios.post('/unsubscribes/add-csv', fileData)
    .then((response) => {
      dispatch({
        type: ADD_UNSUBSCRIBE_CSV,
        payload: response.data
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}

export const deleteUnsubscribeEmails = (ids) => (dispatch) => {
  toggleTopLoader(true);
  axios.post('/unsubscribes/delete-emails', ids)
    .then((response) => {
      dispatch({
        type: DELETE_UNSUBSCRIBE_EMAILS,
        payload: ids,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}
