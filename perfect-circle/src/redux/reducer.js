import {
    USER_CREATE,
} from "./actions";

const InitialState = {
    users: [],
};

function rootReducer(state = InitialState, action) {
    switch (action.type) {
        case USER_CREATE:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
        }
}
 export default rootReducer;