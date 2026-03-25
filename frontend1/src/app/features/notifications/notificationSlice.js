import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNotificationAPI, getNotificationsAPI, markAllNotificationsReadAPI, markNotificationReadAPI } from './notificationAPI';

const initialState = {
    list: [],
    unreadCount: 0,
    page: 1,
    hasMore: true,
    loading: false,
};

export const fetchNotifications = createAsyncThunk(
    'notifications/fetch',
    async (page, { rejectWithValue }) => {
        try {
            const res = await getNotificationsAPI(page);
            return res.data;
        } catch (err) {
            return rejectWithValue('Failed to fetch notifications');
        }
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (id, { rejectWithValue }) => {
        try {
            await markNotificationReadAPI(id);
            return id;
        } catch (err) {
            return rejectWithValue('Failed to update');
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            await markAllNotificationsReadAPI();
            return true;
        } catch (err) {
            return rejectWithValue('Failed to update');
        }
    }
);

export const createNotification = createAsyncThunk(
    'notifications/create',
    async (data, { rejectWithValue }) => {
        try {
            const res = await createNotificationAPI(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to send notification'
            );
        }
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.list = [
                ...state.list,
                ...action.payload,
            ];
        },
        addNotificationIfNotExists: (state, action) => {
            const exists = state.list?.some(
                (n) => n._id === action.payload._id
            );

            if (!exists) {
                
                state.list.unshift(action.payload);

             
                state.unreadCount += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
           
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;

                const newData = action.payload.data;

                const existingIds = new Set(state.list.map(n => n._id));

                const filtered = newData.filter(n => !existingIds.has(n._id));

                state.list = [...state.list, ...filtered];

                if (state.page === 1) {
                    state.unreadCount = action.payload.unreadCount;
                }

                state.page += 1;
                state.hasMore = newData.length > 0;
            })

        
            .addCase(markAsRead.fulfilled, (state, action) => {
                const notif = state.list.find(n => n._id === action.payload);
                if (notif && !notif.read) {
                    notif.isRead = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })

            
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.list.forEach(n => (n.read = true));
            });
    },
});

export const {
    addNotification,
    addNotificationIfNotExists
} = notificationSlice.actions;

export default notificationSlice.reducer;