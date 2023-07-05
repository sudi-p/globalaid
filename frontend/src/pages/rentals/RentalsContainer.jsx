import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import getClient from '../../lib/api';
import styles from './styles/RentalsContainer.module.scss';
import { fetchRentalsStart, fetchRentalsSuccess, fetchRentalsError } from './RentalsSlice';
import PageNotFound from '../pagenotfound/PageNotFound';
import Rental from './Rental';
import {
  Stack,
  Paper, Button
} from "@mui/material";
import RentalImage from './RentalImages';



function Rentals() {
  const dispatch = useDispatch();
  const rentalsQuery = useQuery({
    queryKey: ['rentals'],
    queryFn: async () => {
      const res = await getClient().get('/user/getrentals')
      return res.data
    }
  });
  const { isLoading, error, data } = rentalsQuery;
  if (isLoading) return (<div>Loading..</div>)
  if (error) return <PageNotFound />
  console.log(data)
  return (
    <div className={styles.rentalsContainer}>
      <Stack direction="row" spacing={2}>
        <div>Section for filter</div>
        <div className={styles.rentals}>
          {data.rentals.map(rental => {
            return (
              <Rental {...rental} />
            )
          })}
        </div>
      </Stack>
    </div>
  );
}

export default Rentals;

function RentalCard({title, rent, images}) {
  return (
      <Paper className={styles.rentalBox}>
          <RentalImage images={images} />
          <Stack className={styles.rentalBoxText} direction="row" justifyContent="space-between">
              <div className={styles.rentalBoxTitle}>{title}</div>
              <div className={styles.rentalBoxRent}>${rent}</div>
          </Stack>
      </Paper>
  )
}
