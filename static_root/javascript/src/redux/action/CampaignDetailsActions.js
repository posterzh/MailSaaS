import axios from "../../utils/axios";
import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../utils/Utils";
import { history } from "../..";
import {
  GET_OVERVIEW_SUMMARY,
  GET_DETAILS_SEQUENCE,
  GET_DETAILS_RECIPIENTS,
  GET_DETAILS_SETTINGS,
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

export const getDetialsSequence = (id) => (dispatch) => {
  toggleTopLoader(true);
  axios
    .get(`/campaign/details-sequence/${id}/`)
    .then((response) => {
      dispatch({
        type: GET_DETAILS_SEQUENCE,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}

export const getDetailRecipients = (id) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .get(`/campaign/details-recipients/${id}/`)
    .then((response) => {
      dispatch({
        type: GET_DETAILS_RECIPIENTS,
        payload: response.data.results,
      });
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}

export const getDetailsSettings = (id) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .get(`/campaign/details-settings/${id}/`)
    .then((response) => {
      dispatch({
        type: GET_DETAILS_SETTINGS,
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
}

export const getLeadSettings = (id) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .get(`/campaign/settings-lead/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toastOnError(error);
    })
    .finally(() => {
      toggleTopLoader(false);
    });
}

export const updateLeadSettings = (id, data) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .post(`/campaign/settings-lead/${id}/`, data)
    .then((response) => {
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
