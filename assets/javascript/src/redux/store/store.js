import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import { 
  RegisterReducer, 
  LoginReducer, 
  StartCampaignReducer, 
  RecipientReducer, 
  MailGetDataReducer, 
  MailSenderReducer, 
  UnsubscribeReducer ,
  CampaignOptionReducer,
  ProspectsGetReducer,
  CampaignCreateReducer,
  CampaignPreviewGetReducer,
  CampaignOverviewReducer,
  CampaignPreviewUpdateReducer,
  CamapignSaveReducer,
  OnclickProspectsReducer,
  CampaignTableReducer,
  ScheduleGetDataReducer,
  // ScheduleUpdateReducer,
  LeadCatcherReducer,
  LeadUpdateReducer,
  CampaignPeopleReducer,
  LeadGetReducer,
  LeadViewReducer
} from '../reducer/reducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({ 
  RegisterReducer, 
  LoginReducer, 
  StartCampaignReducer, 
  RecipientReducer, 
  MailGetDataReducer, 
  MailSenderReducer, 
  UnsubscribeReducer ,
  CampaignOptionReducer,
  ProspectsGetReducer,
  CampaignCreateReducer,
  CampaignPreviewGetReducer,
  CampaignOverviewReducer,
  CampaignPreviewUpdateReducer,
  CamapignSaveReducer,
  OnclickProspectsReducer,
  CampaignTableReducer,
  ScheduleGetDataReducer,
  // ScheduleUpdateReducer,
  LeadCatcherReducer,
  CampaignPeopleReducer,
  LeadGetReducer,
  LeadUpdateReducer,
  LeadViewReducer
})

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer, composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };