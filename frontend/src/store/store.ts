import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer, { LoggedInUserProps } from './slices/LoggedInUserSlice';

export type RootState = {
  loggedInUser: LoggedInUserProps,
}

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
  }
});
export default store;
