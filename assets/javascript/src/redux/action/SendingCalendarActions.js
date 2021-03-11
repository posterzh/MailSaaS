import axios from "../../utils/axios";
import { toastOnError } from "../../utils/Utils";
import {
  GET_SENDING_CALENDARS,
  ADD_SENDING_CALENDAR,
  DELETE_SENDING_CALENDAR,
  UPDATE_SENDING_CALENDAR,
} from "../actionType/actionType";

export const getSendingCalendars = () => (dispatch) => {
  axios
    .get("/mailaccounts/sending-calendars/")
    .then((response) => {
      dispatch({
        type: GET_SENDING_CALENDARS,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addSendingCalendar = (sendingCalendar) => (dispatch) => {
  axios
    .post("/mailaccounts/sending-calendars/", sendingCalendar)
    .then((response) => {
      dispatch({
        type: ADD_SENDING_CALENDAR,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const deleteSendingCalendar = (id) => (dispatch) => {
  axios
    .delete(`/mailaccounts/sending-calendars/${id}/`)
    .then((response) => {
      dispatch({
        type: DELETE_SENDING_CALENDAR,
        payload: id,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const updateSendingCalendar = (id, sendingCalendar) => (dispatch) => {
  axios
    .patch(`/mailaccounts/sending-calendars/${id}/`, sendingCalendar)
    .then((response) => {
      dispatch({
        type: UPDATE_SENDING_CALENDAR,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
