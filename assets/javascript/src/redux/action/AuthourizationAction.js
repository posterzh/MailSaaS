import {

    FAILURE_REGISTER,
    REQUEST_FOR_REGISTER,
    SUCCESS_REGISTER,
    FAILURE_LOGIN,
    REQUEST_FOR_LOGIN,
    SUCCESS_LOGIN,
    
    
} from "../actionType/actionType"

import Api from "../api/api"
// Register
export const requestForRegister = () => {
    return {
        type: REQUEST_FOR_REGISTER,
    }
}

export const registerSuccess = (user) => {
    console.log(user, 'data')
    return {
        type: SUCCESS_REGISTER,
        user
    }
}
export const registerFailure = () => {
    return {
        type: FAILURE_REGISTER,
    }
}

// login
export const requestForLogin = () => {
    return {
        type: REQUEST_FOR_LOGIN,
    }
}
export const LoginSuccess = (Loginuser) => {
    console.log(Loginuser, 'data')
    return {
        type: SUCCESS_LOGIN,
        Loginuser
    }
}
export const loginFailure = () => {
    return {
        type: FAILURE_LOGIN,
    }
}

export const RegisterAction = (user) => {
    return function (dispatch) {
        dispatch(requestForRegister(user))
        Api.RegisterApi(user).then(result => {
            console.log(result.data, 'registerSuccess')
            dispatch(registerSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const LoginAction = (Loginuser) => {
    return function (dispatch) {
        dispatch(requestForLogin(Loginuser))
        Api.LoginApi(Loginuser).then(result => {
            const token = result.data.token;
            localStorage.setItem('access_token', token)
            console.log('access_token',token)
            console.log(pk)
            dispatch(LoginSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
