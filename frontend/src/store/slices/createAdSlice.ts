import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../utils/constants/StoreState';

export type CreateAdSliceProps = {
    adTitle: string;
    status: number;
    adType: string;
}
const initialState: CreateAdSliceProps = {
    adTitle: '',
    status: StoreState.EMPTY,
    adType: '',
}

const CreateAdSlice = createSlice({
    name: 'CreateAdSlice',
    initialState,
    reducers: {
        'fetchAdStart': (state) => {
            state.status = StoreState.LOADING;
        },
        'fetchAdSuccess': (state, action) => {
            const { adType, title } = action.payload;
            state.adType = adType;
            state.adTitle = title;
        },
        'clearFetchAd': (state) => {
            state.adTitle = '';
            state.adType = '';
            state.status = StoreState.EMPTY;
        }
    }
})

export default CreateAdSlice.reducer;
export const { fetchAdStart, fetchAdSuccess, clearFetchAd } = CreateAdSlice.actions;
