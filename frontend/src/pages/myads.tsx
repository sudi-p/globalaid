import React, { useContext, lazy, ReactElement } from 'react';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import NavbarLayout from '@components/layout/navBarLayout';
const PageNotFound = lazy(() => import('./404'));
import { axiosPrivate } from '../lib/api';
import styles from '@styles/MyAds.module.scss';
import { useQuery } from '@tanstack/react-query';
import AuthContext from '@context/AuthProvider';

export default function MyAdsContainer() {
    const { auth } = useContext(AuthContext);
    if (!auth?.user?.email) return <PageNotFound />
    const myAdsQuery = useQuery({
        queryKey: ['rentals'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/user/getmyads')
            return res.data
        }
    });
    const { isLoading, error, data } = myAdsQuery;

    if (isLoading) return "Loading.."
    if (error) return <PageNotFound />
    const { ads } = data;
    return <MyAds ads={ads} />
}
MyAdsContainer.getLayout = function getLayout(page: ReactElement) {
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
            {ads?.map(ad => (<MyAd key={ad._id} ad={ad} />))}
        </div>
    )
}

function MyAd({ ad }: { ad: Ad }) {
    const { _id: adId, title, description, adType, isComplete, views, price, replies } = ad;
    return (
        <div className={styles.ad}>
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