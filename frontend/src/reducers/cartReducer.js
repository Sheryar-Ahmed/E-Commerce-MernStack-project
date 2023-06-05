import { ADD_TO_CART } from '../constants/cartConstant';


export const addToCartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.productId === item.productId);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product === isItemExist.product ? item : i)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            };
        default:
            return state;
    }
}