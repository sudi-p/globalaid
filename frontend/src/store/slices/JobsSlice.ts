import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../utils/constants/StoreState.js';

const initialState = {
	status: StoreState.EMPTY,
	jobs: [],
};

const JobsSlice = createSlice({
	name: 'jobs',
	initialState: initialState,
	reducers:{
		fetchJobsSuccess: (state, action) => {
			const { payload } = action;
			state.status = StoreState.READY;
			state.jobs = payload.jobs;
		}
	}
})

export default JobsSlice.reducer;
export const {fetchJobsSuccess } = JobsSlice.actions;