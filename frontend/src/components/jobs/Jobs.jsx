import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchJobs } from './JobsSlice';
import styles from './styles/Jobs.module.scss';

function App() {
  const dispatch = useDispatch();
  const jobsData = useSelector(state => state.jobs);
  const { jobs, status } = jobsData;
  useEffect(() => {
    dispatch(fetchJobs());
  },[]);
  return (
    <div className={styles.jobsContainer}>
      <div className={styles.jobsTitle}>
        Jobs
      </div>
      <div className={styles.jobsSection}>
        {jobs && jobs.map(job => {
          const { id, position, company, salary } = job;
          return(
            <NavLink to={`/jobs/job/${id}`} className={styles.job}>
              {job.position}
            </NavLink>
          )
        })}
       </div>
    </div>
  );
}

export default App;
