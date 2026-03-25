import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toast: {
        open: false,
        message: '',
        severity: 'info', // success | error | warning | info
    },
};

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.toast = {
                open: true,
                message: action.payload.message,
                severity: action.payload.severity || 'info',
            };
        },
        hideToast: (state) => {
            state.toast.open = false;
        },
    },
});

export const { showToast, hideToast } = alertsSlice.actions;
export default alertsSlice.reducer;
export const alertsSelector = (state) => state.alerts;
