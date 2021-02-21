import{
    REQUEST_FOR_GET_SCHEDULE,
    SUCCESS_GET_SCHEDULE,
    FAILURE_GET_SCHEDULE,
    UPDATE_REQUEST_FOR_GET_SCHEDULE,
    UPDATE_SUCCESS_GET_SCHEDULE,
    UPDATE_FAILURE_GET_SCHEDULE
}from "../../redux/actionType/actionType"

import Api from "../api/api"

// GET SCHEDULE
export const FetchSchedule=()=>{
    return {
        type:REQUEST_FOR_GET_SCHEDULE
    }
}
export const FetchScheduleSuccess=(ScheduleGetData)=>{
    return {
        type: SUCCESS_GET_SCHEDULE,
        ScheduleGetData
    }
}
export const FetchScheduleFailure=()=>{
    return {
        type: FAILURE_GET_SCHEDULE
    }
}

// UPDATE SCHEDULE
export const UpdateSchedule=()=>{
    return {
        type:UPDATE_REQUEST_FOR_GET_SCHEDULE
    }
}
export const UpdateScheduleSuccess=(UpdateScheduleData)=>{
    return {
        type: UPDATE_SUCCESS_GET_SCHEDULE,
        UpdateScheduleData
    }
}
export const UpdateScheduleFailure=()=>{
    return {
        type: UPDATE_FAILURE_GET_SCHEDULE
    }
}


// MIDDLEWARE FOR GET SCHEDULE
export const GetScheduleAction = () => {
    // console.log("ScheduleGetData",ScheduleGetData)
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        dispatch(FetchSchedule(token))
        Api.GetScheduleApi(token).then(result => {
            dispatch(FetchScheduleSuccess(result.data))
            console.log("checking for schedule get data in MIDDLEWARE", result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}

// MIDLEWARE FOR UPDATE SCHEDULE
export const ScheduleUpdateAction = () => {
    // console.log("ScheduleGetData",ScheduleGetData)
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        dispatch(UpdateSchedule(token))
        Api.UpdateScheduleApi(token).then(result => {
            dispatch(UpdateScheduleSuccess(result.data))
            console.log("checking for schedule update data in MIDDLEWARE", result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}
