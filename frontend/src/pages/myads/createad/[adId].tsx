import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import getClient from '../../../lib/api';
import { fetchAdSuccess, clearFetchAd } from '@store/slices/createAdSlice';
import NavbarLayout from '@components/layout/navBarLayout';
import CreateJob from '../../../components/create-ad/CreateJob';
import CreateRental from '../../../components/create-ad/CreateRental';
import { RootState } from '@store/store';

export default function CreateAd() {
    const router = useRouter();
    const { query } = router;
    const { adId } = query;
    const createAdData = useSelector((state: RootState) => state.createAd)
    const dispatch = useDispatch();
    useEffect(() => {
        getClient()
            .get('/user/createad/', {
                params: { adId: adId }
            })
            .then((res: AxiosResponse) => dispatch(fetchAdSuccess(res.data.ad)))
            .catch((err: AxiosError) => console.log(err))
        return() => {
            dispatch(clearFetchAd);
        }
    }, []);
    const { adType, adTitle } = createAdData;
    let display = <div>Loading</div>;
    if (adType === "rent") display = <CreateRental adId={adId}/>
    if (adType === "job") display = <CreateJob adId={adId}/>
    return (
        <div className="w-[700px] p-5 m-auto">
            <div className="text-green-500 text-center text-3xl mt-3 mb-10 tracking-wide uppercase leading-tight">{adTitle}</div>
            {display}
        </div>
    )
}

CreateAd.getLayout = function getLayout(page){
    return <NavbarLayout>{page}</NavbarLayout>
}