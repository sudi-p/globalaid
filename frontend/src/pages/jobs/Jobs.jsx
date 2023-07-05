import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { fetchJobsStart, fetchJobsSuccess } from './JobsSlice';
import { Email, LocalPhone, LocationOnOutlined } from '@mui/icons-material/';
import getClient from '../../lib/api';
import styles from './styles/Jobs.module.scss';
import { Chip, Stack, Paper } from '@mui/material';
import Filter from './Filter';
import SearchBar from './SearchBar';
import PageNotFound from '../pagenotfound/PageNotFound';

function Jobs() {
  const jobs = useSelector(state => state.jobs)
  const dispatch = useDispatch();
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
        const res = await getClient().get('/user/getjobs/')
        dispatch(fetchJobsSuccess(res.data));
        return res.data;
      }
      catch (error) {
        return error
      }
    }
  });
  const { isLoading, error } = jobsQuery;
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <PageNotFound />
  return (
    <div className={styles.jobsContainer}>
      <Stack direction="row" spacing={2}>
        <Filter />
        <JobsList jobs={jobs.jobs} />
        {/* <ActiveJob {...activeJob}/> */}
      </Stack>
    </div>
  );
}

const JobsList = ({ jobs }) => {
  return (
    <Stack spacing={2} className={styles.content}>
      <SearchBar />
      <Paper elevation={0} variant="outlined" className={styles.jobsSection}>
        <Stack spacing={2} >
          {jobs && jobs.map(job => (<JobBox key={job._id} job={job} />))}
        </Stack>
      </Paper>
    </Stack>
  );
}

const JobBox = (props) => {
  const { job } = props;
  const { _id, description, title, company, location, email, phone } = job;
  return (
    <Paper variant="outlined" className={styles.jobBox}>
      <div className={styles.jobTitle}>{title}</div>
      <Stack sx={{ marginBottom: 2 }} direction="row" spacing={2}>
        <div className={styles.companyName}>{company}</div>
        {location && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={location}
            icon={<LocationOnOutlined />}
          />
        )}
      </Stack>
      <div className={styles.description}>{description}</div>
      <Stack direction="row" spacing={1}>
        {email && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={email}
            icon={<Email fontSize="small" />}
          />
        )}
        {phone && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={phone}
            icon={<LocalPhone />}
          />
        )}
      </Stack>
    </Paper>
  )
}

export default Jobs;
