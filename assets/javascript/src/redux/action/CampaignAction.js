import {
    SUCCESS_START_CAMPAIGN,
    SUCCESS_RECIPIENT,
    SUCCESS_OPTION,
    SUCCESS_CAMPAIGN_TABLE_DATA,
    SUCCESS_SEND_CAMPAIGN,
    SUCCESS_SAVE_CAMPAIGN

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
export const RecipientSuccess = (recipientData) => {
    return {
        type: SUCCESS_RECIPIENT,
        recipientData
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
            dispatch(StartCampaignSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const RecipientAction = (recipientData, token) => {
    return function (dispatch) {
        Api.RecipientApi(recipientData, token).then(result => {
            console.log('RecipientApiData:',result.data.resp[0]);
            dispatch(RecipientSuccess(result.data.resp[0]))
        }).catch(err => { console.log('Error:',err) })
    }
}


// .then((Api.CampaignSendGetApi(result.data.resp[0].id,token)).then(result2=>{
//     console.log('CampaignSendGetApi:',result2);
//     dispatch(CampaignSendSuccess(result2))
// }))



// console.log(result.data, 'result')
//             console.log('res',result.data.resp[0].id)
// .then(function(result) { // (***)

//     alert(result); // 2
//     return result * 2;
  
//   }).then(function(result) {
  
//     alert(result); // 4
//     return result * 2;
  
//   });
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
export const CampaignSendAction = (id) => {
    return function (dispatch) {
        console.log("id-----",id)
        const token = localStorage.getItem('token')
        Api.CampaignSendGetApi(id, token).then(result => {
            dispatch(CampaignSendSuccess(result.data))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const CampaignSaveAction = (saveData) => {
    return function (dispatch) {
        const token = localStorage.getItem('token')
        Api.CampaignSaveApi(saveData, token).then(result => {
            console.log()
            dispatch(CampaignSaveSuccess(result.data))
            console.log("result.data", result.data)
        }).catch(err => {
            console.log(err)
        })
    }
}

