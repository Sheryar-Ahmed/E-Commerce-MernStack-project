import { ADD_TO_CART, REMOVE_CART_ITEM } from '../constants/cartConstant';


export const addToCartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.productId === item.productId);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.productId === isItemExist.productId ? item : i)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            };

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.productId !== action.payload),
            };

        default:
            return state;
    }
}