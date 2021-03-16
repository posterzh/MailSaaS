import {
    GET_UNSUBSCRIBES
  } from "../actionType/actionType";
  
  const initialState = {
    unsubscribes: [],
  };
  
  export const unsubscribesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_UNSUBSCRIBES:
        return {
          ...state,
          unsubscribes: action.payload.results,
        };
      default:
        return state;
    }
  };
  