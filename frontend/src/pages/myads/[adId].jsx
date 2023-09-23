import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import getClient from "../../lib/api";

export default function MyAd() {
    const params = useParams();
    console.log(params.id)
    useEffect(() => {
        getClient()
            .get('/user/getad', {
                params:{
                    adId: params.id
                }
            })
            .then(res => console.log("hello", res))
            .catch(err => console.log("hi", err))
    }, [])
    return (
        <div>
            Hello this is ad
        </div>
    )
}
