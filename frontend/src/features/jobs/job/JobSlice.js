import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../../constants/StoreState';

const initialState = {
	status: StoreState.Empty,
	job: {},
}

const sampleJob = {
	'id': 1,
	'position': 'Line Cook',
	'company': 'Wendys',
	'salary': '17'
}

const JobSlice = createSlice({
	'name': 'Job',
	'initialState': initialState,
	'reducers': {
		'fetchJobStart': (state)=> {
			state.status= StoreState.LOADING;
			state.job = sampleJob;
		}
	}

});

export default JobSlice.reducer;
export const { fetchJobStart } = JobSlice.actions;