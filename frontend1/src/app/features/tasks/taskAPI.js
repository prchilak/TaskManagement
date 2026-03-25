import axiosInstance from './../../../services/api';

export const getTasksAPI = ({ page, limit, search, status }) => {
    return axiosInstance.get('/tasks', {
        params: {
            page,
            limit,
            search,
            status: status === 'all' ? undefined : status,
        },
    });
};
export const createTaskAPI = (data) => axiosInstance.post('/tasks', data);
export const updateTaskAPI = (id, data) =>
    axiosInstance.put(`/tasks/${id}`, data);
export const deleteTaskAPI = (id) =>
    axiosInstance.delete(`/tasks/${id}`);