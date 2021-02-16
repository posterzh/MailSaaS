import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
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
  CamapignSendReducer,
  CampaignPreviewGetReducer,
  CampaignOverviewReducer,
  CampaignPreviewUpdateReducer
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
  CamapignSendReducer,
  CampaignPreviewGetReducer,
  CampaignOverviewReducer,
  CampaignPreviewUpdateReducer
})

const store = createStore(
  rootReducer, composeEnhancers(applyMiddleware(thunk))
);

export default store;