import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Stack,
    Paper
} from "@mui/material";
import styles from './styles/TopRentals.module.scss';

export default function TopRentals() {
    const rentals = [
        {
            id: "63f45ba2631adf1b0a35b94f",
            title: "2 Bedroom Hall Kitchen Apartment for rent",
            rent: 2500,
            image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/76900a54-e2ed-435e-9dd4-6d9b702149cd.webp",
        },
        {
            id: "63f45ba2631adfg1b0a35b94f",
            title: "2 Bedroom Hall Kitchen Apartment for rent",
            rent: 1000,
            image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/ae4fa65c-749d-41a7-920f-6956eab4c138.webp",
        },
        {
            id: "63f45ba2ertv1adf1b0a35b94f",
            title: "2 Bedroom Hall Kitchen Apartment for rent",
            rent: 3500,
            image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/e12e3117-3e56-4f7c-888a-761165979e2d.webp",
        },
        {
            id: "63f45ba234rfadf1b0a35b94f",
            title: "1 Bedroom Hall Kitchen Apartment for rent",
            rent: 2800,
            image: "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/8e3e4e55-83e1-4e03-b2f9-89c86b0bdcb9.webp",
        }
    ]
    return (
        <div className={styles.topBox}>
            <Stack className={styles.topBoxTitle} direction="row" justifyContent="space-between">
                <div>Top Rentals</div>
                <NavLink to="/rentals/" className={styles.topBoxViewMore}>View More</NavLink>
            </Stack>
            <Stack spacing={3} direction="row" justifyContent="center">
                {rentals.map(rental => (<RentalBox key={rental.id} {...rental}/>))}
            </Stack>
        </div>
    )
}



function RentalBox({title, rent, image}) {
    return (
        <Paper className={styles.rentalBox}>
            <div className={styles.rentalBoxImage} style={{backgroundImage: `url('${image}')`}}/>
            <Stack className={styles.rentalBoxText} direction="row" justifyContent="space-between">
                <div className={styles.rentalBoxTitle}>{title}</div>
                <div className={styles.rentalBoxRent}>${rent}</div>
            </Stack>
        </Paper>
    )
}

