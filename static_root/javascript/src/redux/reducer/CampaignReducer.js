import { CAMPAIGN_START, CAMPAIGN_RECIPIENT, CAMPAIGN_COMPOSE, CAMPAIGN_OPTIONS } from "../actionType/actionType";

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
        first_row: action.payload.first_row,
        csv_fields: action.payload.csv_fields
      };
    case CAMPAIGN_COMPOSE:
      return {
        ...state,
        email_subject: action.payload.email_subject,
        email_body: action.payload.email_body,
        follow_up: action.payload.follow_up,
        drips: action.payload.drips
      };
    case CAMPAIGN_OPTIONS:
      return {
        ...state,
        track_opens: action.payload.track_opens,
        track_linkclick: action.payload.track_linkclick,
        terms_and_laws: action.payload.terms_and_laws
      };
    default:
      return state;
  }
};
