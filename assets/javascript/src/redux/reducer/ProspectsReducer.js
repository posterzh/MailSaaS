import {
    FILTER_RECIPIENTS
} from "../actionType/actionType";

const initialState = {
    counts: null,
    recipients: [],
};

export const prospectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_RECIPIENTS:
            return {
                ...state,
                counts: action.payload[0],
                recipients: action.payload.slice(1),
            };
        default:
            return state;
    }
};
