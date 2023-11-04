import { axiosPrivate } from "@lib/api";
import { useContext, useEffect } from "react";
import { getAccessToken } from "@utils/cookie-utils";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken(); 
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            request => {
                if (!request.headers['Authorization']) {
                    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
                }
                return request;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
          axiosPrivate.interceptors.request.eject(requestIntercept);
          axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;