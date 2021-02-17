import {
    SUCCESS_FETCH_UNSUBSCRIPTION
} from "../actionType/actionType"
import Api from "../api/api";

// export const fetchUnsubscribe = () => {
//     return {
//         type: FETCH_UNSUBSCRIPTION,
//     }
// }

export const successFetchUnsubscribe = (payload) => {
    console.log(payload,'payload')
    return {
        type: SUCCESS_FETCH_UNSUBSCRIPTION,  
        payload
    }
}

export const fetchUnsubscribeAction = () => {
    return function(dispatch){
        const token = localStorage.getItem('access_token')
        Api.fetchUnsbcribed(token).then((response)=>{
          dispatch(successFetchUnsubscribe(response.data));
        }).catch((err)=>{
            console.log(err,'err')
        })
    }
}
 