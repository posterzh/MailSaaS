import {
  GET_SENDING_CALENDARS,
  ADD_SENDING_CALENDAR,
  UPDATE_SENDING_CALENDAR,
  DELETE_SENDING_CALENDAR,
} from "../actionType/actionType";

const initialState = {
  sendingCalendars: [],
};

export const sendingCalendarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SENDING_CALENDARS:
      return {
        ...state,
        sendingCalendars: action.payload,
      };
    case ADD_SENDING_CALENDAR:
      return {
        ...state,
        sendingCalendars: [...state.sendingCalendars, action.payload],
      };
    case DELETE_SENDING_CALENDAR:
      return {
        ...state,
        sendingCalendars: state.sendingCalendars.filter(
          (item, index) => item.id !== action.payload
        ),
      };
    case UPDATE_SENDING_CALENDAR:
      const sendingCalendars = state.sendingCalendars.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        sendingCalendars: sendingCalendars,
      };
    default:
      return state;
  }
};
