import {
    CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERROR,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    MY_ALL_ORDER_REQUEST, MY_ALL_ORDER_SUCCESS, MY_ALL_ORDER_FAIL,
    ORDERS_LIST_ADMIN_REQUEST, ORDERS_LIST_ADMIN_SUCCESS, ORDERS_LIST_ADMIN_FAIL, REMOVE_ORDER_ADMIN_REQUEST, REMOVE_ORDER_ADMIN_SUCCESS, REMOVE_ORDER_ADMIN_FAIL
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


//get all orders list for admin

export const getOrdersListReducer = (state = { ordersList: [] }, action) => {
    switch (action.type) {
        case ORDERS_LIST_ADMIN_REQUEST:
            return {
                ordersListLoading: true,
                ordersList: [],
            }
        case ORDERS_LIST_ADMIN_SUCCESS:
            return {
                ordersListLoading: false,
                ordersList: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case ORDERS_LIST_ADMIN_FAIL:
            return {
                ordersListLoading: false,
                ordersListError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                ordersListError: null
            }
        default:
            return state;
    }
};
//delete ORDER for admin

export const removeOrderReducer = (state = { orderRem: {} }, action) => {
    switch (action.type) {
        case REMOVE_ORDER_ADMIN_REQUEST:
            return {
                orderRemLoading: true,
                orderRem: {},
            }
        case REMOVE_ORDER_ADMIN_SUCCESS:
            return {
                orderRemLoading: false,
                orderRem: action.payload,
            }
        case REMOVE_ORDER_ADMIN_FAIL:
            return {
                orderRemLoading: false,
                orderRemError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                orderRemError: null
            }
        default:
            return state;
    }
};