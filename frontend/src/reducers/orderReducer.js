import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERROR, 
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, 
    MY_ALL_ORDER_REQUEST, MY_ALL_ORDER_SUCCESS, MY_ALL_ORDER_FAIL 
} from '../constants/OrderConstant';

// create order
export const createNewOrderReducer = (state = { newOrder: {} }, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
                newOrder: {}
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                newOrder: action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

//get User Orders
export const getMyordersReducers = (state = { myOrders: [] }, action) => {
    switch (action.type) {
        case MY_ALL_ORDER_REQUEST:
            return {
                loading: true,
                myOrders: []
            }
        case MY_ALL_ORDER_SUCCESS:
            return {
                loading: false,
                myOrders: action.payload,
            }
        case MY_ALL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};
// //get order details
export const getOrderDetailsReducer = (state = { detailOrder: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
                detailOrder: {}
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                detailOrder: action.payload,
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

