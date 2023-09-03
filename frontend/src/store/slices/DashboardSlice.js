import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
    rentals : [],
    jobs: [],
    status: StoreState.EMPTY
}
const rentals = [
    {
        id: "63f45ba2631adf1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        rent: 2500,
        image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/76900a54-e2ed-435e-9dd4-6d9b702149cd.webp",
    },
    {
        id: "63f45ba2631adfg1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        rent: 1000,
        image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/ae4fa65c-749d-41a7-920f-6956eab4c138.webp",
    },
    {
        id: "63f45ba2ertv1adf1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        rent: 3500,
        image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/e12e3117-3e56-4f7c-888a-761165979e2d.webp",
    },
    {
        id: "63f45ba234rfadf1b0a35b94f",
        title: "1 Bedroom Hall Kitchen Apartment for rent",
        rent: 2800,
        image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/8e3e4e55-83e1-4e03-b2f9-89c86b0bdcb9.webp",
    }
];
const jobs = [
    {
        id: "63f45ba2631adf1b0a35b94f",
        title: "Cleaner",
        salary: 16,
        location: "Toronto",
        description: "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
        jobType: "part-time"
    },
    {
        id: "63f45ba2631adfg1b0a35b94f",
        title: "Waiter",
        salary: 17,
        location: "Toronto",
        description: "This position is responsible for cleaning and sanitizing processing equipment in a safe manner.",
        jobType: "part-time"
    },
    {
        id: "63f45ba2ertv1adf1b0a35b94f",
        title: "Bairsta",
        salary: 20,
        location: "Toronto",
        description: "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
        jobType: "part-time"
    },
    {
        id: "63f45ba234rfadf1b0a35b94f",
        title: "Host",
        salary: 25,
        location: "Toronto",
        description: "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
        jobType: "part-time"
    }
];

const DashboardSlice = createSlice({
    name: 'Dashboard',
    initialState: initialState,
    reducers : {
        'fetchDashboardStart': (state, action) => {
            // const { data } = action.payload;
            state.rentals = rentals;
            state.jobs = jobs;
            state.status = StoreState.READY;
            return state
        }
    }
})

export const { fetchDashboardStart } = DashboardSlice.actions;
export default DashboardSlice.reducer;