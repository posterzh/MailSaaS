import axios from "../../utils/axios";
import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../utils/Utils";
import { history } from "../..";
import {
  GET_OVERVIEW_SUMMARY,
  GET_DETAILS_SEQUENCE,
  GET_DETAILS_RECIPIENTS,
  GET_DETAILS_SETTINGS,
  IMPORT_CONTACTS_FROM_CSV,
  UPDATE_RECIPIENT_STATUS,
  DELETE_RECIPIENT,
} from "../actionType/actionType";

export const getOverviewSummary = (id) => (dispatch) => {
  toggleTopLoader(true);
  axios
    .get(`/campaign/overview-summary/${id}/`)
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_OVERVIEW_SUMMARY,
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

export const updateRecipientStatus = (id, status) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .patch(`/campaign/details-recipients-update/${id}/`, {"recipient_status": status})
    .then((response) => {
      dispatch({
        type: UPDATE_RECIPIENT_STATUS,
        payload: response.data
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
}

export const deleteRecipient = (id) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .patch(`/campaign/details-recipients-update/${id}/`, {"is_delete": true})
    .then((response) => {
      dispatch({
        type: DELETE_RECIPIENT,
        payload: response.data
      });
      toastOnSuccess("Deleted successfully!");
      return response.data;
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

export const updateSendingAddress = (id, sendingAddress) => (dispatch) => {
  toggleTopLoader(true);
  return axios
    .patch(`/campaign/details-settings-update/${id}/`, {"from_address": sendingAddress})
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
}

export const importContactsFromCSV = (id, csvFile) => (dispatch) => {
  const formData = new FormData();
  formData.append('csv_file', csvFile);
  toggleTopLoader(true);
  return axios
    .post(`/campaign/details-recipients-add/${id}`, formData)
    .then((response) => {
      dispatch({
        type: IMPORT_CONTACTS_FROM_CSV,
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
