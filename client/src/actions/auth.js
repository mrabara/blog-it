import axios from 'axios';
import setToken from '../utils/setToken';
import { setAlert } from './alert';


export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setToken(localStorage.token);
    }

    try {
        const res = await axios.get('/auth');
        dispatch({
            type: 'USER_LOADED',
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: 'AUTH_ERROR'
        })
    }
}

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });
   
    try {
        const res = await axios.post('/users', body, config);
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        })

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: 'REGISTER_FAIL'
        })
    }
}


export const loginUser = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({  email, password });
   
    try {
        const res = await axios.post('/auth', body, config);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        })

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: 'LOGIN_FAIL'
        })
    }
}

export const logOut = () => dispatch => {
   
    dispatch({ type: 'LOG_OUT' });
}