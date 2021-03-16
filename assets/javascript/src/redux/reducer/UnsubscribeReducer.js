import {
    GET_UNSUBSCRIBES,
    ADD_UNSUBSCRIBE_EMAILS,
  } from "../actionType/actionType";
  
  const initialState = {
    unsubscribes: [],
  };
  
  export const unsubscribesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_UNSUBSCRIBES:
        return {
          ...state,
          unsubscribes: action.payload,
        };
      case ADD_UNSUBSCRIBE_EMAILS:
        return {
          ...state,
          unsubscribes: [...state.unsubscribes, ...action.payload],
        };
      default:
        return state;
    }
  };
  