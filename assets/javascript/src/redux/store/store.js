import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import {
  StartCampaignReducer,
  RecipientReducer,
  MailGetDataReducer,
  MailSenderReducer,
  UnsubscribeReducer,
  CampaignOptionReducer,

  // Karl - Will remove later
  // ******************************************
  ProspectsGetReducer,
  OnclickProspectsReducer,
  // ******************************************

  CampaignCreateReducer,
  CampaignPreviewGetReducer,
  CampaignOverviewReducer,
  CampaignPreviewUpdateReducer,
  CamapignSaveReducer,
  CampaignTableReducer,
  ScheduleGetDataReducer,
  // ScheduleUpdateReducer,
  LeadCatcherReducer,
  LeadUpdateReducer,
  CampaignPeopleReducer,
  LeadGetReducer,
  LeadViewReducer,
} from "../reducer/reducer";

import { AuthReducer } from "../reducer/AuthReducer";
import { mailAccountsReducer } from "../reducer/MailAccountsReducer";
import { notificationReducer } from "../reducer/CommonReducer";
import { prospectsReducer } from "../reducer/ProspectsReducer";
import { unsubscribesReducer } from "../reducer/UnsubscribeReducer";
import { sendingCalendarsReducer } from "../reducer/SendingCalendarReducer";
import { campaignReducer } from "../reducer/CampaignReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({
  StartCampaignReducer,
  RecipientReducer,
  MailGetDataReducer,
  MailSenderReducer,
  UnsubscribeReducer,
  CampaignOptionReducer,

  // Karl - Will remove later
  // ******************************************
  ProspectsGetReducer,
  OnclickProspectsReducer,
  // ******************************************

  CampaignCreateReducer,
  CampaignPreviewGetReducer,
  CampaignOverviewReducer,
  CampaignPreviewUpdateReducer,
  CamapignSaveReducer,
  CampaignTableReducer,
  ScheduleGetDataReducer,
  // ScheduleUpdateReducer,
  LeadCatcherReducer,
  CampaignPeopleReducer,
  LeadGetReducer,
  LeadUpdateReducer,
  LeadViewReducer,

  mailAccounts: mailAccountsReducer,
  notification: notificationReducer,

  auth: AuthReducer,
  prospects: prospectsReducer,
  unsubscribes: unsubscribesReducer,
  sendingCalendars: sendingCalendarsReducer,
  campaign: campaignReducer,
});

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };
