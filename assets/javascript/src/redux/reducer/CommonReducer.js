import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actionType/actionType";

const initialState = {
  showNotification: false,
  type: 0,
  title: "",
  message: "",
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        showNotification: true,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
      };
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};
