import axiosInstance from './../../../services/api';

export const getNotificationsAPI = (page = 1, limit = 10) => {
    return axiosInstance.get(`/notifications?page=${page}&limit=${limit}`);
};

export const markNotificationReadAPI = (id) =>
    axiosInstance.put(`/notifications/${id}/read`);

export const markAllNotificationsReadAPI = () =>
    axiosInstance.patch('/notifications/read-all');
export const createNotificationAPI = (data) =>
    axiosInstance.post('/notifications', data);