import axios from 'axios';

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