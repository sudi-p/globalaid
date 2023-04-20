import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../../constants/StoreState.js';

const initialState = {
    isLoggedIn: false,
    email: '',
    _id: '',
    status: StoreState.EMPTY
};
const LoggedInUserSlice = createSlice({
    'name': "LoggedInUser",
    'initialState': initialState,
    'reducers': {
        'fetchUserStart': (state, action) => {
            state.isLoggedIn = false;
            state.email = '';
            state._id = '';
            state.status = StoreState.LOADING;
        },
        'fetchUserSuccess': (state, action) => {
            const { payload } = action;
            const { email, _id } = payload;
            state.isLoggedIn = true;
            state.email = email;
            state._id = _id;
            state.status = StoreState.SUCCESS;
        },
        'clearLoggedInUser': (state, action) => {
            state.isLoggedIn = false;
            state.email = '';
            state._id = '';
            state.status = StoreState.SUCCESS;
        },
    }
});

export default LoggedInUserSlice.reducer;
export const { fetchUserStart, fetchUserSuccess, clearLoggedInUser } = LoggedInUserSlice.actions;