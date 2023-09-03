import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/JobSlice';
import createAdReducer from './slices/createAdSlice';
import loggedInUserReducer from './slices/LoggedInUserSlice';
import myAdsReducer from './slices/MyAdsSlice';
import DashboardReducer  from './slices/DashboardSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });


// const store = configureStore({
//   reducer: {
//     job: jobReducer,
//     loggedInUser: loggedInUserReducer,
//     createAd: createAdReducer,
//     myAds: myAdsReducer,
//     dashboard: DashboardReducer,
//   }
// });

const store = configureStore({
    reducer: {
      loggedInUser: loggedInUserReducer,
      dashboard: DashboardReducer,
      job: jobReducer,
      createAd: createAdReducer,
      myAds: myAdsReducer,
    }
  });


export default store;