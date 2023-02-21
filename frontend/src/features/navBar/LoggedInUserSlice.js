import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState.js';

const initialState = {
    isLoggedIn: false,
    email: '',
    status: StoreState.EMPTY
};
const LoggedInUserSlice = createSlice({
    'name': "LoggedInUser",
    'initialState': initialState,
    'reducers': {
        'fetchUserStart': (state, action) => {
            state.isLoggedIn = false;
            state.email = '';
            state.status = StoreState.LOADING;
        },
        'fetchUserSuccess': (state, action) => {
            const { payload } = action;
            const { email } = payload;
            state.isLoggedIn = true;
            state.email = email;
            state.status = StoreState.SUCCESS;
        },
        'fetchUserError': (state, action) => {
            state.isLoggedIn = false;
            state.email = '';
            state.status = StoreState.ERROR;
        },
    }
});

export default LoggedInUserSlice.reducer;
export const { fetchUserStart, fetchUserSuccess, fetchUserError } = LoggedInUserSlice.actions;