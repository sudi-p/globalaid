import React, { useEffect} from 'react';
import { useRouter } from 'next/router';
import getClient from "../../lib/api";
import { AxiosError, AxiosResponse } from 'axios';

export default function MyAd() {
    const router = useRouter();
    const { query } = router;
    const { adId } = query;
    console.log(adId)
    useEffect(() => {
        getClient()
            .get('/user/getad', {
                params:{
                    adId: adId
                }
            })
            .then((res: AxiosResponse) => console.log("hello", res))
            .catch((err: AxiosError) => console.log("hi", err))
    }, [])
    return (
        <div>
            Hello this is ad
        </div>
    )
}
