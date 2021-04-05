import {
  GET_PROFILE,
} from "../actionType/actionType"

const initialState = {
  user: {
    username: null,
    email: null,
    first_name: "",
    last_name: "",
    company_name: null,
    avatar: null
  },
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_PROFILE:
          return {
              ...state,
              user: action.payload,
          };
      default: return state
  }
}