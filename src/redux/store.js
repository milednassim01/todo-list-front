import { configureStore } from '@reduxjs/toolkit';
import api from '../services/api';
import auth from './slices/auth';
import tasks from './slices/tasks';

export default configureStore({
    reducer: {
        auth,
        tasks
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            },
            serializableCheck: false,
        }),
});
