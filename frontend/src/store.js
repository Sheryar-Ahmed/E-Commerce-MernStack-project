import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { getProductDetailsReducer, productReducer, addProductRevReducer, getProductsListReducer, getRemoveProductReducer, getProductReviewAdminReducer, deleteProductReviewAdminReducer } from './reducers/productReducer';
import { userReducer, updatePasswordReducer, updateUserProfileReducer, userForgotPassword, resetPasswordToken, usersListReducer, logoutUserReducer, removeUserAdminReducer, updateUserRoleAdminReducer } from './reducers/userReducer';
import { addToCartReducer } from './reducers/cartReducer';
import {
    createNewOrderReducer,
    getMyordersReducers,
    getOrderDetailsReducer,
    getOrdersListReducer,
    removeOrderReducer,
    updateOrderStatusRoleAdminReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: getProductDetailsReducer,
    user: userReducer,
    logout: logoutUserReducer,
    updatePass: updatePasswordReducer,
    updatedUser: updateUserProfileReducer,
    productRev: addProductRevReducer,
    cart: addToCartReducer,
    newOrder: createNewOrderReducer,
    myOrders: getMyordersReducers,
    detailOrder: getOrderDetailsReducer,
    forgotPass: userForgotPassword,
    resetPass: resetPasswordToken,
    usersList: usersListReducer,
    productsList: getProductsListReducer,
    ordersList: getOrdersListReducer,
    productRem: getRemoveProductReducer,
    orderRem: removeOrderReducer,
    userRem: removeUserAdminReducer,
    userRole: updateUserRoleAdminReducer,
    updatedOrderStatus: updateOrderStatusRoleAdminReducer,
    productReviewList: getProductReviewAdminReducer,
    DelProductReview: deleteProductReviewAdminReducer,
});
//we will set localstorage data 
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;