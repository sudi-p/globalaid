import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../utils/constants/StoreState.js';

type JobProps = {
	id: number,
	position: string,
	company: string,
	salary: string
}

export type JobSliceProps = {
	status: number,
	job: JobProps | null
}

const initialState: JobSliceProps = {
	status: StoreState.EMPTY,
	job: null,
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