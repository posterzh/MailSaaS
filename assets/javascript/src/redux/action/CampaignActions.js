import { CAMPAIGN_START, CAMPAIGN_RECIPIENT, CAMPAIGN_COMPOSE, CAMPAIGN_OPTIONS } from "../actionType/actionType";
import { history } from "../..";
import axios from "../../utils/axios";

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

export const campaignSend = (payload) => (dispatch) => {
  const formData = new FormData();
  formData.append('csvfile_op1', payload.csvfile);
  formData.append('campaign', payload);
  axios
    .post("/campaign/createcamp/", formData)
    .then((response) => {
      history.push("/app/admin/CampaignList");
    })
    .catch((error) => {
      toastOnError(error);
    });
};

