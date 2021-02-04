import { FAILURE_REGISTER, REQUEST_FOR_REGISTER, SUCCESS_REGISTER } from "../actionType/actionType"
import Api from "../api/api"


export const requestForRegister=()=>{
    return{
        type:REQUEST_FOR_REGISTER,
    }
}
export const registerSuccess=(data)=>{
    return{
        type:SUCCESS_REGISTER,
        data
    }
}
export const registerFailure=()=>{
    return{
        type:FAILURE_REGISTER,
    }
}

export const RegisterAction=(user)=>{
    return function(dispatch){
    dispatch(requestForRegister(user))
    Api.RegisterApi(user).then(result=>{
        console.log(result.data,'registerSuccess')
        dispatch(registerSuccess(result.data))
    }).catch(err=>{
        console.log(err)
    })
    }
}