import { CAMPAIGN_START, CAMPAIGN_RECIPIENT, CAMPAIGN_COMPOSE } from "../actionType/actionType";

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
    case CAMPAIGN_RECIPIENT:
      return {
        ...state,
        csvfile: action.payload.csvfile,
      };
    case CAMPAIGN_COMPOSE:
      return {
        ...state,
        normal: action.payload.normal,
        follow_up: action.payload.followUpList,
        drips: action.payload.dripList
      };
    default:
      return state;
  }
};
