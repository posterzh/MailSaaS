import { FAILURE_REGISTER, REQUEST_FOR_REGISTER, SUCCESS_REGISTER } from "../actionType/actionType";

const initialState = {
    user: [],
    token:''
}
export const Reducer = (state = { initialState }, action) => {
console.log(action,'action')
    switch (action.type) {
        case REQUEST_FOR_REGISTER:
            return {
            }
        case SUCCESS_REGISTER:
            return {
                user:action.data.user,
                token:action.data.token
            }
        case FAILURE_REGISTER:
            return {
            }
        default:
            break;
    }

}
