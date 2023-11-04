import axios from 'axios';
import { getAccessToken } from '@utils/cookie-utils';

let BASE_URL = 'https://www.onlineglobalaid.com/api';
if (process.env.NODE_ENV !== 'production') {
  BASE_URL = 'http://localhost:3001/api';
}
export default axios.create({
  baseURL: BASE_URL,
  timeout: 35000,
  headers: {
    Accept: 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

axiosPrivate.interceptors.request.use((request) => {
  // console.log("request.headers", request.headers)
  if (!request.headers.Authorization) {
    const token = getAccessToken();
    if (token) {
      request.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
  }
  return request;
})
axiosPrivate.interceptors.response.use(
  response => response,
  async (error) => {
    const originalConfig = error.config;
    if (error.message === 'Network Error') {
      return new Error('Network Error');
    }
    if (error?.response?.status === 306 && !originalConfig._retry) {
      return axiosInstance;
    }
    if (error?.response?.status === 403 && !originalConfig?._retry) {
      originalConfig._retry = true;
      const response = await axiosPrivate.get(`/auth/refresh/`, originalConfig.headers.Cookie && { headers : { cookie: originalConfig.headers.Cookie}});
      const newAccessToken = response?.data?.accessToken;
      originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosPrivate(originalConfig);
    }
    return Promise.reject(error);
  }
);
