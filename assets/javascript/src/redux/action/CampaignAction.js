import {
    SUCCESS_START_CAMPAIGN,
    SUCCESS_RECIPIENT,
    SUCCESS_OPTION,
    SUCCESS_CAMPAIGN_TABLE_DATA,
    SUCCESS_SEND_CAMPAIGN
} from "../actionType/actionType"

import Api from "../api/api"

// START_CAMPAIGN
export const StartCampaignSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_START_CAMPAIGN,
        data
    }
}
// Campaign option
export const OptionSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_OPTION,
        data
    }
}
// Campaign RECIPIENTS
export const RecipientSuccess = (formData) => {
    return {
        type: SUCCESS_RECIPIENT,
        formData
    }
}
// Campaign_send
export const CampaignSendSuccess=(sendData)=>{
    return {
        type:SUCCESS_SEND_CAMPAIGN,
        sendData
    }
}
// CampaignTableData 
export const CampaignTableDataSuccess = (CampaignTableData) => {
    console.log(CampaignTableData, 'data')
    return {
        type: SUCCESS_CAMPAIGN_TABLE_DATA,
        CampaignTableData
    }
}
export const StartCampaignAction = (data) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        Api.StartCampaignApi(data, token).then(result => {
            console.log('reult',result)
            dispatch(StartCampaignSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const RecipientAction = (recipientData,token) => {
    return function (dispatch) {
        Api.RecipientApi(recipientData, token).then(result => {
            dispatch(RecipientSuccess(result.data))
            console.log(result)
        }).catch(err => { console.log(err) })
    }
}
export const CampaignOptionAction = (optionData) => {
    console.log('abcd:', optionData);
    return function (dispatch) {
        const token = localStorage.getItem('token')
        Api.OptionApi(optionData, token).then(result => {
            dispatch(OptionSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const CampaignTableAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log('this is a token', token)
        Api.CampaignTableDataApi(token).then(result => {
            dispatch(CampaignTableDataSuccess(result.data))
            console.log('result', result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}
export const CampaignSendAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log('this is a token', token)
        Api.CampaignSendGetApi(token).then(result => {
            dispatch(CampaignSendSuccess(result.data))
            console.log('result', result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}


//view_ALL_CAMPAIGN
