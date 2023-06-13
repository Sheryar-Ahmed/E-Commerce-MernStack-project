import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERROR,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCTS_LIST_ADMIN_REQUEST,
    PRODUCTS_LIST_ADMIN_SUCCESS,
    PRODUCTS_LIST_ADMIN_FAIL,
    REMOVE_PRODUCT_ADMIN_SUCCESS,
    REMOVE_PRODUCT_ADMIN_REQUEST,
    REMOVE_PRODUCT_ADMIN_FAIL,
    PRODUCT_REVIEW_ADMIN_REQUEST,
    PRODUCT_REVIEW_ADMIN_SUCCESS,
    PRODUCT_REVIEW_ADMIN_FAIL,
    PRODUCT_DELETE_REVIEW_ADMIN_REQUEST,
    PRODUCT_DELETE_REVIEW_ADMIN_SUCCESS,
    PRODUCT_DELETE_REVIEW_ADMIN_FAIL
} from '../constants/productConstant';


export const getAllProducts = (keyword = "", currentPage = 1, price = [0, 100000], category = "", ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link;
        if (category) {
            link = `${process.env.REACT_APP_BASE_URL}/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&category=${category}&ratings=${ratings}`;
        } else {
            link = `${process.env.REACT_APP_BASE_URL}/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&ratings[$gte]=${ratings}`;
        }
        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
};
export const addProductRev = (revData) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/review`, revData, config);
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
};

//get products list
export const getProductsListAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_LIST_ADMIN_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`, config);
        dispatch({ type: PRODUCTS_LIST_ADMIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCTS_LIST_ADMIN_FAIL, payload: error.response.data.message })

    }
};
//remove product action for admin
export const removeProductAdminAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_PRODUCT_ADMIN_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/products/${id}`, config);
        dispatch({
            type: REMOVE_PRODUCT_ADMIN_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REMOVE_PRODUCT_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
};
// get product review admin 
export const getProductReviewAdminAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_ADMIN_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/review?id=${id}`, config);
        dispatch({ type: PRODUCT_REVIEW_ADMIN_SUCCESS, payload: data.reviews })
    } catch (error) {
        dispatch({ type: PRODUCT_REVIEW_ADMIN_FAIL, payload: error.response.data.message })

    }
};
// get product review admin 
export const deleteProductReviewAdminAction = (productId, reviewId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REVIEW_ADMIN_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/review?id=${reviewId}&productId=${productId}`, config);
        dispatch({
            type: PRODUCT_DELETE_REVIEW_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_REVIEW_ADMIN_FAIL, payload: error.response.data.message })

    }
};
export const clearError = async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    })
};
