import axios from "../../utils/axios";
import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../utils/Utils";
import { history } from "../..";
import {
  GET_OVERVIEW_SUMMARY
} from "../actionType/actionType";


export const getOverviewSummary = (id) => (dispatch) => {
  toggleTopLoader(true);
  axios
    .get(`/campaign/overview-summary/${id}/`)
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: GET_OVERVIEW_SUMMARY,
          payload: response.data.result,
        });
      } else {
        toastOnError(response.data.message);
        setTimeout(() => {
          history.push("/app/admin/campaign/create");
        }, 2000)
      }
      
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};

