import axios from "axios";
import { addAuthToStorage } from "@utils/cookie-utils";

let BASE_URL = "https://www.onlineglobalaid.com/api";
if (process.env.NODE_ENV !== "production") {
  BASE_URL = "http://server:3001/api";
}
if (process.env.IN_DOCKER) {
  BASE_URL = "http://server:3001/api";
}
console.log("Hello", process.env.NODE_ENV, process.env.IN_DOCKER);
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: BASE_URL,
  timeout: 35000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (error.message === "Network Error") {
      return new Error("Network Error");
    }
    if (error?.response?.status === 306 && !originalConfig._retry) {
      return axiosInstance;
    }
    if (error?.response?.status === 403 && !originalConfig?._retry) {
      originalConfig._retry = true;
      // the cookie is not being sent just only by setting withCredentials: true
      // const res = await axiosPrivate.post(`/auth/refresh/`,{}, { withCredentials: true })
      const res = await axiosPrivate.post(
        `/auth/refresh/`,
        {},
        originalConfig.headers.Cookie && {
          headers: { cookie: originalConfig.headers.Cookie },
          withCredentials: true,
        }
      );
      // we
      const user = res?.data?.user;
      addAuthToStorage(user);
      return axiosPrivate(originalConfig);
    }
    return Promise.reject(error);
  }
);
