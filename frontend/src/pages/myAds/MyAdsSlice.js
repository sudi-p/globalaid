import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
    'ads': [],
    'status': StoreState.EMPTY,
}

const MyAdsSlice = createSlice({
    'name': 'MyAdsSlice',
    initialState: initialState,
    reducers: {
        'fetchMyAdsStart': (state) => {
            state.status = StoreState.LOADING;
        },
        'fetchMyAdsSuccess': (state, action) => {
            const { ads } = action.payload;
            state.ads = ads;
            state.status = StoreState.READY;
        },
        'fetchMyAdsError': (state) => {
            state.status = StoreState.ERROR;
        },
    }
})

export default MyAdsSlice.reducer;
export const { fetchMyAdsStart, fetchMyAdsSuccess, fetchMyAdsError } = MyAdsSlice.actions;