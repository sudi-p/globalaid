import React, { useEffect, lazy } from 'react';
import getClient from '../../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyAdsSuccess, fetchMyAdsError } from '../../store/slices/MyAdsSlice';
import storeState from 'utils/constants/StoreState.js';
const PageNotFound = lazy(() => import('../404'));
import NavbarLayout from 'layout/navBarLayout';
const MyAds = lazy(()=> import('./MyAds'));

export default function MyAdsContainer() {
    const myAds = useSelector(state => state.myAds)
    const dispatch = useDispatch();
    useEffect(() => {
        getClient()
            .get('/user/getmyads')
            .then(res => dispatch(fetchMyAdsSuccess(res.data)))
            .catch(err => dispatch(fetchMyAdsError(err)))
    }, [])    
    const { ads, status } = myAds;
    if (status === storeState.READY) return <MyAds ads={ads} />
    else if (status === storeState.ERROR) return <PageNotFound />
    return "Loading.."
}
MyAdsContainer.getLayout = function getLayout(page){
    return <NavbarLayout>{page}</NavbarLayout>
}