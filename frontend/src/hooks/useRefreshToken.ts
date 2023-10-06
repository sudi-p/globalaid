import axios from '@lib/api';
import useAuth from './useAuth';
import { AuthProps } from '@context/AuthProvider';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth((prev: AuthProps) => {
            const { user, accessToken}= response?.data;
            return { ...prev, accessToken, user }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;