import {
  FILTER_RECIPIENTS
} from "../actionType/actionType";

const initialState = {
  recipients: [],
};

export const prospectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_RECIPIENTS:
      return {
        ...state,
        recipients: action.payload.results,
      };
    default:
      return state;
  }
};
