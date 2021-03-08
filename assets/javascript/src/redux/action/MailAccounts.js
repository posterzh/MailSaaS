import {
  FETCH_MAILACCOUNTS_STARTED,
  FETCH_MAILACCOUNTS_SUCCESS,
  FETCH_MAILACCOUNTS_FAILURE,
  CREATE_MAILACCOUNT_STARTED,
  CREATE_MAILACCOUNT_SUCCESS,
  CREATE_MAILACCOUNT_FAILURE,
  UPDATE_MAILACCOUNT_STARTED,
  UPDATE_MAILACCOUNT_SUCCESS,
  UPDATE_MAILACCOUNT_FAILURE,
  DELETE_MAILACCOUNT_STARTED,
  DELETE_MAILACCOUNT_SUCCESS,
  DELETE_MAILACCOUNT_FAILURE,
} from "../actionType/actionType";
import axios from "../api/axios";

export const fetchMailAccounts = () => {
  return (dispatch) => {
    dispatch(fetchMailAccountsStarted());

    axios
      .get("/mailaccounts")
      .then((res) => {
        dispatch(fetchMailAccountsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchMailAccountsFailure(err.message));
      });
  };
};

export const createMailAccount = (newMailAccount) => {
  return (dispatch) => {
    dispatch(createMailAccountStarted());

    axios
      .post("/mailaccounts", newMailAccount)
      .then((res) => {
        dispatch(createMailAccountSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createMailAccountFailure(err.message));
      });
  };
};

export const fetchMailAccount = (id) => {
  return (dispatch) => {
    dispatch(fetchMailAccountStarted());

    axios
      .get(`/mailaccounts/${id}`)
      .then((res) => {
        dispatch(fetchMailAccountSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchMailAccountFailure(err.message));
      });
  };
};

const fetchMailAccountsStarted = () => ({
  type: FETCH_MAILACCOUNTS_STARTED,
});

const fetchMailAccountsSuccess = (mailAccounts) => ({
  type: FETCH_MAILACCOUNTS_SUCCESS,
  payload: mailAccounts,
});

const fetchMailAccountsFailure = (error) => ({
  type: FETCH_MAILACCOUNTS_FAILURE,
  payload: error,
});

const createMailAccountStarted = () => ({
  type: CREATE_MAILACCOUNT_STARTED,
});

const createMailAccountSuccess = (newMailAccount) => ({
  type: CREATE_MAILACCOUNT_SUCCESS,
  payload: newMailAccount,
});

const createMailAccountFailure = (error) => ({
  type: CREATE_MAILACCOUNT_FAILURE,
  payload: error,
});

const fetchMailAccountStarted = () => ({
  type: FETCH_MAILACCOUNT_STARTED,
});

const fetchMailAccountSuccess = (mailAccount) => ({
  type: FETCH_MAILACCOUNT_SUCCESS,
  payload: mailAccount,
});

const fetchMailAccountFailure = (error) => ({
  type: FETCH_MAILACCOUNT_FAILURE,
  payload: {
    error,
  },
});
