import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchJobsStart, fetchJobsSuccess } from './JobsSlice';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import getClient from '../../lib/api';
import Modal from '../../components/modal/Modal';
import CreateJob from './createJob/CreateJob';
import styles from './styles/Jobs.module.scss';

function App() {
  const dispatch = useDispatch();
  const [ showModal, setShowModal] = useState(false);
  const jobsData = useSelector(state => state.jobs);
  const { jobs, status } = jobsData;
  useEffect(() => {
    dispatch(fetchJobsStart());
    getClient()
    .get('/user/getjobs/')
    .then(res => dispatch(fetchJobsSuccess(res.data)))
    .catch(err=> console.log(err.message))
  },[]);
  return (
    <div className={styles.jobsContainer}>
      <div className={styles.jobsTitle}>
        Jobs
      </div>
      <div onClick={() => setShowModal(true)} className={styles.createJob}>Create Job</div>
      {showModal && (
      <Modal>
        <CreateJob setShowModal={setShowModal}/>
      </Modal>
      )}
      <div className={styles.jobsSection}>
        {jobs && jobs.map(job => (<JobBox job={job} />))}
       </div>
    </div>
  );
}

const JobBox = (props) => {
  const { job } = props;
  const { _id, description, title, company, location, email, phone } = job;
  return (
    <div className={styles.jobBox}>
        <div> <strong>{title}</strong> | {company}</div>
        {location}
        <div>Role & Responsibilities: {description}</div>
        <div className={styles.jobBoxFooter}>{email && (<><EmailIcon />&nbsp;{email} &nbsp;</>)} {phone && email && " | "} {phone && (<> &nbsp;<PhoneIcon />&nbsp;{phone}</>)}</div>
    </div>
  )
}

export default App;
