import React, { useEffect, lazy, ReactElement } from 'react';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import styles from '@styles/MyAds.module.scss';
import getClient from '../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyAdsSuccess, fetchMyAdsError } from '../store/slices/MyAdsSlice';
import storeState from 'utils/constants/StoreState.js';
import NavbarLayout from '@components/layout/navBarLayout';
import { AxiosResponse, AxiosError } from 'axios';
import { RootState } from '@store/store';
const PageNotFound = lazy(() => import('./404'));

export default function MyAdsContainer() {
    const myAds = useSelector((state: RootState) => state.myAds)
    const dispatch = useDispatch();
    useEffect(() => {
        getClient()
            .get('/user/getmyads')
            .then((res: AxiosResponse) => dispatch(fetchMyAdsSuccess(res.data)))
            .catch((err: AxiosError) => dispatch(fetchMyAdsError(err)))
    }, [])    
    const { ads, status } = myAds;
    if (status === storeState.READY) return <MyAds ads={ads} />
    else if (status === storeState.ERROR) return <PageNotFound />
    return "Loading.."
}
MyAdsContainer.getLayout = function getLayout(page){
    return <NavbarLayout>{page}</NavbarLayout>
}

interface Ad {
    _id: string;
    title: string;
    description: string;
    adType: string;
    isComplete: boolean;
    views: number;
    price: number;
    replies: number;
}

interface MyAdsProps {
    ads: Ad[];
  }

function MyAds({ ads }: MyAdsProps) {
    return (
        <div className={styles.myAds}>
            MyAds
            {ads.map(ad => (<MyAd key={ad._id} ad={ad}/>))}
        </div>
    )
}

function MyAd({ad}: {ad: Ad}){
    const { _id: adId, title, description, adType, isComplete, views, price, replies } = ad;
    return(
        <div  className={styles.ad}>
            <Stack direction={"row"} alignItems="center" spacing={1}>
                <span className={styles.adIcon}>
                    {adType === "rent" ? <HomeIcon fontSize="inherit" /> : <EngineeringIcon fontSize="inherit" />}
                </span>
                <div>
                    <div className={styles.adTitle}>
                        {title}
                    </div>
                    <div className={styles.adDescription}>
                        {description}
                    </div>
                    <div className={styles.adTitle}>
                        Views
                    </div>
                    <div className={styles.adDescription}>
                        Replies
                    </div>
                </div>
            </Stack>
            {!isComplete && <Link className={styles.completePostingAd} href={`/myads/createad/${adId}`}>Complete Ad</Link>}
        </div>
    )
}