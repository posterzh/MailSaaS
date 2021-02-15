import {
    SUCCESS_REGISTER,
    FAILURE_LOGIN,
    REQUEST_FOR_LOGIN,
    SUCCESS_LOGIN,
    FAILURE_START,
    REQUEST_FOR_START,
    SUCCESS_START,
    SUCCESS_RECIPIENT,
    SUCCESS_MAIL_SENDER,
    SUCCESS_MAIL_GET_DATA,
    SUCCESS_FETCH_UNSUBSCRIPTION,
    SUCCESS_OPTION,
    SUCCESS_FETCH_PROSPECTS,
    SUCCESS_MAIL_ACCOUNT_DELETE,
    SUCCESS_MAIL_ACCOUNT_UPDATE,
    FAILURE_MAIL_ACCOUNT_UPDATE
} from "../actionType/actionType";

const initialState = {
    Loginuser: '',
    user: '',
    data: '',
    recipientData: '',
    mailGetData: [],
    mailData: '',
    viewData: '',
    mailData: '',
    unsubscribeData: [],
    optionData:'',
    prospectData:[],
    mailAccountId:''
}
export const RegisterReducer = (state = { initialState }, action) => {
    switch (action.type) {
        // cases for signup
        case SUCCESS_REGISTER:
            return {
                ...state,
                user: action.user,
            }
        default: return state
            break;
    }
}
export const LoginReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case REQUEST_FOR_LOGIN:
            return {
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                Loginuser: action.Loginuser,
            }
        case FAILURE_LOGIN:
            return {
            }
        default: return state
            break;
    }
}
export const StartCampaignReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case REQUEST_FOR_START:
            return {
            }
        case SUCCESS_START:
            return {
                ...state,
                data: action.data,
            }
        case FAILURE_START:
            return {
            }
        default: return state
            break;
    }
}
export const RecipientReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case SUCCESS_RECIPIENT:
            return {
                ...state,
                formData: action.formData,
            }
        default: return state
            break;
    }
}
export const MailSenderReducer = (state = { initialState }, action) => {
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
export const MailGetDataReducer = (state = { initialState }, action) => {
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
export const UnsubscribeReducer = (state = { initialState }, action) => {
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
export const CampaignOptionReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case SUCCESS_OPTION:
            return {
                ...state,
                optionData: action.data,
            }
        default: return state
            break;
    }
}

export const ProspectsGetReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case SUCCESS_FETCH_PROSPECTS:
            return {
                ...state,
                prospectData: action.prospectData,
            }
        default: return state
            break;
    }
}
