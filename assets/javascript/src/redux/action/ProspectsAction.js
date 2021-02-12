import {
    FETCH_PROSPECTS,
    SUCCESS_FETCH_PROSPECTS
}from "../../redux/actionType/actionType"

import Api from "../api/api"

export const FetchProspects=()=>{
    return {
        type:FETCH_PROSPECTS
    }
}
export const FetchProspectsSuccess=(prospectData)=>{
    return {
        type:SUCCESS_FETCH_PROSPECTS,
        prospectData
    }
}

export const ProspectActionData=()=>
{
    return function (dispatch){
        const token =localStorage.getItem('access_token')
        dispatch(FetchProspects(token))
        Api.CampaignProspects(token).then(result=>{
            console.log(result.data)
            dispatch(FetchProspectsSuccess(result.data))
            console.log("checking prospect data:",result.data)
        }).catch(err=>{
            console.log(err)
        })
    }
}