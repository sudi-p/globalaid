import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getClient from '../../../lib/api';
import { fetchAdSuccess, clearFetchAd } from './createAdSlice';
import CreateJob from './CreateJob';
import CreateRental from './CreateRental';
import styles from './styles/CreateAd.module.scss';

export default function CreateAd() {
    const params = useParams();
    const createAdData = useSelector(state => state.createAd)
    const dispatch = useDispatch();
    const { adId } = params;
    useEffect(() => {
        getClient()
            .get('/user/createad/', {
                params: {
                    adId: adId
                }
            })
            .then(res => dispatch(fetchAdSuccess(res.data.ad)))
            .catch(err => console.log(err))
        return() => {
            dispatch(clearFetchAd);
        }
    }, []);
    console.log(createAdData);
    const { adType, adTitle } = createAdData;
    let display = <div>Loading</div>;
    if (adType === "rent") display = <CreateRental adId={adId}/>
    if (adType === "job") display = <CreateJob adId={adId}/>
    return (
        <div className={styles.createAd}>
            <div className={styles.title}>{adTitle}</div>
            {display}
        </div>
    )
}
