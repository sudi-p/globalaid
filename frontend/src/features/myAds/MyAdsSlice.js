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
        }
    }
})

export default MyAdsSlice.reducer;
export const { fetchMyAdsStart, fetchMyAdsSuccess } = MyAdsSlice.actions;