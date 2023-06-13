import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    MY_ALL_ORDER_REQUEST,
    MY_ALL_ORDER_SUCCESS,
    MY_ALL_ORDER_FAIL,
    ORDERS_LIST_ADMIN_REQUEST,
    ORDERS_LIST_ADMIN_SUCCESS,
    ORDERS_LIST_ADMIN_FAIL,
    REMOVE_ORDER_ADMIN_REQUEST,
    REMOVE_ORDER_ADMIN_SUCCESS,
    REMOVE_ORDER_ADMIN_FAIL
} from '../constants/OrderConstant';
import axios from 'axios';


//create order Action
export const createNewOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/order/new`, orderData, config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
};
//create order Action
export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ALL_ORDER_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/orders/me`, config);
        dispatch({
            type: MY_ALL_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ALL_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/order/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
};

//get orders list
export const getOrdersListAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ORDERS_LIST_ADMIN_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/orders`, config);
        dispatch({ type: ORDERS_LIST_ADMIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDERS_LIST_ADMIN_FAIL, payload: error.response.data.message })

    }
};


//remove order action for admin
export const removeOrderAdminAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_ORDER_ADMIN_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/order/${id}`, config);
        dispatch({
            type: REMOVE_ORDER_ADMIN_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REMOVE_ORDER_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
};