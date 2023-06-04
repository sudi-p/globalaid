import { configureStore } from '@reduxjs/toolkit';
import rentalsReducer from '../features/rentals/RentalsSlice';
import jobsReducer from '../features/jobs/JobsSlice';
import jobReducer from '../features/jobs/job/JobSlice';
import createAdReducer from '../features/myAds/createAd/createAdSlice';
import loggedInUserReducer from '../features/layout/navBarLayout/LoggedInUserSlice';
import myAdsReducer from '../features/myAds/MyAdsSlice';

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
    createAd: createAdReducer,
    myAds: myAdsReducer
  }
});

export default store;