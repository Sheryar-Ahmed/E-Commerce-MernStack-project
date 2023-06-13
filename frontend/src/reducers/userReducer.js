import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_pass_REQUEST,
    USER_UPDATE_pass_SUCCESS,
    USER_UPDATE_pass_FAIL,
    CLEAR_ERROR,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_UPDATED_REQUEST,
    USER_UPDATED_SUCCESS,
    USER_UPDATED_FAIL,
    USER_FORGOT_pass_REQUEST,
    USER_FORGOT_pass_SUCCESS,
    USER_FORGOT_pass_FAIL,
    USER_RESET_REQUEST,
    USER_RESET_SUCCESS,
    USER_RESET_FAIL,
    USERS_LIST_ADMIN_REQUEST,
    USERS_LIST_ADMIN_SUCCESS,
    USERS_LIST_ADMIN_FAIL,
    REMOVE_USER_ADMIN_REQUEST,
    REMOVE_USER_ADMIN_SUCCESS,
    REMOVE_USER_ADMIN_FAIL
} from '../constants/userConstant';



export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case USER_DETAILS_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const updatePasswordReducer = (state = { updatePass: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_pass_REQUEST:
            return {
                loadingPass: true,
                updatePass: {}
            }
        case USER_UPDATE_pass_SUCCESS:
            return {
                loadingPass: false,
                updatePass: action.payload,
                userPass: action.payload.user,
            }
        case USER_UPDATE_pass_FAIL:
            return {
                loadingPass: false,
                errorPass: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errorPass: null
            }
        default:
            return state;
    }
};
export const userForgotPassword = (state = { forgotPass: {} }, action) => {
    switch (action.type) {
        case USER_FORGOT_pass_REQUEST:
            return {
                loading: true,
                forgotPass: {}
            }
        case USER_FORGOT_pass_SUCCESS:
            return {
                loading: false,
                forgotPass: action.payload,
            }
        case USER_FORGOT_pass_FAIL:
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
export const resetPasswordToken = (state = { resetPass: {} }, action) => {
    switch (action.type) {
        case USER_RESET_REQUEST:
            return {
                loading: true,
                resetPass: {}
            }
        case USER_RESET_SUCCESS:
            return {
                loading: false,
                resetPass: action.payload,
            }
        case USER_RESET_FAIL:
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
export const logoutUserReducer = (state = { logout: {} }, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return {
                loadingPass: true,
                logout: {},
            }
        case USER_LOGOUT_SUCCESS:
            return {
                loadingPass: false,
                logout: action.payload,
            }
        case USER_LOGOUT_FAIL:
            return {
                loadingPass: false,
                errorPass: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errorPass: null
            }
        default:
            return state;
    }
};

export const updateUserProfileReducer = (state = { updatedUser: {} }, action) => {
    switch (action.type) {
        case USER_UPDATED_REQUEST:
            return {
                updatedUserloading: true,
                updatedUser: {},
            }
        case USER_UPDATED_SUCCESS:
            return {
                updatedUserloading: false,
                updatedUser: action.payload,
            }
        case USER_UPDATED_FAIL:
            return {
                updatedUserloading: false,
                updatedUserError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                updatedUserError: null
            }
        default:
            return state;
    }
}


//get users list for admin

export const usersListReducer = (state = { usersList: [] }, action) => {
    switch (action.type) {
        case USERS_LIST_ADMIN_REQUEST:
            return {
                usersListLoading: true,
                usersList: [],
            }
        case USERS_LIST_ADMIN_SUCCESS:
            return {
                usersListLoading: false,
                usersList: action.payload,
            }
        case USERS_LIST_ADMIN_FAIL:
            return {
                usersListLoading: false,
                usersListError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                usersListError: null
            }
        default:
            return state;
    }
};
//remove user admin access
export const removeUserAdminReducer = (state = { userRem: {} }, action) => {
    switch (action.type) {
        case REMOVE_USER_ADMIN_REQUEST:
            return {
                userRemLoading: true,
                userRem: {},
            }
        case REMOVE_USER_ADMIN_SUCCESS:
            return {
                userRemLoading: false,
                userRem: action.payload,
            }
        case REMOVE_USER_ADMIN_FAIL:
            return {
                userRemLoading: false,
                userRemError: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                userRemError: null
            }
        default:
            return state;
    }
};