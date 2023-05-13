import React from 'react';
import RentalImages from './RentalImages';
import styles from './styles/Rental.module.scss';

const Rental = (props) => {
	const { rental } = props;
	const { title, price, priceNegotiable, description, postedDate, bedrooms, bathrooms, images, moveInDate, location, type } = rental;
	return (
		<div className={styles.rental}>
			<div className={styles.rentalDetails}>
				<div className={styles.images}>
					<RentalImages images={images} />
				</div>
				<div className={styles.description}>
		            <div className={styles.title}>{title}</div>
		            <div className={styles.price}>Rent: $ {price}</div>
		            <div className={styles.priceNego}>Price Negotiable: {priceNegotiable? 'Yes': 'No'}</div>
		            <div >Type: {type}</div>
		            <div >Move In Date: {moveInDate}</div>
		        </div>
	        </div>
	        <div className={styles.rentalFooter}>
	        {location} | {bedrooms} beds | {bathrooms} baths 
	        </div>
        </div>
	)
}

export default Rental;
