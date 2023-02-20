import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState.js';

const initialState = {
    isLoggedIn: false,
    username: '',
    status: StoreState.EMPTY
};
const LoggedInUserSlice = createSlice({
    'name': "LoggedInUser",
    'initialState': initialState,
    'reducers': {
        'fetchUserStart': (state, action) => {
            state.isLoggedIn = false;
            state.username = '';
            state.status = StoreState.LOADING;
        },
        'fetchUserSuccess': (state, action) => {
            state.isLoggedIn = true;
            state.username = 'Sudip Paudel';
            state.status = StoreState.SUCCESS;
        },
        'fetchUserError': (state, action) => {
            state.isLoggedIn = false;
            state.username = '';
            state.status = StoreState.ERROR;
        },
    }
});

export default LoggedInUserSlice.reducer;
export const { fetchUserStart, fetchUserSuccess, fetchUserError } = LoggedInUserSlice.actions;