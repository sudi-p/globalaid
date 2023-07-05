import React from 'react';
import {
    Paper,
    Stack,
    Button
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './styles/TopJobs.module.scss';

export default function TopJobs({jobs}) {
    
    return (
        <Paper className={styles.topBoxContainer}>
            <div className={styles.topBox}>
                <Stack className={styles.topBoxTitle} direction="row" justifyContent="space-between">
                    <div>Top Jobs</div>
                    <NavLink to="/jobs/" className={styles.topBoxViewMore}>View More</NavLink>
                </Stack>
                <Stack spacing={3} direction="row" justifyContent="center">
                    {jobs.map(job => (<JobCard key={job.id} {...job} />))}
                </Stack>
            </div>
        </Paper>
    )
}

function JobCard({ title, location, jobType, salary, description }) {
    return (
        <Paper elevation={3} className={styles.jobCard}>
            <Stack spacing={3} direction="row">
                <div className={styles.titleLocation}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.location}>{location} | {jobType}</span>
                </div>
                <div className={styles.salary}>${salary}/Hour</div>
            </Stack>
            <p className={styles.description}>{description}</p>
            <Stack justifyContent={"flex-end"}>
                <Button size="small" variant="outlined"> Learn More</Button>
            </Stack>
        </Paper>
    )
}
