import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { getProductDetailsReducer, productReducer, addProductRevReducer } from './reducers/productReducer';
import { userReducer, updatePasswordReducer, updateUserProfileReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: getProductDetailsReducer,
    user: userReducer,
    updatePass: updatePasswordReducer,
    updatedUser: updateUserProfileReducer,
    productRev: addProductRevReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;