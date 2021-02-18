import {
    FETCH_PROSPECTS,
    SUCCESS_FETCH_PROSPECTS,
    FAILURE_FETCH_PROSPECTS,
    SUCCESS_FETCH_ONCLICK_PROSPECTS
} from "../../redux/actionType/actionType"

import Api from "../api/api"

// GET PROSPECT 
export const FetchProspects = () => {
    return {
        type: FETCH_PROSPECTS
    }
}
export const FetchProspectsSuccess = (prospectData) => {
    return {
        type: SUCCESS_FETCH_PROSPECTS,
        prospectData
    }
}
export const FailureProspects = () => {
    return {
        type: FAILURE_FETCH_PROSPECTS
    }
}

// GET ONCLICK PROSPECT
export const FetchOnclickProspectsSuccess = (prospectOnclickData) => {
    return {
        type: SUCCESS_FETCH_ONCLICK_PROSPECTS,
        prospectOnclickData
    }
}


export const ProspectActionData = () => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        dispatch(FetchProspects(token))
        Api.CampaignProspects(token).then(result => {
            console.log(result.data)
            dispatch(FetchProspectsSuccess(result.data))
            console.log("checking prospect data:", result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}

// ACTION FOR ONCLICK PROSPECT
export const OnclickProspectActionData = (id) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        Api.CampaignOnclickProspects(id,token).then(result => {
            console.log(result.data)
            dispatch(FetchOnclickProspectsSuccess(result.data))
            // console.log("checking onclick prospect data:", result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}