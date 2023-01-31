import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './styles/Job.module.scss';
import { fetchJobStart } from './JobSlice';

const Job = (props) => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jobData = useSelector((state) => state.job)
	// const location = useLocation();

	console.log(jobData);
	useEffect(
		() => {
			dispatch(fetchJobStart());
		}, [])
	const goBack= function(){
		navigate(-1)
	}
	const {status, job} = jobData;
	const { id, position, company, salary } = job;
	return(
		<div className={styles.job}>
			<div onClick={() => goBack()} className={styles.goBack}>
				Back
			</div>
			Job Page
			<div className={styles.position}>
				{position}
			</div>
		</div>
	)
}

export default Job;
