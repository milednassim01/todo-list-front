import {createSlice} from '@reduxjs/toolkit';
import api from '../../services/api';

// Slice
const slice = createSlice({
    name: 'tasks',
    initialState: {
        isLoading: false,
        tasks: []
    },
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        tasksSuccess: (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload.sort((a, b) => (a.checked - b.checked));
        },

    },
});
export default slice.reducer;
// Actions
const {tasksSuccess, startLoading} = slice.actions;

export const getTasks = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        return await api.get('/tasks').then(res => {
            dispatch(tasksSuccess(res.data));
        });
    } catch (e) {

    }
};
export const create = (data) => async (dispatch) => {
    try {
        await api.post('/tasks', data);
        dispatch(getTasks());
    } catch (e) {

    }
};

export const update = (data, id) => async (dispatch) => {
    try {
        await api.put(`/tasks/${id}`, data);
        dispatch(getTasks());
    } catch (e) {

    }
};

export const remove = (id) => async (dispatch) => {
    try {
        await api.delete(`/tasks/${id}`);
        dispatch(getTasks());
    } catch (e) {

    }
};


