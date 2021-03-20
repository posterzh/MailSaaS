import {
  GET_OVERVIEW_SUMMARY,
} from "../actionType/actionType";

const initialState = {
  overviewSummary: {},
  id: '',
  title: ''
};

export const campaignDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OVERVIEW_SUMMARY:
      return {
        ...state,
        overviewSummary: action.payload,
        id: action.payload.id,
        title: action.payload.title
      };
    default:
      return state;
  }
};




  