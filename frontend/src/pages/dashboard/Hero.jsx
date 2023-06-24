import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./styles/Hero.module.scss";
import {
    Paper,
    Stack
} from '@mui/material';

export default function Hero() {
    let [showRentalHero, setShowRentalHero] = useState(false)
    const intervalId = setTimeout(() => {
        setShowRentalHero(!showRentalHero)
    }, 4000)
    useEffect(()=> {
        return clearTimeout(intervalId)
    }, [])
    return (
        <Paper className={styles.heroContainer}>
            <div className={styles.hero}>
                {showRentalHero ? <RentalHero /> : <JobHero />}
            </div>
        </Paper>
    )
}

function RentalHero() {
    return (
        <>
            <Stack spacing={6} justifyContent={"center"} alignItems={"center"} direction="row">
                <div className={styles.heroText}>
                    <p>Creating a Safe and Welcoming Environment</p>
                    <p>Explore Accommodation Options for International Students</p>
                    <NavLink to="/rentals/" className={styles.viewMoreLink}>View More</NavLink>
                </div>
                <div className={styles.heroJobImage} style={{ backgroundImage: "url('https://media.istockphoto.com/id/1312439845/photo/stylish-living-room-interior-with-beautiful-house-plants.jpg?s=612x612&w=0&k=20&c=sUt6jSb1_MZFfymyFmuprGYmtz5XRoGtC2lUsnSr_y4=')"}}/>
            </Stack>
        </>
    )
}


function JobHero() {
    return (
        <>
            <Stack spacing={6} justifyContent={"center"} alignItems={"center"} direction="row">
                <div className={styles.heroText}>
                    <p>Supporting Your Journey</p>
                    <p>Explore Part-Time Job Options for International Students</p>
                    <NavLink to="/jobs/" className={styles.viewMoreLink}>View More</NavLink>
                </div>
                <div className={styles.heroJobImage} style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/barista-hand-pours-beverage-from-coffee-machine_266732-6850.jpg')"}}/>
            </Stack>

        </>


    )
}
