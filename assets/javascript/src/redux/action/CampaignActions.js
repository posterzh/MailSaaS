import { CAMPAIGN_START, CAMPAIGN_RECIPIENT, CAMPAIGN_COMPOSE, CAMPAIGN_OPTIONS, CAMPAIGN_SEND } from "../actionType/actionType";

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

export const campaignOptions = (payload) => ({
  type: CAMPAIGN_OPTIONS,
  payload,
});

export const campaignSend = (payload) => ({
  type: CAMPAIGN_SEND,
  payload,
});
