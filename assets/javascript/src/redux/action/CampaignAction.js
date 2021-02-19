// imports
import {
    SUCCESS_START_CAMPAIGN,
    REQUEST_FOR_RECIPIENT,
    FAILURE_RECIPIENT,
    SUCCESS_RECIPIENT,
    SUCCESS_OPTION,
    SUCCESS_CAMPAIGN_TABLE_DATA,
    SUCCESS_SEND_CAMPAIGN,
    SUCCESS_FETCH_CAMPAIGN_CREATE_PREVIEW,
    FAILURE_FETCH_CAMPAIGN_CREATE_PREVIEW,
    REQUEST_FOR_CAMPAIGN_OVERVIEW,
    SUCCESS_CAMPAIGN_OVERVIEW,
    FAILURE_CAMPAIGN_OVERVIEW,
    REQUEST_FOR_CAMPAIGN_UPDATE_PREVIEW,
    SUCCESS_FETCH_CAMPAIGN_UPDATE_PREVIEW,
    FAILURE_FETCH_CAMPAIGN_UPDATE_PREVIEW,
    SUCCESS_SAVE_CAMPAIGN,
    REQUEST_FOR_COMPOSE_DATA

} from "../actionType/actionType"
import { browserHistory } from 'react-router'

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
export const RecipientSuccess = (recipientData) => {
    return {
        type: SUCCESS_RECIPIENT,
        recipientData
    }

}
// CAMPAIGN_CREATE_PREVIEW
export const requestForCampaignPreview = () => {
    return {
        type: REQUEST_FOR_CAMPAIGN_CREATE_PREVIEW
    }
}
export const CampaignPreviewSuccess = (CampaignPreviewData) => {
    return {
        type: SUCCESS_FETCH_CAMPAIGN_CREATE_PREVIEW,
        CampaignPreviewData: CampaignPreviewData
    }
}
export const CampaignPreviewFailure = () => {
    return {
        type: FAILURE_FETCH_CAMPAIGN_CREATE_PREVIEW,
    }
}
// CAMPAIGN UPDATE PREVIEW
export const requestForCampaignPreviewUpdate = () => {
    return {
        type: REQUEST_FOR_CAMPAIGN_UPDATE_PREVIEW
    }
}
export const CampaignPreviewUpdateSuccess = (CampaignPreviewData) => {
    return {
        type: SUCCESS_FETCH_CAMPAIGN_UPDATE_PREVIEW,
        campaignPreviewUpdateData: campaignPreviewUpdateData
    }
}
export const CampaignPreviewUpdateFailure = () => {
    return {
        type: FAILURE_FETCH_CAMPAIGN_UPDATE_PREVIEW,
    }
}

// Campaign_send
export const CampaignSendSuccess = (sendData) => {
    return {
        type: SUCCESS_SEND_CAMPAIGN,
        sendData,
    }
}
// CAMPAIGN_SAVE
export const CampaignSaveSuccess = (saveData) => {
    return {
        type: SUCCESS_SAVE_CAMPAIGN,
        saveData,
    }
}

// CAMPAIGN_TABLE_DATA
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

// CAMPAIGN_OVERVIEW
export const requestForCampaignOverviewData = () => {
    return {
        type: REQUEST_FOR_CAMPAIGN_OVERVIEW,
    }
}
export const CampaignOverviewSuccess = (CampaignOverviewData) => {
    return {
        type: SUCCESS_CAMPAIGN_OVERVIEW,
        CampaignOverviewData
    }
}
export const CampaignOverviewFailure = () => {
    return {
        type: FAILURE_CAMPAIGN_OVERVIEW,
    }
}
// campaighn compose
export const requestForCampaignCompose=()=>{
    return{
        type:REQUEST_FOR_COMPOSE_DATA
    }
}

// CAMPAIGN_OVERVIEW_MIDDLEWARE
export const CampaignOverviewAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        console.log('this is a token', token)
        Api.CampaignOverview(token, 1).then(result => {
            dispatch(CampaignOverviewSuccess(result.data))
        }).catch(err => {
            console.log(err)
            dispatch(CampaignOverviewFailure(err))
        })
    }
}

export const StartCampaignAction = (data) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        console.log('this is a token', token)
        Api.StartCampaignApi(data, token).then(result => {
            console.log(result.data,"StartCampaignAction")
            dispatch(StartCampaignSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const CampaignOptionAction = (optionData) => {
    console.log('abcd:', optionData);
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        Api.OptionApi(optionData, token).then(result => {
            dispatch(OptionSuccess(result.data))
            // console.log("checking", result.data)
            // alert("option api")
        }).catch(err => {
            console.log(err)
        })
    }
}
export const RecipientAction = (recipientData) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        Api.RecipientApi(recipientData, token).then(result => {
            console.log('result========>', result.data)
            dispatch(RecipientSuccess(result.data))
            // history.push("/Camapin");
        }).catch(err => { console.log(err) })
    }
}
export const CampaignTableAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
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
export const CampaignSendAction = (id) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        Api.CampaignSendGetApi(token, id).then(result => {
            dispatch(CampaignSendSuccess(result.data))
            console.log('result', result.data)
        })
    }
}

// CAMPAIGN_CREATE_PREVIEW MIDDLEWARE
export const PreviewCampaignAction = (id) => {
    console.log(id, 'tyertyerId')
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        console.log('this is a token', token)
        Api.CampaignPreviewApi(token, id).then(result => {
            dispatch(CampaignPreviewSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const CampaignSaveAction = (id) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        Api.CampaignSaveApi(token, id).then(result => {
            dispatch(CampaignSaveSuccess(result.data))
            console.log("result.data", result.data)
        }).catch(err => {
            console.log(err)

        })
    }
}
//  CAMPAIGN_UPDATE_PREVIEW MIDDLEWARE
export const PreviewUpdateCampaignAction = () => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        console.log('token:', token)
        Api.CampaignUpdatePreviewApi(token, 2).then(result => {
            dispatch(CampaignPreviewUpdateSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const CampaignComposeAction = (data,props) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        dispatch(requestForCampaignCompose())
        Api.CampaignComposeApi(token,data).then(result => {
            setTimeout(() => {
                console.log(result)
            props.history.push('/app/admin/CampaignPreview')
            }, 2000);
        }).catch(err => {
            console.log(err,'error-')
        })
    }
}
