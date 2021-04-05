import {
  FILTER_RECIPIENTS,
  COUNT_RECIPIENTS,
} from "../../redux/actionType/actionType";
import { toastOnError, toggleTopLoader } from "../../utils/Utils";
import axios from "../../utils/axios";

export const filterRecipients = (filter) => (dispatch) => {
  toggleTopLoader(true);
  axios.get('/campaign/prospects/', filter)
    .then((response) => {
      dispatch({
        type: FILTER_RECIPIENTS,
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

export const countRecipients = () => (dispatch) => {
  axios.get('/campaign/prospects/count')
    .then((response) => {
      dispatch({
        type: COUNT_RECIPIENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
    });
};
