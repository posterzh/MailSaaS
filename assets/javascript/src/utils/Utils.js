import { toast } from "react-toastify";
import { store } from "../redux/store/store";
import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  TOP_LOADER,
  AUTH_LOADER,
} from "../redux/actionType/actionType";

export const toastOnError = (error) => {
  let errMessage = "";
  if (error.response) {
    // known error
    errMessage = JSON.stringify(error.response.data);
  } else if (error.message) {
    errMessage = JSON.stringify(error.message);
  } else if (typeof error !== 'string') {
    errMessage = messages.api_failed;
  } else {
    errMessage = error;
  }

  if (errMessage.length > 100) {
    showNotification("warning", "API Call Error", "The server encountered an internal error. Please try again.");
  }
  else {
    showNotification("warning", "API Call Error", errMessage);
  }
};

export const toastOnSuccess = (msg) => {
  showNotification("success", "Success", msg);
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

export const toggleTopLoader = (visible) => {
  store.dispatch({
    type: TOP_LOADER,
    payload: {
      visible
    },
  });
};

export const toggleAuthLoader = (visible) => {
  store.dispatch({
    type: AUTH_LOADER,
    payload: visible,
  });
};

export const formatHeader = (str) => {
  let strArr = str.split(/[\-\_]+/);
  let formatStrArr = strArr.map((s) => {
      if (s) {
          return s.charAt(0).toUpperCase() + s.slice(1);
      } else {
          return '';
      }
  });
  return formatStrArr.join(" ");
}

export const parseCSVRow = (row) => {
 
  const tableHeaders = [];
  Object.keys(row).forEach((key) => {
      if (
          key &&
          (key.toLowerCase().indexOf("name") > -1 ||
              key.toLowerCase().indexOf("email") > -1)
      ) {
          tableHeaders.push({
              key: key,
              value: formatHeader(key),
          });
      }
  });
  return tableHeaders;
}

export const parseTemplate = (str, row) => {

  // extract matches {{...}}
  if (!str) return '';
  
  const matches = str.match(/\{\{([^{}]*)\}\}/g);
  if (matches && matches.length > 0) {
      matches.forEach((m) => {
          const key = m.slice(2, -2).trim();
          if (key && (key in row)) {
              str = str.replaceAll(m, row[key]);
          }
      });
  }
  return str;
}

export const messages = {
  "add_success": "Successfully created",
  "update_success": "Successfully updated",
  "delete_success": "Successfully removed",
  "api_failed": "Sorry, server connection failed. please try again.",
  "not_found_id": "Sorry, there is no item with this id"
}

export const makeTokenKeyword = (socialType) => {
  if (socialType == 'none') {
    return 'jwt';
  } else if (socialType == 'google') {
    return 'bearer';
  }
  return 'jwt';
}