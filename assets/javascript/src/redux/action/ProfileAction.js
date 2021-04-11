import axios from "../../utils/axios";
import {
  GET_PROFILE,
} from "../actionType/actionType"
import { toastOnError, toastOnSuccess, toggleTopLoader, toggleAuthLoader } from "../../utils/Utils";

export const getProfile = () => (dispatch) => {
  toggleAuthLoader(true);
  axios.get(`/rest-auth/user/`)
    .then((response) => {
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleAuthLoader(false);
    });
}