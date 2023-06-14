import React from 'react';
import {
    Paper,
    Stack,
    Button
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './styles/TopJobs.module.scss';

export default function TopJobs() {
    const jobs = [
        {
            id: "63f45ba2631adf1b0a35b94f",
            title: "Cleaner",
            salary: 16,
            location: "Toronto",
            description: "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
            jobType: "part-time"
        },
        {
            id: "63f45ba2631adfg1b0a35b94f",
            title: "Waiter",
            salary: 17,
            location: "Toronto",
            description: "This position is responsible for cleaning and sanitizing processing equipment in a safe manner.",
            jobType: "part-time"
        },
        {
            id: "63f45ba2ertv1adf1b0a35b94f",
            title: "Bairsta",
            salary: 20,
            location: "Toronto",
            description: "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
            jobType: "part-time"
        },
        {
            id: "63f45ba234rfadf1b0a35b94f",
            title: "Host",
            salary: 25,
            location: "Toronto",
            description: "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
            jobType: "part-time"
        }
    ]
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
