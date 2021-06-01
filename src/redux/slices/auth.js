import {createSlice} from '@reduxjs/toolkit';
import api from '../../services/api';

// Slice
const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
    },
    reducers: {
        startLoading: (state) => {
        },
        loginSuccess: (state, action) => {
            state.user = action.payload.data;
            localStorage.setItem('token_type', 'Bearer');
            localStorage.setItem('token', action.payload.data.token);
            state.authResult = 'success';
            state.loading = false;
            state.success = true;
        },
        authError: (state, action) => {
            state.authResult = action.payload;
            state.loading = false;
            state.success = false;
        },
        logoutSuccess: (state, action) => {
            localStorage.removeItem('token');
        },
        registerSuccess: (state, action) => {
            state.authResult = action.payload.message;
            state.loading = false;
            state.success = true;
        },
    },
});
export default slice.reducer;
// Actions
const {
    loginSuccess,
    registerSuccess,
    authError,
    logoutSuccess
} = slice.actions;

export const login = (data) => async (dispatch) => {
    try {
        const res = await api.post('/auth/login/', data);
        dispatch(loginSuccess(res));
        window.location = '/';
    } catch (e) {
        if (e.response) {
            let message = '';
            let key;
            if (e.response.data.errors) {
                for (key in e.response.data.errors) {
                    message = e.response.data.errors[key][0];
                }
            } else {
                message = e.response.data.message;
            }
            return dispatch(authError(message));
        }
    }
};
export const authRegister = (data) => (dispatch) => {
    return api
        .post(`auth/register`, data)
        .then((response) => {
            dispatch(registerSuccess(response.data));
            setTimeout(() => {
                window.location = '/login';
            }, 2000);


        })
        .catch((e) => {
            if (e.response) {
                let message = '';
                let key;
                if (e.response.data.errors) {
                    for (key in e.response.data.errors) {
                        message = e.response.data.errors[key][0];
                    }
                } else {
                    message = e.response.data.message;
                }
                return dispatch(authError(message));
            }
        });
};
export const logout = (data) => (dispatch) => {
    return api
        .post(`auth/register`, data)
        .then((response) => {
            dispatch(logoutSuccess());
        })
};

