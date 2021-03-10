import { history } from "../.."
import {
    FAILURE_REGISTER,
    SUCCESS_REGISTER,
    FAILURE_LOGIN,
    SUCCESS_LOGIN,  
    SUCCESS_LOGOUT,
    FAILURE_LOGOUT,
} from "../actionType/actionType"

import Api from "../api/api"

// Register
export const registerSuccess = (user) => {
    return {
        type: SUCCESS_REGISTER,
        user
    }
}
export const registerFailure = (payload) => {
    return {
        type: FAILURE_REGISTER,
        payload
    }
}

// Login
export const loginSuccess = (user) => {
    return {
        type: SUCCESS_LOGIN,
        user
    }
}
export const loginFailure = (payload) => {
    return {
        type: FAILURE_LOGIN,
        payload
    }
}

// Logout
export const logoutSuccess = () => {
    return {
        type: SUCCESS_LOGOUT,
    }
}
export const logoutFailure = () => {
    return {
        type: FAILURE_LOGOUT,
    }
}

// logout action
export const LogoutAction = () => {
    return function (dispatch) {
        Api.LogoutApi().then(result => {
            localStorage.removeItem('access_token')
            dispatch(logoutSuccess())
            history.push('/app/auth/login')
        }).catch(err => {
            dispatch(logoutFailure())
        })
    }
}