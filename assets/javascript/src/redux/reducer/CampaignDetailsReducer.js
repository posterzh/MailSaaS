import {
  GET_OVERVIEW_SUMMARY,
} from "../actionType/actionType";

const initialState = {
  overviewSummary: {}
};

export const campaignDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OVERVIEW_SUMMARY:
      return {
        ...state,
        overviewSummary: action.payload,
      };
    default:
      return state;
  }
};




  