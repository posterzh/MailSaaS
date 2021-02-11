import {
    FAILURE_MAIL_SENDER,
    REQUEST_FOR_MAIL_SENDER,
    SUCCESS_MAIL_SENDER,
    FAILURE_MAIL_GET_DATA,
    REQUEST_FOR_MAIL_GET_DATA,
    SUCCESS_MAIL_GET_DATA
} from "../actionType/actionType"
import Api from "../api/api"
export const requestForMailSender = () => {
    return {
        type: REQUEST_FOR_MAIL_SENDER,
    }
}
export const MailSenderSuccess = (mailData) => {
    return {
        type: SUCCESS_MAIL_SENDER,
        mailData
    }
}
export const MailSenderFailure = () => {
    return {
        type: FAILURE_MAIL_SENDER,
    }
}
// DATA
export const requestForMailGetData = () => {
    return {
        type: REQUEST_FOR_MAIL_GET_DATA,
    }
}
export const MailGetDataSuccess = (payload) => {
    console.log(payload, 'data')
    return {
        type: SUCCESS_MAIL_GET_DATA,
        payload
    }
}
export const MailGetDataFailure = () => {
    return {
        type: FAILURE_MAIL_GET_DATA,
    }
}

export const MailSenderAction = (mailData) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        dispatch(requestForMailSender(mailData, token))
        Api.MailSenderApi(mailData, token).then(result => {
            dispatch(MailSenderSuccess('result', result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const MailGetDataAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        dispatch(requestForMailGetData(token))
        Api.MailGetDataApi(token).then(result => {
            dispatch(MailGetDataSuccess(result.data.message))
            console.log("result.data.message",result.data.message[0].id)
        }).catch(err => {
            console.log(err)
        })
    }
}