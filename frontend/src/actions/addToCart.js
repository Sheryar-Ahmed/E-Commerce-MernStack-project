import { ADD_TO_CART, REMOVE_CART_ITEM } from '../constants/cartConstant';
import axios from 'axios';

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/products/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        },
    })
    //setting the cart item to localstorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    })
    //setting the cart item to localstorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};