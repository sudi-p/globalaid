import React from 'react';
import RentalImages from './RentalImages';
import styles from './styles/Rental.module.scss';
import { Stack, Chip, Typography, Paper } from '@mui/material/';
import {
	ElectricBolt as ElectricBoltIcon, LocalShipping as LocalShippingIcon,
	AttachMoney as AttachMoneyIcon, Apartment as ApartmentIcon,
	Done as DoneIcon, NetworkWifi as NetworkWifiIcon,
	SmokeFree as SmokeFreeIcon, AcUnit as AcUnitIcon,
	Chair as ChairIcon, Kitchen as KitchenIcon,
	Dining as DiningIcon, LocalLaundryService as LocalLaundryServiceIcon,
	Pets as PetIcon, AirportShuttle as AirportShuttleIcon, Bed as BedIcon,
	Bathtub as BathtubIcon, AspectRatio as AspectRatioIcon,
} from '@mui/icons-material/';

const Rental = (props) => {
	console.log(props);
	const { title, price, priceNegotiable, description,
		hydroIncluded, heatIncluded, waterIncluded,
		wifiIncluded, postedDate, bedrooms,
		bathrooms, images, moveInDate,
		location, type, city, parking, agreementType,
		petFriendly, size, furnished, laundry, dishwasher,
		fridge, airConditioning, smoking
	} = props;
	return (
		<Paper elevation={1} className={styles.rental}>
			<Stack alignItems="flex-start" direction="row" className={styles.top} justifyContent={"space-between"}>
				<div>
					<Typography
						variant="h5"
						className={styles.title}
						gutterBottom
					>{title}</Typography>
					<Stack alignItems="center" direction="row" className={styles.subTitle}>
						<div className={styles.keyValue}><ApartmentIcon />{type} </div> &#8226;
						<div className={styles.keyValue}><BedIcon />{bedrooms} beds</div> &#8226;
						<div className={styles.keyValue}><BathtubIcon />{bathrooms} baths</div> &#8226;
						<div className={styles.keyValue}><AspectRatioIcon />{size}</div>
					</Stack>
				</div>
				<div className={styles.rent}>
					<Typography fontWeight="bold" color="primary" variant="h6" >${price}</Typography>
					<Typography sx={{fontSize: '11px'}} gutterBottom>*{!priceNegotiable && 'Non-'}Negotiable</Typography>
				</div>
			</Stack>
			<Stack spacing={2} direction="row">
				<RentalImages images={images} />
				<div className={styles.description}>
					<div className={styles.keyValue}><LocalShippingIcon /> Move In Date: {moveInDate}</div>
					<div className={styles.chips}>
						{wifiIncluded && <Chip className={styles.chip} variant="outlined" label="Wifi Included" icon={<NetworkWifiIcon />} />}
						{hydroIncluded && <Chip className={styles.chip} variant="outlined" label="Hydro Included" icon={<ElectricBoltIcon />} />}
						{smoking && <Chip className={styles.chip} variant="outlined" label="Smoking Prohibited" icon={<SmokeFreeIcon />} />}
						{airConditioning && <Chip className={styles.chip} variant="outlined" label="Air Conditioning" icon={<AcUnitIcon />} />}
						{furnished && <Chip className={styles.chip} variant="outlined" label="Furnished" icon={<ChairIcon />} />}
						{heatIncluded && <Chip className={styles.chip} variant="outlined" label="Gas Included" icon={<NetworkWifiIcon />} />}
						{waterIncluded && <Chip className={styles.chip} variant="outlined" label="Water Included" icon={<ElectricBoltIcon />} />}
						{parking && <Chip className={styles.chip} variant="outlined" label="Parking" icon={<AirportShuttleIcon />} />}
						{petFriendly && <Chip className={styles.chip} variant="outlined" label="Pet-Friendly" icon={<PetIcon />} />}
						{laundry && <Chip className={styles.chip} variant="outlined" label="Laundry" icon={<LocalLaundryServiceIcon />} />}
						{dishwasher && <Chip className={styles.chip} variant="outlined" label="Dishwasher" icon={<DiningIcon />} />}
						{fridge && <Chip className={styles.chip} size="medium" variant="outlined" label="Refrigerator" icon={<KitchenIcon />} />}
					</div>
				</div>
				<div className={styles.map}></div>

			</Stack>
			<div className={styles.rentalFooter}>
				{location}
			</div>
		</Paper>
	)
}

export default Rental;
