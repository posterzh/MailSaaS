import { CAMPAIGN_START, CAMPAIGN_COMPOSE } from "../actionType/actionType";

export const campaignStart = (payload) => ({
  type: CAMPAIGN_START,
  payload,
});

export const campaignCompose = (payload) => ({
  type: CAMPAIGN_COMPOSE,
  payload,
});
