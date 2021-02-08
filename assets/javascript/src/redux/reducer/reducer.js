import { FAILURE_REGISTER, REQUEST_FOR_REGISTER, SUCCESS_REGISTER,
     FAILURE_LOGIN, REQUEST_FOR_LOGIN, SUCCESS_LOGIN 
     ,FAILURE_START, REQUEST_FOR_START, SUCCESS_START 
    } from "../actionType/actionType";

const initialState = {
    Loginuser: '',
    user: '',
    data:''
}
const Reducer = (state = { initialState }, action) => {
    switch (action.type) {
        // cases for signup
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

            case REQUEST_FOR_START:
            return {
            }
        case SUCCESS_START:
            return {
                ...state,
                data: action.data,
            }
        case FAILURE_START:
            return {
            }
        default: return state
            break;
    }
}
export default Reducer;