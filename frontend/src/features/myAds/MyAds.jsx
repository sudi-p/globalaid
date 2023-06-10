import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import getClient from '../../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import { fetchMyAdsSuccess } from './MyAdsSlice';
import styles from './styles/MyAds.module.scss';
import { Stack } from '@mui/material';

export default function MyAds() {
    const myAds = useSelector(state => state.myAds)
    const dispatch = useDispatch();
    useEffect(() => {
        getClient()
            .get('/user/getmyads')
            .then(res => dispatch(fetchMyAdsSuccess(res.data)))
            .catch(err => console.log("hi", err))
    }, [])    
    const { ads, status } = myAds;
    return (
        <div className={styles.myAds}>
            MyAds
            {ads.map(ad => {
                console.log(ad)
                const { _id: adId, title, description, adType, isComplete, views, price, replies } = ad;
                console.log(adId)
                return (
                    <div key={adId} className={styles.ad}>
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
                       {!isComplete && <Link className={styles.completePostingAd} to={`/myads/create-ad/${adId}`}>Complete Ad</Link>}
                    </div>
                )
            })}
        </div>
    )
}
