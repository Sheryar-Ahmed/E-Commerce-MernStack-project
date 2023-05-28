import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { getProductDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: getProductDetailsReducer,
    user: userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;