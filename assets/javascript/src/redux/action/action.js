import { FAILURE_REGISTER, REQUEST_FOR_REGISTER, SUCCESS_REGISTER, FAILURE_LOGIN, REQUEST_FOR_LOGIN, SUCCESS_LOGIN } from "../actionType/actionType"
import Api from "../api/api"


export const requestForRegister = () => {
    return {
        type: REQUEST_FOR_REGISTER,
    }
}
export const registerSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_REGISTER,
        data
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
export const LoginSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_LOGIN,
        data
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
            dispatch(LoginSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}