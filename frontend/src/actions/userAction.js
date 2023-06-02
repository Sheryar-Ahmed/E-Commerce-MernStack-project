import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_pass_REQUEST,
    USER_UPDATE_pass_SUCCESS,
    USER_UPDATE_pass_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
} from '../constants/userConstant';
import axios from 'axios';



export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };

        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/login`, { email, password }, config);
        const base64ValueURL = await axios.get(data.user.avatar.url);
        data.user.avatar.url = base64ValueURL.data.body.replace('data:image/jpeg;base64,', '').replace('=', '');
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
};

export const userRegistration = (userData, avatar) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const url = await axios.post(`https://www.filestackapi.com/api/store/S3?key=ALmUwbBWXSR6P5X5AERmoz`, {
            Headers: { "Content-Type": "image/jpg " || "image/jpeg" || "image/png", 'Access-Control-Allow-Credentials': true },
            withCredentials: true,
            body: avatar
        });
        userData.avatar = { url: url.data.url };
        const config = { Headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user`, userData, config);
        const base64ValueURL = await axios.get(data.user.avatar.url);
        data.user.avatar.url = base64ValueURL.data.body.replace('data:image/jpeg;base64,', '').replace('=', '');
        dispatch({ type: REGISTER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message })
    }
};


export const userDetails = () => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/me`, config);
        const base64ValueURL = await axios.get(data.user.avatar.url);
        data.user.avatar.url = base64ValueURL.data.body.replace('data:image/jpeg;base64,', '').replace('=', '');
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })
    }
};

export const updatedPassword = (userPass) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_pass_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/password/update`, userPass, config);
        dispatch({ type: USER_UPDATE_pass_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_UPDATE_pass_FAIL, payload: error.response.data.message })

    }
};


export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST });
        const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/logout`, config);
        dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data.message })
    }
};