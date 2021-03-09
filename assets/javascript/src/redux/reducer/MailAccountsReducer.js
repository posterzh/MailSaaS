import {
  GET_MAILACCOUNTS,
  ADD_MAILACCOUNT,
  UPDATE_MAILACCOUNT,
  DELETE_MAILACCOUNT,
} from "../actionType/actionType";

const initialState = {
  mailAccounts: [],
};

export const mailAccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAILACCOUNTS:
      return {
        ...state,
        mailAccounts: action.payload,
      };
    case ADD_MAILACCOUNT:
      return {
        ...state,
        mailAccounts: [...state.mailAccounts, action.payload],
      };
    case DELETE_MAILACCOUNT:
      return {
        ...state,
        mailAccounts: state.mailAccounts.filter(
          (item, index) => item.id !== action.payload
        ),
      };
    case UPDATE_MAILACCOUNT:
      const updatedMailAccounts = state.mailAccounts.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        mailAccounts: updatedMailAccounts,
      };
    default:
      return state;
  }
};
