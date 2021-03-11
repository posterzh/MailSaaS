import { toast } from "react-toastify";
import { store } from "../redux/store/store";
import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from "../redux/actionType/actionType";

export const toastOnError = (error) => {
  let errMessage = "";
  if (error.response) {
    // known error
    errMessage = JSON.stringify(error.response.data);
  } else if (error.message) {
    errMessage = JSON.stringify(error.message);
  } else {
    errMessage = JSON.stringify(error);
  }

  showNotification("warning", "API Call Error", errMessage);
};

export const showNotification = (notification_type, title, message) => {
  store.dispatch({
    type: SHOW_NOTIFICATION,
    payload: {
      type: notification_type,
      title,
      message,
    },
  });
};

export const hideNotification = () => {
  store.dispatch({
    type: HIDE_NOTIFICATION,
  });
};
