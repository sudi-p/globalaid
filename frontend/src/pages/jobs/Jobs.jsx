import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Email, LocalPhone, LocationOnOutlined } from '@mui/icons-material/';
import getClient from '../../lib/api';
import styles from './styles/Jobs.module.scss';
import { Chip, Stack, Paper } from '@mui/material';
import Filter from './Filter';
import SearchBar from './SearchBar';
import PageNotFound from '../pagenotfound/PageNotFound';

function Jobs() {
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await getClient().get('/user/getjobs/')
      return res.data;
    }
  });
  const { isLoading, error, data } = jobsQuery;
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <PageNotFound />
  return (
    <div className={styles.jobsContainer}>
      <Stack direction="row" spacing={"20px"}>
        <Filter />
        <JobsList jobs={data.ads} />
      </Stack>
    </div>
  );
}

const JobsList = ({ jobs }) => {
  return (
    <Stack spacing={"20px"} className={styles.content}>
      <SearchBar />
      <Paper elevation={0} variant="outlined" className={styles.jobsSection}>
        <Stack direction="row" flexWrap={"wrap"} gap="15px">
          {jobs && jobs.map(job => (<JobBox key={job._id} job={job} />))}
          {jobs && jobs.map(job => (<JobBox key={job._id} job={job} />))}
          {jobs && jobs.map(job => (<JobBox key={job._id} job={job} />))}
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
    <div key={_id} variant="outlined" className={`w-76 p-5  ${styles.jobBox}`}>
      <div className="flex items-end mb-3.5">
        <div className="text-xl font-bold">{title}</div> | 
        <div className="hover:text-green-400">{company}</div>
      </div>
      {location && (
        <Chip
          color="primary"
          size="small"
          variant="outlined"
          label={location}
          icon={<LocationOnOutlined />}
        />
      )}
      <div className="my-2.5 truncate">{description}</div>
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
    </div>
  )
}

export default Jobs;
