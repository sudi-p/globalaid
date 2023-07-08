import { configureStore } from '@reduxjs/toolkit';
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
    job: jobReducer,
    loggedInUser: loggedInUserReducer,
    createAd: createAdReducer,
    myAds: myAdsReducer,
    dashboard: DashboardReducer,
  }
});

export default store;