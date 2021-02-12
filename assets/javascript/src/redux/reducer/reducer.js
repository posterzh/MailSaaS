import {
    FAILURE_REGISTER,
    REQUEST_FOR_REGISTER,
    SUCCESS_REGISTER,
    FAILURE_LOGIN,
    REQUEST_FOR_LOGIN,
    SUCCESS_LOGIN,
    FAILURE_START,
    REQUEST_FOR_START,
    SUCCESS_START,
    REQUEST_FOR_RECIPIENT,
    SUCCESS_RECIPIENT,
    FAILURE_MAIL_SENDER,
    REQUEST_FOR_MAIL_SENDER,
    SUCCESS_MAIL_SENDER,
    FAILURE_MAIL_GET_DATA,
    REQUEST_FOR_MAIL_GET_DATA,
    SUCCESS_MAIL_GET_DATA,
    SUCCESS_FETCH_UNSUBSCRIPTION,
    REQUEST_FOR_OPTION,
    SUCCESS_OPTION,
    FAILURE_OPTION,
    FETCH_PROSPECTS,
    SUCCESS_FETCH_PROSPECTS
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
        case REQUEST_FOR_REGISTER:
            return {
            }
        case SUCCESS_REGISTER:
            return {
                ...state,
                user: action.user,
            }
        case FAILURE_REGISTER:
            return {
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
        case REQUEST_FOR_RECIPIENT:
            return {
            }
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
        case REQUEST_FOR_MAIL_SENDER:
            return {
            }
        case SUCCESS_MAIL_SENDER:
            return {
                ...state,
                mailData: action.mailData,
            }
        case FAILURE_MAIL_SENDER:
            return {
            }
        default: return state
            break;
    }
}
export const MailGetDataReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case REQUEST_FOR_MAIL_GET_DATA:
            return {
            }
        case SUCCESS_MAIL_GET_DATA:
            return {
                ...state,
                mailGetData: action.payload,
            }
        case FAILURE_MAIL_GET_DATA:
            return {
            }
        default: return state
            break;
    }
}
export const UnsubscribeReducer = (state = { initialState }, action) => {
    // console.log(action.payload, "action.payload", state.unsubscribeData)
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
        case  REQUEST_FOR_OPTION:
            return {
            }
        case SUCCESS_OPTION:
            return {
                ...state,
                optionData: action.data,
            }
        case FAILURE_OPTION:
            return {
            }
        default: return state
            break;
    }
}

export const ProspectsGetReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case FETCH_PROSPECTS:
            return {
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
