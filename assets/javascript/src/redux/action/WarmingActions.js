import axios from "../../utils/axios";
import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../utils/Utils";
import {
  GET_WARMINGS,
} from "../actionType/actionType";

export const getWarmings = () => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .get("/mailaccounts/warmings/")
    .then((response) => {
      dispatch({
        type: GET_WARMINGS,
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

export const updateWarmings = (id, data) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .post(`/mailaccounts/warmings/${id}/`, data)
    .then((response) => {
      // dispatch({
      //   type: UPDATE_MAILACCOUNT,
      //   payload: response.data,
      // });
      return response.data;
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};