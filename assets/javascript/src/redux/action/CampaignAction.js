// imports
import {
    SUCCESS_START_CAMPAIGN,
    REQUEST_FOR_RECIPIENT ,
    FAILURE_RECIPIENT,
    SUCCESS_RECIPIENT,
    SUCCESS_OPTION,
    SUCCESS_CAMPAIGN_TABLE_DATA,
    SUCCESS_SEND_CAMPAIGN,
    SUCCESS_FETCH_CAMPAIGN_CREATE_PREVIEW,
    FAILURE_FETCH_CAMPAIGN_CREATE_PREVIEW,
    REQUEST_FOR_CAMPAIGN_OVERVIEW,
    SUCCESS_CAMPAIGN_OVERVIEW,
    FAILURE_CAMPAIGN_OVERVIEW
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
export const StartCampaignFailure = () => {
    return {
        type: FAILURE_START,
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


// Campaign option
export const OptionSuccess = (data) => {
    console.log(data, 'data')
    return {
        type: SUCCESS_OPTION,
        data
    }
}
// Campaign RECIPIENTS
// export const RecipientSuccess = (formData) => {
//     export const OptionFailure = () => {
//         return {
//             type: FAILURE_OPTION,
//         }
//     }
// }

    // CAMPAIGN_CREATE_PREVIEW
    export const requestForCampaignPreview = () => {

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
    // Campaign_send
    export const CampaignSendSuccess = (sendData) => {
        return {
            type: SUCCESS_SEND_CAMPAIGN,
            sendData
        }
    }
    // CampaignTableData 

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
    // export const StartCampaignAction = (data) => {
    //     return function (dispatch) {
    //         const token = localStorage.getItem('access_token')
    //         Api.StartCampaignApi(data, token).then(result => {
    //             console.log('reult', result)
    //             dispatch(StartCampaignSuccess(result.data))
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     }
    // }
    // export const RecipientAction = (recipientData, token) => {
    //     return function (dispatch) {
    //         Api.RecipientApi(recipientData, token).then(result => {
    //             dispatch(RecipientSuccess(result.data))
    //             console.log(result)
    //         }).catch(err => { console.log(err) })
    //     }
    // }
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
            CampaignOverviewData,
        }
    }
    export const CampaignOverviewFailure = () => {
        return {
            type: FAILURE_CAMPAIGN_OVERVIEW,
        }
    }

    // CAMPAIGN_OVERVIEW_MODDLEWARE
    export const CampaignOverviewAction = () => {
        return function (dispatch) {
            const token = localStorage.getItem('access_token')
            console.log('this is a token', token)
            // dispatch(requestForCampaignPreview())
            Api.CampaignOverview(token, 1).then(result => {
                console.log(result.data.campEamil, 'polo');
                dispatch(CampaignPreviewSuccess(result.data))
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
            const token = localStorage.getItem('access_token')
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
    export const CampaignSendAction = () => {
        return function (dispatch) {
            const token = localStorage.getItem('token')
            console.log('this is a token', token)
            Api.CampaignSendGetApi(token).then(result => {
                dispatch(CampaignSendSuccess(result.data))
                console.log('result', result.data)
            })
        }
    }


    // CAMPAIGN_CREATE_PREVIEW MIDDLEWARE
    export const PreviewCampaignAction = () => {
        return function (dispatch) {
            const token = localStorage.getItem('access_token')
            console.log('this is a token', token)
            // dispatch(requestForCampaignPreview())
            Api.CampaignPreviewApi(token, 152).then(result => {
                console.log(result.data.campEamil, 'polo');
                dispatch(CampaignPreviewSuccess(result.data))
            }).catch(err => {
                console.log(err)
            })
        }
    }
// }