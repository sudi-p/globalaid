import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
	jobs: [],
	status: StoreState.EMPTY,
};

const jobExample = [{
	'id': 1,
	'position': 'Line Cook',
	'company': 'Wendys',
	'salary': '17'
}];
const JobsSlice = createSlice({
	name: 'jobs',
	initialState: initialState,
	reducers:{
		fetchJobs: (state) => {
			state.status = StoreState.LOADING;
			state.jobs = jobExample;
		},
		fetchJobsSuccess: (state, action) => {
			const { payload } = action;
			state.status = StoreState.SUCCESS;
			state.jobs = payload;
		}
	}
})

export default JobsSlice.reducer;
export const {fetchJobs, fetchJobsSuccess } = JobsSlice.actions;