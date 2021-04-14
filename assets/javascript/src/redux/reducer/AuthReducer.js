import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GOOGLE_LOGIN_USER,
  GET_PROFILE,
} from "../actionType/actionType";

const initialState = {
  user: {
    username: null,
    email: null,
    first_name: "",
    last_name: "",
    company_name: null,
    avatar: null
  },
  isLogin: false,
  socialType: 'none',
}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        socialType: 'none'
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        socialType: 'none'
      }
    case GOOGLE_LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        socialType: 'google'
      }
    case LOGOUT_USER:
      return initialState;
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default: return state
  }
}