import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState.js';

const initialState = {
	jobs: [],
};


const JobsSlice = createSlice({
	name: 'jobs',
	initialState: initialState,
	reducers:{
		fetchJobsSuccess: (state, action) => {
			const { payload } = action;
			state.status = StoreState.SUCCESS;
			state.jobs = payload.jobs;
		}
	}
})

export default JobsSlice.reducer;
export const {fetchJobsSuccess } = JobsSlice.actions;