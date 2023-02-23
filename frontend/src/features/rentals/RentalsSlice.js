import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
	rentals: [],
	status: StoreState.EMPTY,
}

const rentalsSlice = createSlice({
	name: 'rentals',
	initialState: initialState,
	reducers: {
		fetchRentalsStart: (state) => {
			state.status = StoreState.LOADING;
		},
		fetchRentalsSuccess: (state, action) => {
			const {payload} = action;
			console.log(payload);
			state.rentals = payload.rentals;
			state.status = StoreState.READY;
		},
		fetchRentalsError: (state) => {
			state.status = StoreState.ERROR;
		}
	}
});

export const { fetchRentalsStart, fetchRentalsSuccess, fetchRentalsError } = rentalsSlice.actions;

export default rentalsSlice.reducer;

