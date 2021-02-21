import {
    SUCCESS_REGISTER,
    FAILURE_REGISTER,
    FAILURE_LOGIN,
    REQUEST_FOR_LOGIN,
    SUCCESS_LOGIN,
    SUCCESS_START_CAMPAIGN,
    SUCCESS_RECIPIENT,
    SUCCESS_MAIL_SENDER,
    SUCCESS_MAIL_GET_DATA,
    SUCCESS_FETCH_UNSUBSCRIPTION,
    SUCCESS_OPTION,
    // SUCCESS_FETCH_PROSPECTS,
    // SUCCESS_SEND_CAMPAIGN,
    REQUEST_FOR_OPTION,
    FAILURE_OPTION,
    FETCH_PROSPECTS,
    SUCCESS_FETCH_PROSPECTS,
    REQUEST_FOR_CAMPAIGN_CREATE_PREVIEW,
    SUCCESS_FETCH_CAMPAIGN_CREATE_PREVIEW,
    FAILURE_FETCH_CAMPAIGN_CREATE_PREVIEW,
    SUCCESS_CAMPAIGN_OVERVIEW,
    SUCCESS_MAIL_ACCOUNT_DELETE,
    SUCCESS_MAIL_ACCOUNT_UPDATE,
    FAILURE_MAIL_ACCOUNT_UPDATE,
    SUCCESS_CREATE_CAMPAIGN,
    REQUEST_FOR_CAMPAIGN_UPDATE_PREVIEW,
    SUCCESS_FETCH_CAMPAIGN_UPDATE_PREVIEW,
    FAILURE_FETCH_CAMPAIGN_UPDATE_PREVIEW,
    SUCCESS_SAVE_CAMPAIGN,
    SUCCESS_FETCH_ONCLICK_PROSPECTS,
    SUCCESS_CAMPAIGN_TABLE_DATA,
    REQUEST_FOR_GET_SCHEDULE,
    SUCCESS_GET_SCHEDULE,
    FAILURE_GET_SCHEDULE,
    UPDATE_REQUEST_FOR_GET_SCHEDULE,
    UPDATE_SUCCESS_GET_SCHEDULE,  
    SUCCESS_LEAD_CATCHER,
    SUCCESS_FOR_CAMPAIGN_PEOPLE
} from "../actionType/actionType";

const initialState = {
    Loginuser: '',
    user: '',
    startCampaignData: [],
    recipientData: '',
    mailGetData: null,
    mailData: '',
    sendData:'',
    saveData:'',
    viewData: '',
    unsubscribeData: [],
    optionData: '',
    prospectData: [],
    prospectOnclickData:[],
    mailAccountId: '',
    CampaignOverviewData:[],
    isLogin:false,
    CampaignPreviewData: [],
    campaignPreviewUpdateData:[],
    CampaignTableData:[],
    registerResponse:null,
    loginResponse:null,
    isRegisterSuccess:null,
    ScheduleGetData:[],
    UpdateScheduleData:[],
    leadData:'',
    campaignPeopleData:''
}
export const RegisterReducer = (state =  initialState , action) => {
    // console.log(action.payload && action.payload[0], 'payloaddata')
    switch (action.type) {
        case SUCCESS_REGISTER:
            return {
                ...state,
                user: action.user,
                isRegisterSuccess:true,
                registerResponse:'Register Successfully!'
            }
        case FAILURE_REGISTER:
            return{
                ...state,
                registerResponse:action.payload,
                isRegisterSuccess:true
            }
        default: return state
            break;
    }
}
export const LoginReducer = (state =  initialState , action) => {
    switch (action.type) {
        case REQUEST_FOR_LOGIN:
            return {
                ...state,
                isLogin: false
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                Loginuser: action.Loginuser,
                isLogin: true, 
            }
        case FAILURE_LOGIN:
            return {
                ...state,
                isLogin:false,
                loginResponse:action.payload

            }
        default: return state
            break;
    }
}
export const StartCampaignReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_START_CAMPAIGN:
            return {
                ...state,
                startCampaignData: action.data,
            }
        default: return state
            break;
    }
}
export const RecipientReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_RECIPIENT:
            return {
                ...state,
                recipientData: action.recipientData,
            }
        default: return state
            break;
    }
}
export const CampaignCreateReducer=(state =  initialState , action)=>{
    switch (action.type) {
    case SUCCESS_CREATE_CAMPAIGN:
        return {
            ...state,
            sendData: action.sendData,
        }
    default: return state
        break;
    }
}
export const CamapignSaveReducer=(state =  initialState , action)=>{
    // console.log("actionNew++=====>",action.payload)
    switch (action.type) {
    case SUCCESS_SAVE_CAMPAIGN:
        return {
            ...state,
            saveData: action.saveData,
        }
    default: return state
        break;
    }
}
export const MailSenderReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_MAIL_SENDER:
            return {
                ...state,
                mailData: action.mailData,
            }
        case SUCCESS_MAIL_ACCOUNT_UPDATE:
            return{
                ...state
            } 
        case FAILURE_MAIL_ACCOUNT_UPDATE:
            return{
                ...state
            }  
        default: return state
            break;
    }
}
export const MailGetDataReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_MAIL_GET_DATA:
            return {
                ...state,
                mailGetData: action.payload,
            }
            case SUCCESS_MAIL_ACCOUNT_DELETE:
                return {
                    ...state
                }
        default: return state
            break;
    }
}
export const UnsubscribeReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_FETCH_UNSUBSCRIPTION:
            return {
                ...state,
                unsubscribeData: action.payload
            }
        default: return state
            break;
    }
}

