import { createSlice } from '@reduxjs/toolkit';
import StoreState from '@utils/constants/StoreState';

type RentalProps = {
	title: string;
	price: string;
	priceNegotiable: string;
	description: string;
	hydroIncluded: string;
	heatIncluded: string;
	waterIncluded: string;
	wifiIncluded: string;
	postedDate: string;
	bedrooms: string;
	bathrooms: string;
	images: string;
	moveInDate: string;
	location: string;
	type: string;
	city: string;
	parking: string;
	agreementType: string;
	petFriendly: string;
	size: string;
	furnished: string;
	laundry: string;
	dishwasher: string;
	fridge: string;
	airConditioning: string;
	smoking: string;
}

export type RentalSliceProps = {
	status: number,
	rentals: RentalProps[]
}

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
			const { payload } = action;
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

