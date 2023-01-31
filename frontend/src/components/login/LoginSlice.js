import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../../constants/StoreState';

const initialState = {
    status: StoreState.EMPTY
}

const LoginSlice = createSlice({
    'name': 'LoginSlice',
    'initialState': initialState,
    'reducers': {
        'loginStart': (state) => {
            state.status = StoreState.LOADING;
            
        },
        'loginSuccess': (state, payload) => {
            state.status = StoreState.READY;
        },
        'loginFail': (state, payload) => {
            console.log(payload)
            state.status = StoreState.ERROR;
        }
    }
});

export default LoginSlice.reducer;
export const {loginStart, loginSuccess, loginFail } = LoginSlice.actions;