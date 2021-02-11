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
    console.log(mailData, 'data')
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
export const MailGetDataSuccess = (mailGetData) => {
    console.log(mailGetData, 'data')
    return {
        type: SUCCESS_MAIL_GET_DATA,
        payload: { mailGetData }
    }
}
export const MailGetDataFailure = () => {
    return {
        type: FAILURE_MAIL_GET_DATA,
    }
}

export const MailSenderAction = (mailData) => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log(token,'data')
        dispatch(requestForMailSender(mailData, token))
        Api.MailSenderApi(mailData, token).then(result => {
            dispatch(MailSenderSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const MailGetDataAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        dispatch(requestForMailSender(token))
        console.log('tokenfsdfs', token)
        Api.MailGetDataApi(token).then(result => {
            dispatch(MailGetDataSuccess(result.data))
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }
}