import { toast } from "react-toastify";
import { store } from "../redux/store/store";
import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from "../redux/actionType/actionType";

export const toastOnError = (error) => {
  console.log("error in API call!");

  if (error.response) {
    // known error
    toast.error(JSON.stringify(error.response.data));
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
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
