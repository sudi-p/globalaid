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
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?._retry) {
      prevRequest._retry = true;
      const response = await axiosPrivate.get(`/auth/refresh/`, prevRequest.headers.Cookie && { headers : { cookie: prevRequest.headers.Cookie}});
      const newAccessToken = response?.data?.accessToken;
      prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
