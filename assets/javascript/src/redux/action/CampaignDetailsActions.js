import axios from "../../utils/axios";
import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../utils/Utils";
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
      }
      
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
};

// export const addMailAccount = (mailAccount) => (dispatch) => {
//   axios
//     .post("/mailaccounts/emailaccounts/", mailAccount)
//     .then((response) => {
//       dispatch({
//         type: ADD_MAILACCOUNT,
//         payload: response.data,
//       });
//       toastOnSuccess("Added successfully!");
//     })
//     .catch((error) => {
//       toastOnError(error);
//     });
// };

// export const deleteMailAccount = (id) => (dispatch) => {
//   axios
//     .delete(`/mailaccounts/emailaccounts/${id}/`)
//     .then((response) => {
//       dispatch({
//         type: DELETE_MAILACCOUNT,
//         payload: id,
//       });
//       toastOnSuccess("Deleted successfully!");
//     })
//     .catch((error) => {
//       toastOnError(error);
//     });
// };

// export const updateMailAccount = (id, mailAccount) => (dispatch) => {
//   axios
//     .patch(`/mailaccounts/emailaccounts/${id}/`, mailAccount)
//     .then((response) => {
//       dispatch({
//         type: UPDATE_MAILACCOUNT,
//         payload: response.data,
//       });

//       toastOnSuccess("Updated successfully!");
//     })
//     .catch((error) => {
//       toastOnError(error);
//     });
// };
