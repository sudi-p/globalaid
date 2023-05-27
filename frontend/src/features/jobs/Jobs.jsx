import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsStart, fetchJobsSuccess } from './JobsSlice';
import { Email, LocalPhone, LocationOnOutlined } from '@mui/icons-material/';
import getClient from '../../lib/api';
import styles from './styles/Jobs.module.scss';
import { Chip, Stack, Paper } from '@mui/material';
import Filter from './Filter';
import SearchBar from './SearchBar';

function Jobs() {
  const dispatch = useDispatch();
  const jobsData = useSelector(state => state.jobs);
  const { jobs, status } = jobsData;
  const [activeJob, setActiveJob] = useState({})
  useEffect(() => {
    getJobs();
  },[]);

  const getJobs = async () => {
    dispatch(fetchJobsStart());
    try{
      const res = await getClient().get('/user/getjobs/');
      dispatch(fetchJobsSuccess(res.data))
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={styles.jobsContainer}>
      {/* <div className={styles.jobsTitle}>
        Jobs
      </div>
      <div onClick={() => setShowCreateJobModal(true)} className={styles.createJob}>Create Job</div>
      {showCreateJobModal && (
      <Modal>
        <CreateJob setShowCreateJobModal={setShowCreateJobModal}/>
      </Modal>
      )} */}
      <Stack direction="row" spacing={2}>
        <Filter/>
        <JobsList jobs={jobs} setActiveJob={setActiveJob}/>
        {/* <ActiveJob {...activeJob}/> */}
      </Stack>
    </div>
  );
}

const JobsList = ({jobs, setActiveJob}) =>{
  return (
    <Stack spacing={2} className={styles.content}>
        <SearchBar />
        <Paper elevation={0} variant="outlined" className={styles.jobsSection}>
          <Stack spacing={2} >
            {jobs && jobs.map(job => (<JobBox key={job._id} setActiveJob={setActiveJob} job={job} />))}
          </Stack>
        </Paper>
      </Stack>
  );
}

const JobBox = (props) => {
  const { job, setActiveJob } = props;
  const { _id, description, title, company, location, email, phone } = job;
  return (
    <Paper variant="outlined" onClick={() => setActiveJob(job)} className={styles.jobBox}>
        <div className={styles.jobTitle}>{title}</div>
        <Stack sx={{marginBottom: 2}} direction="row" spacing={2}>
          <div className={styles.companyName}>{company}</div>
          {location && (
            <Chip
              color="primary"
              size="small"
              variant="outlined"
              label={location}
              icon={<LocationOnOutlined/>}
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
              icon={<Email fontSize="small"/>}              
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
