import { configureStore } from '@reduxjs/toolkit';
import rentalsReducer from '../components/rentals/RentalsSlice';
import jobsReducer from '../components/jobs/JobsSlice';
import jobReducer from '../components/jobs/job/JobSlice';
import loginReducer from '../components/login/LoginSlice';

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
  }
});

export default store;