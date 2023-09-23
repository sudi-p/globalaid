import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getClient from '../../lib/api';
import PageNotFound from '../404';
import Rental from './Rental';
import {
  Stack
} from "@mui/material";
import NavbarLayout from '../../layout/navBarLayout/';
import styles from './styles/RentalsContainer.module.scss';

function Rentals() {
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
  return (
    <div className={styles.rentalsContainer}>
      <Stack direction="row" spacing={2}>
        <div>Section for filter</div>
        <div className={styles.rentals}>
          {data.rentals.map((rental,id) => {
            return (
              <Rental key={`rental${id}`} {...rental} />
            )
          })}
        </div>
      </Stack>
    </div>
  );
}

export default Rentals;

Rentals.getLayout = function getLayout(page){
  return <NavbarLayout>{page}</NavbarLayout>
}