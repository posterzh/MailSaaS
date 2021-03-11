import { CAMPAIGN_START, CAMPAIGN_COMPOSE } from "../actionType/actionType";

const initialState = {
  title: "",
  fromAddress: "",
};

export const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGN_START:
      return {
        ...state,
        title: action.payload.title,
        fromAddress: action.payload.fromAddress,
      };
    case CAMPAIGN_COMPOSE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
