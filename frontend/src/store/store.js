import { configureStore } from '@reduxjs/toolkit';
import rentalsReducer from '../features/rentals/RentalsSlice';
import jobsReducer from '../features/jobs/JobsSlice';
import jobReducer from '../features/jobs/job/JobSlice';
import loggedInUserReducer from '../features/layout/navBarLayout/LoggedInUserSlice';

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
    loggedInUser: loggedInUserReducer,
  }
});

export default store;