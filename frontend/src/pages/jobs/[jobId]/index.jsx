import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Job.module.scss';
import { fetchJobStart } from '@store/slices/JobSlice';

const Job = (props) => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jobData = useSelector((state) => state.job)
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
			<div onClick={() => goBack()} className="cursor-pointer width-max p-2 text-white">
				Back
			</div>
			Job Page
			<div className="font-bold">
				{position}
			</div>
		</div>
	)
}

export default Job;
