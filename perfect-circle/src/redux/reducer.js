import {
    USER_CREATE,
    PRODUCT_CREATE,
    GET_USER,
    GET_ALL_PRODUCTS,
    PRICE_CREATE,
    LOADING,
    GET_ALL_PRICES,
    PAYMENT_LINK_CREATE,
    PLAN_CREATE, 
    GET_ALL_PLANS
} from "./actions";

const InitialState = {
    user: {} ,
    products: [],
    getUser: {},
    allProducts: [],
    prices: [],
    loading: false,
    allPrices: [],
    paymentLinkCreate: [],
    plans: [],
    allPlans : []
};

function rootReducer(state = InitialState, action) {
    switch (action.type) {
        case USER_CREATE:
            return {
                ...state,
                user: action.payload,
            };
         case PRODUCT_CREATE:
            console.log(action.payload, "HOLA SOY EL PAYLOAD DE PRODUCT CREATE")
            return {
                ...state,
                products : action.payload,
            };
        case GET_USER:
            //console.log(action.payload, "HOLA SOY REDUCER ACTION.PAYLOAD")
            return {
                ...state,
                getUser: action.payload,
            };
        case GET_ALL_PRODUCTS:
            return {
                ...state,
             allProducts: action.payload,
            }
        case PRICE_CREATE:
            return {
                ...state,
                prices: action.payload,
            }
            case LOADING :
                return{
                    ...state,
                    loading :action.payload,
                }
            case GET_ALL_PRICES:
                return{
                    ...state,
                    allPrices : action.payload,
                }
            case PAYMENT_LINK_CREATE:
                return{
                    ...state,
                    paymentLinkCreate : action.payload,
                }
            case PLAN_CREATE:
            return {
                ...state,
                plans: action.payload,
            }
            case GET_ALL_PLANS: 
            return {
                ...state,
                allPlans: action.payload,
            }    
        default:
            return state;
        }
}
 export default rootReducer;