import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../../constants/StoreState';

const CreateAdSlice = createSlice({
    name: 'CreateAdSlice',
    initialState: {
        adTitle: '',
        status: StoreState.EMPTY,
        adType: '',
    },
    reducers: {
        'fetchAdStart': (state) => {
            state.status = StoreState.LOADING;
        },
        'fetchAdSuccess': (state, action) => {
            const { adType, title } = action.payload;
            console.log(action.payload)
            state.adType = adType;
            state.adTitle = title
        },
        'clearFetchAd': (state) => {
            state.adTitle = '';
            state.adType = '';
            state.status = StoreState.EMPTY;
        }
    }
})

export default CreateAdSlice.reducer;
export const { fetchAdStart, fetchAdSuccess, clearFetchAd} = CreateAdSlice.actions;