// CAMPAIGN OPTION REDUCER
export const CampaignOptionReducer = (state =  initialState , action) => {
    switch (action.type) {
        case REQUEST_FOR_OPTION:
            return {
            }
        case SUCCESS_OPTION:
            return {
                ...state,
                optionData: action.data,
            }
        default: return state
            break;
    }
}

// PROSPECT_TABLE_DATA
export const ProspectsGetReducer = (state =  initialState , action) => {
    switch (action.type) {
        case  FETCH_PROSPECTS:{
            
        }
        case SUCCESS_FETCH_PROSPECTS:
            return {
                ...state,
                prospectData: action.prospectData,
            }
        default: return state
            break;
    }
}

// ONCLICK PROSPECT TABLE DATA
export const OnclickProspectsReducer = (state =  initialState , action) => {
    // console.log("action======>",action)
    switch (action.type) {
        case SUCCESS_FETCH_ONCLICK_PROSPECTS:
            return {
                ...state,
                prospectOnclickData: action.prospectOnclickData,
            }
        default: return state
            break;
    }
}


// CAMPAIGN_PREVIEW_DATA
export const CampaignPreviewGetReducer = (state =  initialState , action) => {
    switch (action.type) {
        case REQUEST_FOR_CAMPAIGN_CREATE_PREVIEW:
            return {
            }
        case SUCCESS_FETCH_CAMPAIGN_CREATE_PREVIEW:
            return {
                ...state,
                CampaignPreviewData: action.CampaignPreviewData,
            }
        case FAILURE_FETCH_CAMPAIGN_CREATE_PREVIEW:
            return {
                
            }
        default: return state
            break;
    }
}


// CAMPAIGN_PREVIEW_UPDATE_DATA 
export const CampaignPreviewUpdateReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_FETCH_CAMPAIGN_UPDATE_PREVIEW:
            return {
                ...state,
                campaignPreviewUpdateData: action.campaignPreviewUpdateData,
            }
        case FAILURE_FETCH_CAMPAIGN_UPDATE_PREVIEW:
            return {
                
            }
        default: return state
            break;
    }
}


// CAMPAIGN_OVERVIEW_DATA
export const CampaignOverviewReducer = (state =  initialState , action) => {
    // console.log("paylodad",action.CampaignTableData )
    switch (action.type) {
        case SUCCESS_CAMPAIGN_OVERVIEW:
            return {
                ...state,
                CampaignOverviewData: action.CampaignOverviewData,
            }
        default: return state
            break;
    }
}


//  CAMPAIGN PEOPLE
export const CampaignPeopleReducer = (state =  initialState , action) => {
    console.log("paylodad",action )
    switch (action.type) {
        case SUCCESS_FOR_CAMPAIGN_PEOPLE:
            return {
                ...state,
                campaignPeopleData: action.campaignPeopleData,
            }
        default: return state
            break;
    }
}


// SCHEDULE_GET_DATAampaignOverview
export const ScheduleGetDataReducer = (state =  initialState , action) => {
    switch (action.type) {
        case  REQUEST_FOR_GET_SCHEDULE:
            return {
            }
        case SUCCESS_GET_SCHEDULE:
            return {
                ...state,
                ScheduleGetData: action.ScheduleGetData,
            }
        case  FAILURE_GET_SCHEDULE:
            return {
                
            }
        default: return state
            break;
    }
}

// CAMPAIGN TABLE DATA

export const CampaignTableReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_CAMPAIGN_TABLE_DATA:
            return {
                ...state,
                CampaignTableData: action.CampaignTableData,
            }
        default: return state
            break;
    }
}

// UPDATE SCHEDULE DATA
export const ScheduleUpdateReducer = (state =  initialState , action) => {
    switch (action.type) {
        case UPDATE_REQUEST_FOR_GET_SCHEDULE:
            return {
            }
        case UPDATE_SUCCESS_GET_SCHEDULE:
            return {
                ...state,
                UpdateScheduleData: action.UpdateScheduleData,
            }
        default: return state
            break;
    }
}

// lead Catcher
export const LeadCatcherReducer = (state =  initialState , action) => {
    switch (action.type) {
        case SUCCESS_LEAD_CATCHER:
            return {
                ...state,
                leadData: action.leadData,
            }
        default: return state
            break;
    }
}
