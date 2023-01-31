import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
	rentals: [],
	status: StoreState.EMPTY,
}

const rentals = [
	{
		'title': "2 Bedroom Hall Kitchen Apartment for rent",
		'price': 2000,
		'images': ['https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/76900a54-e2ed-435e-9dd4-6d9b702149cd.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/ae4fa65c-749d-41a7-920f-6956eab4c138.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/e12e3117-3e56-4f7c-888a-761165979e2d.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/8e3e4e55-83e1-4e03-b2f9-89c86b0bdcb9.webp'],
		'priceNegotiable': false,
		'hydroIncluded': false,
		'heatInclude': false,
		'waterIncluded': false,
		'wifiIncluded': false,
		'location': "7 Aragon Ave",
		'city': 'Toronto',
		'postedDate': '2022-12-27',
		'type': 'Basement',
		'bedrooms': 2,
		'bathrooms': 1,
		'parking': false,
		'agreementType': '1 Year',
		'moveInDate': '2023-01-01',
		'petFriendly': true,
		'size': '800sq ft',
		'furnished': false,
		'laundry': false,
		'dishwasher': false,
		'fridge': false,
		'airConditioning': false,
		'smoking': false,
		'description': "A perfect 2 bedroom apartment for students studying in Loyalist College",
	},
	{
		'title': "1 Bedroom Hall Kitchen Apartment for rent",
		'images': ['https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/63ea1b50-a3a1-4bea-a2f4-e5338e795807.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/e6f3dca3-ba8d-4e21-b02d-b905e038ecc8.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/24f8cb50-c017-44ed-ac4a-c6d6b0633e55.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/1bbe2c32-89e2-4027-bf52-c2a37bd30ba9.webp','https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/4851d25c-9755-433a-b0dd-d3ea6c1feae7.webp'],
		'price': 2000,
		'priceNegotiable': false,
		'hydroIncluded': false,
		'heatInclude': false,
		'waterIncluded': false,
		'wifiIncluded': false,
		'location': "7 Aragon Ave",
		'city': 'Scarborough',
		'postedDate': '2022-12-27',
		'type': 'Basement',
		'bedrooms': 2,
		'bathrooms': 1,
		'parking': false,
		'agreementType': '1 Year',
		'moveInDate': '2023-01-01',
		'petFriendly': true,
		'size': '800sq ft',
		'furnished': false,
		'laundry': false,
		'dishwasher': false,
		'fridge': false,
		'airConditioning': false,
		'smoking': false,
		'description': "A perfect 2 bedroom apartment for students studying in Loyalist College",
	}
]

const rentalsSlice = createSlice({
	name: 'rentals',
	initialState: initialState,
	reducers: {
		fetchRentals: (state) => {
			state.status = StoreState.LOADING;
			state.rentals = rentals;
		},
		fetchRentalsSuccess: (state, payload) => {
			state.rentals = payload;
			state.status = StoreState.READY;
		},
		fetchRentalsError: (state) => {
			state.status = StoreState.ERROR;
		}
	}
});

export const { fetchRentals, fetchRentalSuccess, fetchRentalsError } = rentalsSlice.actions;

export default rentalsSlice.reducer;

