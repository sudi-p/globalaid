import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/RentalsContainer.module.scss';
import { fetchRentals, fetchRentalSuccess, fetchRentalsError } from './RentalsSlice';
import Rental from './Rental';

function App() {
  const dispatch = useDispatch();
  const rentals = useSelector(state => state.rentals.rentals);
  useEffect(() => {
    dispatch(fetchRentals());
  }, [])
  return (
    <div className="rentals">
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
