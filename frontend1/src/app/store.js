import alertsReducer from './features/alerts/alertsSlice';
import authReducer from './features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/tasksSlice';
import notificationReducer from './features/notifications/notificationSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        alerts: alertsReducer,
        notifications: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});