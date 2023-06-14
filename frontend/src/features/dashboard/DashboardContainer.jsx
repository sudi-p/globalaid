import React from 'react';
import Hero from './Hero';
import TopRentals from './TopRentals';
import TopJobs from './TopJobs';
// import { useDispatch, useSelector } from 'react-redux';

function DashboardContainer() {
  // const dispatch = useDispatch();
  // const rentals = useSelector(state => state.rentals);
  return (
    <div className="App">
      <Hero />
      <TopRentals />
      <TopJobs />
    </div>
  );
}

export default DashboardContainer;

