import {
    FAILURE_START,
    REQUEST_FOR_START,
    SUCCESS_START,
    SUCCESS_RECIPIENT,
    REQUEST_FOR_OPTION,
    SUCCESS_OPTION,
    FAILURE_OPTION,
    FAILURE_CAMPAIGN_TABLE_DATA,
    REQUEST_FOR_CAMPAIGN_TABLE_DATA,
    SUCCESS_CAMPAIGN_TABLE_DATA,
   
} from "../actionType/actionType"

import Api from "../api/api"

// START_CAMPAIGN
export const requestForStartCampaign = () => {
    return {
        type: REQUEST_FOR_START,
    }
}
export const StartCampaignSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_START,
        data
    }
}
export const StartCampaignFailure = () => {
    return {
        type: FAILURE_START,
    }
}

// Campaign option
export const requestForOption = () => {
    return {
        type: REQUEST_FOR_OPTION,
    }
}
export const OptionSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_OPTION,
        data
    }
}
export const OptionFailure = () => {
    return {
        type: FAILURE_OPTION,
    }
}

// Campaign RECIPIENTS
export const RecipientSuccess = (formData) => {
    console.log(formData, 'data')
    return {
        type: SUCCESS_RECIPIENT,
        formData
    }
}

// CampaignTableData 
export const requestForCampaignTableData = () => {
    return {
        type: REQUEST_FOR_CAMPAIGN_TABLE_DATA,
    }
}
export const CampaignTableDataSuccess = (CampaignTableData) => {
    console.log(CampaignTableData, 'data')
    return {
        type: SUCCESS_CAMPAIGN_TABLE_DATA,
        CampaignTableData
    }
}
export const CampaignTableDataFailure = () => {
    return {
        type: FAILURE_CAMPAIGN_TABLE_DATA,
    }
}

export const StartCampaignAction = (data) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        console.log('this is a token', token)
        dispatch(requestForStartCampaign(data, token))
        Api.StartCampaignApi(data, token).then(result => {
            dispatch(StartCampaignSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const CampaignOptionAction = (optionData) => {
    console.log('abcd:', optionData);
    return function (dispatch) {
        const token = localStorage.getItem('token')
        dispatch(requestForOption(optionData, token))
        Api.OptionApi(optionData, token).then(result => {
            dispatch(OptionSuccess(result.data))
            console.log("checking", token)
            alert("keshav")
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
export const CampaignTableAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        console.log('this is a token', token)
        dispatch(requestForCampaignTableData(token))
        Api.CampaignTableDataApi(token).then(result => {
            dispatch(CampaignTableDataSuccess(result.data))
            console.log('result', result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}


//view_ALL_CAMPAIGN
