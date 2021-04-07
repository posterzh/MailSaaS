import {
  GET_OVERVIEW_SUMMARY,
  GET_DETAILS_SEQUENCE,
  GET_DETAILS_SETTINGS,
  GET_DETAILS_RECIPIENTS,
  IMPORT_CONTACTS_FROM_CSV,
} from "../actionType/actionType";

const initialState = {
  overviewSummary: {},
  detailsSequence: {},
  detailRecipients: [],
  id: '',
  title: ''
};

export const campaignDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OVERVIEW_SUMMARY:
      return {
        ...state,
        overviewSummary: action.payload,
        detailsSequence: {},
        detailRecipients: [],
        id: action.payload.id,
        title: action.payload.title
      };
    case GET_DETAILS_SEQUENCE:
      return {
        ...state,
        detailsSequence: action.payload,
      }
    case GET_DETAILS_RECIPIENTS:
      return {
        ...state,
        detailRecipients: action.payload
      }
    case GET_DETAILS_SETTINGS:
      return {
        ...state,
        detailsSettings: action.payload,
      }
    case IMPORT_CONTACTS_FROM_CSV:
      return {
        ...state,
        detailRecipients: [
          ...state.detailRecipients,
          ...action.payload
        ]
      }
    default:
      return state;
  }
};




  