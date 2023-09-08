import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StoreState from '../../utils/constants/StoreState.js';

export type LoggedInUserProps ={
    isLoggedIn: boolean,
    email: string,
    _id: string,
    status: number
  }

const initialState: LoggedInUserProps = {
    isLoggedIn: false,
    email: '',
    _id: '',
    status: StoreState.EMPTY
};
const LoggedInUserSlice = createSlice({
    'name': "LoggedInUser",
    'initialState': initialState,
    'reducers': {
        'fetchUserStart': (state) => {
            state.isLoggedIn = false;
            state.email = '';
            state._id = '';
            state.status = StoreState.LOADING;
        },
        'fetchUserSuccess': (state, action: PayloadAction<LoggedInUserProps>) => {
            const { payload } = action;
            const { email, _id } = payload;
            state.isLoggedIn = true;
            state.email = email;
            state._id = _id;
            state.status = StoreState.READY;
        },
        'clearLoggedInUser': (state, action) => {
            state.isLoggedIn = false;
            state.email = '';
            state._id = '';
            state.status = StoreState.READY;
        },
    }
});

export default LoggedInUserSlice.reducer;
export const { fetchUserStart, fetchUserSuccess, clearLoggedInUser } = LoggedInUserSlice.actions;