import { configureStore } from '@reduxjs/toolkit';
import jobReducer, { JobSliceProps } from './slices/JobSlice';
import createAdReducer, { CreateAdSliceProps } from './slices/createAdSlice';
import loggedInUserReducer, { LoggedInUserProps } from './slices/LoggedInUserSlice';
import myAdsReducer, { MyAdsSliceProps } from './slices/MyAdsSlice';
import DashboardReducer, { DashboardProps } from './slices/DashboardSlice';

export type RootState = {
  loggedInUser: LoggedInUserProps,
  dashboard: DashboardProps,
  job: JobSliceProps,
  createAd: CreateAdSliceProps,
  myAds: MyAdsSliceProps
}

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
