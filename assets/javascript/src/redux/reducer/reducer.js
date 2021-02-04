import { FAILURE_REGISTER, REQUEST_FOR_REGISTER, SUCCESS_REGISTER, FAILURE_LOGIN, REQUEST_FOR_LOGIN, SUCCESS_LOGIN } from "../actionType/actionType";

const initialState = {
    Loginuser: '',
    user: '',
    token: ''
}
const Reducer = (state = { initialState }, action) => {
    console.log(action.data, 'action')
    switch (action.type) {
        case REQUEST_FOR_REGISTER:
            return {
            }
        case SUCCESS_REGISTER:
            return {
                ...state,
                user: action.data,
            }
        case FAILURE_REGISTER:
            return {
            }
            
        case REQUEST_FOR_LOGIN:
            return {
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                Loginuser: action.data,
            }
        case FAILURE_LOGIN:
            return {
            }
        default: return state
            break;
    }
}
export default Reducer;