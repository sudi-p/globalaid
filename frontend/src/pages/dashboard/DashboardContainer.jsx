import React, { useEffect } from 'react';
import Hero from './Hero';
import TopRentals from './TopRentals';
import { fetchDashboardStart } from './DashboardSlice';
import TopJobs from './TopJobs';
import { useDispatch, useSelector } from 'react-redux';

function DashboardContainer() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(state => state.dashboard);
  const { rentals, jobs } = dashboardData;
  useEffect(()=> {
    dispatch(fetchDashboardStart())
  }, [])
  return (
    <div className="App">
      <Hero />
      <TopRentals rentals={rentals}/>
      <TopJobs jobs={jobs} />
    </div>
  );
}

export default DashboardContainer;

