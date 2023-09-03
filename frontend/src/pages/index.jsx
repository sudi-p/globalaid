import React, { useEffect } from 'react';
import NavbarLayout from '../layout/navBarLayout/';
import Hero from '../features/dashboard/Hero';
import TopRentals from '../features/dashboard/TopRentals';
import TopJobs from '../features/dashboard/TopJobs';
import { fetchDashboardStart } from '../store/slices/DashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardContainer() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(state => state.dashboard);
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

DashboardContainer.getLayout = function getLayout(page){
  return <NavbarLayout>{page}</NavbarLayout>
}