import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getClient from '../../lib/api';
import styles from './styles/RentalsContainer.module.scss';
import { fetchRentalsStart, fetchRentalsSuccess, fetchRentalsError } from './RentalsSlice';
import Rental from './Rental';

function App() {
  const dispatch = useDispatch();
  const rentals = useSelector(state => state.rentals.rentals);
  useEffect(() => {
    dispatch(fetchRentalsStart());
    getClient()
    .get('/user/getrentals')
    .then(res => dispatch(fetchRentalsSuccess(res.data)))
    .catch(err => {
      console.log(err)
      dispatch(fetchRentalsError)
    })
    
  }, [])
  return (
    <div className={styles.rentals}>
      Rentals
      {rentals.map(rental => {
        return(
          <Rental rental={rental} />
        )
      })}
    </div>
  );
}

export default App;
