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
    FAILURE_RECIPIENT,
    REQUEST_FOR_RECIPIENT,
    SUCCESS_RECIPIENT,
    REQUEST_FOR_OPTION,
    SUCCESS_OPTION,
    FAILURE_OPTION
} from "../actionType/actionType";

const initialState = {
    Loginuser: '',
    user: '',
    data: '',
    recipientsData: ''
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
                user: action.data,
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
                Loginuser: action.data,
                
            }
        case FAILURE_LOGIN:
            return {
            }
        default: return state
            break;
    }
}
export const StartReducer = (state = { initialState }, action) => {
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
            
            case REQUEST_FOR_OPTION:
            return {
            }
        case SUCCESS_OPTION:
            return {
                ...state,
                data: action.optionData,
            }
        case FAILURE_OPTION:
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
                recipientsData: action.data,
            }
        case FAILURE_RECIPIENT:
            return {
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

