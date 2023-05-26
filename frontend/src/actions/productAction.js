import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERROR
} from '../constants/productConstant';


export const getAllProducts = (keyword = "", currentPage = 1, price = [0, 100000], category, ratings) => async (dispatch) => {
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



export const clearError = async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    })
}