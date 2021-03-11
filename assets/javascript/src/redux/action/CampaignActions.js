import { CAMPAIGN_START, CAMPAIGN_RECIPIENT, CAMPAIGN_COMPOSE } from "../actionType/actionType";

export const campaignStart = (payload) => ({
  type: CAMPAIGN_START,
  payload,
});

export const campaignRecipient = (payload) => ({
  type: CAMPAIGN_RECIPIENT,
  payload,
});

export const campaignCompose = (payload) => ({
  type: CAMPAIGN_COMPOSE,
  payload,
});
