import {
    SUCCESS_REGISTER,
    FAILURE_REGISTER,
    SUCCESS_LOGIN,
    FAILURE_LOGIN,
    SUCCESS_LOGOUT,
    FAILURE_LOGOUT,
} from "../actionType/actionType";

const initialState = {
    user: '',
    isLogin: false,
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_REGISTER:
            return {
                ...state,
                user: action.user,
                isLogin: true,
            }
        case FAILURE_REGISTER:
            return {
                ...state,
                isLogin: false,
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                user: action.user,
                isLogin: true,
            }
        case FAILURE_LOGIN:
            return {
                ...state,
                isLogin: false,

            }
        case SUCCESS_LOGOUT:
            return {
                ...initialState
            }
        default: return state
    }
}