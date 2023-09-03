import React, { ReactElement } from 'react';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import styles from './styles/MyAds.module.scss';

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

export default function MyAds({ ads }: MyAdsProps) {
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
            {!isComplete && <Link className={styles.completePostingAd} href={`/myads/create-ad/${adId}`}>Complete Ad</Link>}
        </div>
    )
}
