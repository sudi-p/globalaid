import { configureStore } from '@reduxjs/toolkit';
import rentalsReducer from '../features/rentals/RentalsSlice';
import jobsReducer from '../features/jobs/JobsSlice';
import jobReducer from '../features/jobs/job/JobSlice';
import loginReducer from '../features/login/LoginSlice';
import loggedInUserReducer from '../features/navBar/LoggedInUserSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });


const store = configureStore({
  reducer: {
    rentals: rentalsReducer,
    jobs: jobsReducer,
    job: jobReducer,
    login: loginReducer,
    loggedInUser: loggedInUserReducer,
  }
});

export default store;