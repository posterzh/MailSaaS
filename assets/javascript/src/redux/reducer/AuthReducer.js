import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GOOGLE_LOGIN_USER,
} from "../actionType/actionType";

const initialState = {
    user: '',
    isLogin: false,
    socialType: 'none',
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                socialType: 'none'
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                socialType: 'none'
            }
        case GOOGLE_LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                socialType: 'google'
            }
        case LOGOUT_USER:
            return initialState;
        default: return state
    }
}