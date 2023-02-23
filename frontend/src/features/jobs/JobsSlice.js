import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
	jobs: [],
	status: StoreState.EMPTY,
};


const JobsSlice = createSlice({
	name: 'jobs',
	initialState: initialState,
	reducers:{
		fetchJobsStart: (state) => {
			state.status = StoreState.LOADING;
		},
		fetchJobsSuccess: (state, action) => {
			const { payload } = action;
			console.log(payload)
			state.status = StoreState.SUCCESS;
			state.jobs = payload.jobs;
		}
	}
})

export default JobsSlice.reducer;
export const {fetchJobsStart, fetchJobsSuccess } = JobsSlice.actions;