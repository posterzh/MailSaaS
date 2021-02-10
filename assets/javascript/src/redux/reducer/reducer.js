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
    FAILURE_VIEW,
    REQUEST_FOR_VIEW,
    SUCCESS_VIEW,
    FAILURE_MAIL_SENDER,
    REQUEST_FOR_MAIL_SENDER,
    SUCCESS_MAIL_SENDER
} from "../actionType/actionType";

const initialState = {
    Loginuser: '',
    user: '',
    data: '',
    recipientData: '',
    viewData:'',
    mailData:''
}
export const RegisterReducer = (state = { initialState }, action) => {
    switch (action.type) {
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
        case FAILURE_RECIPIENT:
            return {
            }
        default: return state
            break;
    }
}

export const ViewReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case REQUEST_FOR_VIEW:
            return {
            }
        case SUCCESS_VIEW:
            return {
                ...state,
                ViewData: action. viewData,
            }
        case FAILURE_VIEW:
            return {
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

