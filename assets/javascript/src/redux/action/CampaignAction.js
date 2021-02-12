import {
    FAILURE_START,
    REQUEST_FOR_START,
    SUCCESS_START,
    FAILURE_RECIPIENT,
    REQUEST_FOR_RECIPIENT,
    SUCCESS_RECIPIENT,
    FAILURE_VIEW,
    REQUEST_FOR_VIEW,
    SUCCESS_VIEW,
    REQUEST_FOR_OPTION,
    SUCCESS_OPTION,
    FAILURE_OPTION,
    FAILURE_CAMPAIGN_TABLE_DATA,
    REQUEST_FOR_CAMPAIGN_TABLE_DATA,
    SUCCESS_CAMPAIGN_TABLE_DATA,
    FETCH_ALL_CAMPAIGNS,
    SUCCESS_ALL_CAMPAIGNS
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
    // alert("fghjk")
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
export const requestForRecipient = () => {
    return {
        type: REQUEST_FOR_RECIPIENT,
    }
}
export const RecipientSuccess = (formData) => {
    console.log(formData, 'data')
    return {
        type: SUCCESS_RECIPIENT,
        formData
    }
}
export const RecipientFailure = () => {
    return {
        type: FAILURE_RECIPIENT,
    }
}


// CAMPAIGN_GET
// export const FetchCampaigns = ()=>{
//     return{
//         type: FETCH_ALL_CAMPAIGNS
//     }
// }
// export const FetchCampaignsSuccess = (AllCampaignData)=>{
//     return{
//         type: FETCH_ALL_CAMPAIGNS,
//         AllCampaignData
//     }
// }

// export const CamapaignGetAction=()=>
// {
//     return function (dispatch){
//         const token=localStorage.getItem('access_token')
//         dispatch(FetchCampaigns(token))
//         Api.GetAllCampaigns(token).then(result=>{
//             console.log(result.data)
//             dispatch(FetchCampaignsSuccess(result.data))
//             console.log("checking all campaigns",result.data)
//         }).catch(err=>{
//             console.log(err)
//         })    
//     }
// }

// VIEW
// export const requestForRecipient = () => {
//     return {
//         type: REQUEST_FOR_RECIPIENT,
//     }
// }
// export const RecipientSuccess = (recipientsData) => {
//     console.log(recipientsData, 'data')
//     return {
//         type: SUCCESS_RECIPIENT,
//         recipientsData
//     }
// }
// export const RecipientFailure = () => {
//     return {
//         type: FAILURE_RECIPIENT,
//     }
// }


// export const RegisterAction = (user) => {
//     return function (dispatch) {
//         dispatch(requestForRegister(user))
//         Api.RegisterApi(user).then(result => {
//             console.log(result.data, 'registerSuccess')
//             dispatch(registerSuccess(result.data))
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }
// export const LoginAction = (Loginuser) => {
//     return function (dispatch) {
//         dispatch(requestForLogin(Loginuser))
//         Api.LoginApi(Loginuser).then(result => {
//             const token = result.data.token;
//             localStorage.setItem('token', token)
//             console.log(token)
//             dispatch(LoginSuccess(result.data))
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }
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
export const RecipientAction = (recipientData) => {
    return function (dispatch) {
        const token = localStorage.getItem('access_token')
        console.log('this is a token', token)
        dispatch(requestForRecipient(recipientData, token))
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
