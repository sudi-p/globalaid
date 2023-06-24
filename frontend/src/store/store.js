import { configureStore } from '@reduxjs/toolkit';
import rentalsReducer from '../pages/rentals/RentalsSlice';
import jobsReducer from '../pages/jobs/JobsSlice';
import jobReducer from '../pages/jobs/job/JobSlice';
import createAdReducer from '../pages/myAds/createAd/createAdSlice';
import loggedInUserReducer from '../layout/navBarLayout/LoggedInUserSlice';
import myAdsReducer from '../pages/myAds/MyAdsSlice';
import DashboardReducer  from '../pages/dashboard/DashboardSlice';

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
    myAds: myAdsReducer,
    dashboard: DashboardReducer,
  }
});

export default store;