import axiosInstance from './../../../services/api';

export const loginAPI = (data) => axiosInstance.post('/auth/login', data);
export const signupAPI = (data) => axiosInstance.post('/auth/signup', data);