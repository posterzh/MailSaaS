import {
    FAILURE_MAIL_SENDER,
    REQUEST_FOR_MAIL_SENDER,
    SUCCESS_MAIL_SENDER,
    FAILURE_MAIL_GET_DATA,
    REQUEST_FOR_MAIL_GET_DATA,
    SUCCESS_MAIL_GET_DATA
} from "../actionType/actionType"
import Api from "../api/api"
export const MailSenderSuccess = (mailData) => {
    return {
        type: SUCCESS_MAIL_SENDER,
        mailData
    }
}
// DATA
export const MailGetDataSuccess = (payload) => {
    return {
        type: SUCCESS_MAIL_GET_DATA,
        payload
    }
}
export const MailSenderAction = (mailData) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
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
        Api.MailGetDataApi(token).then(result => {
            dispatch(MailGetDataSuccess(result.data.message))
        }).catch(err => {
            console.log(err)
        })
    }
}