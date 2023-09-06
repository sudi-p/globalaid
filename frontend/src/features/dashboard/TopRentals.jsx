import React from 'react';
import Link from 'next/link';
import {
    Stack,
    Paper
} from "@mui/material";
import styles from './styles/TopRentals.module.scss';

export default function TopRentals({rentals}) {
    return (
        <div className={styles.topBox}>
            <Stack className={styles.topBoxTitle} direction="row"  justifyContent="space-between">
                <div>Top Rentals</div>
                <Link href="/rentals/" className={styles.topBoxViewMore}>View More</Link>
            </Stack>
            <Stack spacing={3} flexWrap="wrap" direction="row" justifyContent="center">
                {rentals.map(rental => (<RentalBox key={rental.id} {...rental}/>))}
            </Stack>
        </div>
    )
}

function RentalBox({title, rent, image}) {
    return (
        <Paper className={styles.rentalBox}>
            <div
                className={styles.rentalBoxImage}
                style={{backgroundImage: `url('${image}')`}}
            />
            <Stack className={styles.rentalBoxText} direction="row" justifyContent="space-between">
                <div className={styles.rentalBoxTitle}>{title}</div>
                <div className={styles.rentalBoxRent}>${rent}</div>
            </Stack>
        </Paper>
    )
}

