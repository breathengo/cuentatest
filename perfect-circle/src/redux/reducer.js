import {
    USER_CREATE,
    PRODUCT_CREATE,
    GET_USER,
} from "./actions";

const InitialState = {
    users: [],
    products: {},
    getUser: {},
};

function rootReducer(state = InitialState, action) {
    switch (action.type) {
        case USER_CREATE:
            return {
                ...state,
                user: action.payload,
            };
         case PRODUCT_CREATE:
            return {
                ...state,
                user: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                getUser: action.payload,
            };
        default:
            return state;
        }
}
 export default rootReducer;