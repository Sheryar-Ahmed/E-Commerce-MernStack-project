import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERROR,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCTS_LIST_ADMIN_REQUEST,
    PRODUCTS_LIST_ADMIN_SUCCESS,
    PRODUCTS_LIST_ADMIN_FAIL,
    REMOVE_PRODUCT_ADMIN_REQUEST,
    REMOVE_PRODUCT_ADMIN_SUCCESS,
    REMOVE_PRODUCT_ADMIN_FAIL,
    PRODUCT_REVIEW_ADMIN_REQUEST,
    PRODUCT_REVIEW_ADMIN_SUCCESS,
    PRODUCT_REVIEW_ADMIN_FAIL,
    PRODUCT_DELETE_REVIEW_ADMIN_REQUEST,
    PRODUCT_DELETE_REVIEW_ADMIN_SUCCESS,
    PRODUCT_DELETE_REVIEW_ADMIN_FAIL,
    CREATE_NEW_PRODUCT_ADMIN_REQUEST,
    CREATE_NEW_PRODUCT_ADMIN_SUCCESS,
    CREATE_NEW_PRODUCT_ADMIN_FAIL,
    UPDATE_PRODUCT_ADMIN_REQUEST,
    UPDATE_PRODUCT_ADMIN_SUCCESS,
    UPDATE_PRODUCT_ADMIN_FAIL
} from '../constants/productConstant';

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.productsALL,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.documentsPerPage,
            }
        case ALL_PRODUCT_FAIL:
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
// product page details
export const getProductDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                productDetails: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
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


//add product review 
export const addProductRevReducer = (state = { productRev: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return {
                loadingRev: true,
                productRev: {}
            }
        case PRODUCT_REVIEW_SUCCESS:
            return {
                loadingRev: false,
                productRev: action.payload,
            }
        case PRODUCT_REVIEW_FAIL:
            return {
                loadingRev: false,
                errorRev: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errorRev: null
            }
        default:
            return state;
    }
};


//delete product for admin

export const getRemoveProductReducer = (state = { productRem: {} }, action) => {
    switch (action.type) {
        case REMOVE_PRODUCT_ADMIN_REQUEST:
            return {
                productRemLoading: true,
                productRem: {},
            }
        case REMOVE_PRODUCT_ADMIN_SUCCESS:
            return {
                productRemLoading: false,
                productRem: action.payload,
            }
        case REMOVE_PRODUCT_ADMIN_FAIL:
            return {
                productRemLoading: false,
                productRemError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                productRemError: null
            }
        default:
            return state;
    }
};

//get all products list for admin
export const getProductsListReducer = (state = { productsList: [] }, action) => {
    switch (action.type) {
        case PRODUCTS_LIST_ADMIN_REQUEST:
            return {
                productsListLoading: true,
                productsList: [],
            }
        case PRODUCTS_LIST_ADMIN_SUCCESS:
            return {
                productsListLoading: false,
                productsList: action.payload.productsAll,
                stock: action.payload.stock,
                outStock: action.payload.outStock,
            }
        case PRODUCTS_LIST_ADMIN_FAIL:
            return {
                productsListLoading: false,
                productsListError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                productsListError: null
            }
        default:
            return state;
    }
};

//get review of the product for admin
export const getProductReviewAdminReducer = (state = { productReviewList: [] }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_ADMIN_REQUEST:
            return {
                productReviewListLoading: true,
                productReviewList: [],
            }
        case PRODUCT_REVIEW_ADMIN_SUCCESS:
            return {
                productReviewListLoading: false,
                productReviewList: action.payload
            }
        case PRODUCT_REVIEW_ADMIN_FAIL:
            return {
                productReviewListLoading: false,
                productReviewListError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                productReviewListError: null
            }
        default:
            return state;
    }
};

//delete review of the product for admin
export const deleteProductReviewAdminReducer = (state = { DelProductReview: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REVIEW_ADMIN_REQUEST:
            return {
                DelProductReviewLoading: true,
                DelProductReview: {},
            }
        case PRODUCT_DELETE_REVIEW_ADMIN_SUCCESS:
            return {
                DelProductReviewLoading: false,
                DelProductReview: action.payload
            }
        case PRODUCT_DELETE_REVIEW_ADMIN_FAIL:
            return {
                DelProductReviewLoading: false,
                DelProductReviewError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                DelProductReviewError: null
            }
        default:
            return state;
    }
};



//create new product Admin
export const createProductAdminReducer = (state = { createProduct: {} }, action) => {
    switch (action.type) {
        case CREATE_NEW_PRODUCT_ADMIN_REQUEST:
            return {
                createProductLoading: true,
                createProduct: {},
            }
        case CREATE_NEW_PRODUCT_ADMIN_SUCCESS:
            return {
                createProductLoading: false,
                createProduct: action.payload
            }
        case CREATE_NEW_PRODUCT_ADMIN_FAIL:
            return {
                createProductLoading: false,
                createProductError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                createProductError: null
            }
        default:
            return state;
    }
};

//update product Admin
export const updateProductAdminReducer = (state = { updateProduct: {} }, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_ADMIN_REQUEST:
            return {
                updateProductLoading: true,
                updateProduct: {},
            }
        case UPDATE_PRODUCT_ADMIN_SUCCESS:
            return {
                updateProductLoading: false,
                updateProduct: action.payload
            }
        case UPDATE_PRODUCT_ADMIN_FAIL:
            return {
                updateProductLoading: false,
                updateProductError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                updateProductError: null
            }
        default:
            return state;
    }
};