import { createSlice } from 'redux-toolkit';

const SnackBarSlice = createSlice({
    name: 'SnackBar',
    initialState: {'message': '', 'type':''},
    'reducers': {
        'addSnackBar' : (state, action) => {
            const { payload } = action
            state.message = payload.message
            state.type = payload.type
        }
    }
});

export const { addSnackBar } = SnackBarSlice.actions;
export default SnackBarSlice.reducer;