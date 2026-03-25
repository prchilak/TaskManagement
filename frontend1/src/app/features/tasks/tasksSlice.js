import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTaskAPI, deleteTaskAPI, getTasksAPI, updateTaskAPI } from './taskAPI';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ page = 1, limit = 15, search = '', status = 'all' }, { rejectWithValue }) => {
        try {
            const res = await getTasksAPI({ page, limit, search, status });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to fetch tasks'
            );
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, { rejectWithValue }) => {
        try {
            const res = await createTaskAPI(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Create failed'
            );
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateTaskAPI(id, data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Update failed'
            );
        }
    }
);

// DELETE
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            await deleteTaskAPI(id);
            return id;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Delete failed'
            );
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        page: 1,
        totalPages: 1,
        total: 0,
        hasMore: true,
    },
    reducers: {
        resetTasks: (state) => {
            state.tasks = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;

                const { data, pagination } = action.payload;

                if (pagination.page === 1) {
                    state.tasks = data;
                } else {
                    state.tasks = [...state.tasks, ...data];
                }

                state.page = pagination.page;
                state.totalPages = pagination.totalPages;
                state.total = pagination.total;
                state.hasMore = pagination.page < pagination.totalPages;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    (t) => t._id === action.payload._id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (t) => t._id !== action.payload
                );
            });
    },
});

export default taskSlice.reducer;
export const { resetTasks } = taskSlice.actions;