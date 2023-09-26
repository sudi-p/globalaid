import React, { ReactNode, useEffect } from 'react';
import NavbarLayout from '@components/layout/navBarLayout/';
import Hero from '../components/dashboard/Hero';
import TopRentals from '../components/dashboard/TopRentals';
import TopJobs from '../components/dashboard/TopJobs';
import { fetchDashboardStart } from '../store/slices/DashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';

export default function DashboardContainer() {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state: RootState) => state.dashboard);
  const { rentals, jobs } = dashboardData;
  useEffect(()=> {
    dispatch(fetchDashboardStart())
  }, [])
  return (
    <div>
      <Hero />
      <TopRentals rentals={rentals}/>
      <TopJobs jobs={jobs} />
    </div>
  );
}

DashboardContainer.getLayout = function getLayout(page: ReactNode){
  return <NavbarLayout>{page}</NavbarLayout>
}