import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { axiosPrivate } from "../../lib/api";
import { AxiosError, AxiosResponse } from 'axios';

export default function MyAd() {
    const router = useRouter();
    const { query } = router;
    const { adId } = query;
    useEffect(() => {
        const res = axiosPrivate.get('/user/getad', {
            params: {
                adId: adId
            }
        })
    }, [])
    return (
        <div>
            Hello this is ad
        </div>
    )
}
