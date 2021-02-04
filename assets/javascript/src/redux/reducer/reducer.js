import { FAILURE_REGISTER, REQUEST_FOR_REGISTER, SUCCESS_REGISTER } from "../actionType/actionType";

const initialState = {
    user: '',
    token:''
}
 const Reducer = (state = { initialState }, action) => {
console.log(action.data,'action')
    switch (action.type) {
        case REQUEST_FOR_REGISTER:
            return {
            }
        case SUCCESS_REGISTER:
            return {
                ...state,
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
export default Reducer;