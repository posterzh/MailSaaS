import { CAMPAIGN_START, CAMPAIGN_RECIPIENT, CAMPAIGN_COMPOSE, CAMPAIGN_OPTIONS, CAMPAIGN_SEND } from "../actionType/actionType";

const initialState = {
  title: "",
  from_address: "",
};

export const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGN_START:
      return {
        ...state,
        title: action.payload.title,
        from_address: action.payload.from_address,
      };
    case CAMPAIGN_RECIPIENT:
      return {
        ...state,
        csvfile: action.payload.csvfile,
        first_row: action.payload.first_row
      };
    case CAMPAIGN_COMPOSE:
      return {
        ...state,
        normal: action.payload.normal,
        follow_up: action.payload.follow_up,
        drips: action.payload.drips
      };
    case CAMPAIGN_OPTIONS:
      return {
        ...state,
        track_Opens: action.payload.track_Opens,
        terms_and_laws: action.payload.terms_and_laws
      };
    case CAMPAIGN_SEND:
      return {
        ...state
      };
    default:
      return state;
  }
};
