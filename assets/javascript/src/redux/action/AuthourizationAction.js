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
    SUCCESS_VIEW
} from "../actionType/actionType"
import Api from "../api/api"


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

// START
export const requestForStart = () => {
    return {
        type: REQUEST_FOR_START,
    }
}
export const StartSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_START,
        data
    }
}
export const StartFailure = () => {
    return {
        type: FAILURE_START,
    }
}

// RECIPIENTS
export const requestForRecipient = () => {
    return {
        type: REQUEST_FOR_RECIPIENT,
    }
}
export const RecipientSuccess = (recipientData,token) => {
    console.log(recipientData, 'data')
    return {
        type: SUCCESS_RECIPIENT,
        recipientData,
        token
    }
}
export const RecipientFailure = () => {
    return {
        type: FAILURE_RECIPIENT,
    }
}

// VIEW
export const requestForView = () => {
    return {
        type: REQUEST_FOR_VIEW,
    }
}
export const ViewSuccess = (viewData) => {
    console.log(viewData, 'data')
    return {
        type: SUCCESS_VIEW,
        viewData
    }
}
export const ViewFailure = () => {
    return {
        type: FAILURE_VIEW,
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
            localStorage.setItem('token', token)
            console.log(token)
            dispatch(LoginSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const StartCampaignAction = (data) => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log('this is a token', token)
        dispatch(requestForStart(data, token))
        Api.StartApi(data, token).then(result => {
            dispatch(StartSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const RecipientAction = (recipientData) => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log('this is a token', token)
        dispatch(requestForRecipient(recipientData, token))
        Api.RecipientApi(recipientData, token).then(result => {
            dispatch(RecipientSuccess(result.data))
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }
}

export const ViewAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log('this is a token', token)
        dispatch(requestForView(token))
        Api.ViewApi(token).then(result => {
            dispatch(ViewSuccess(result.data))
            console.log('result',result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}

