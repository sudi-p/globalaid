import React, { ReactNode } from 'react';
import RentalImages from './RentalImages';
import { Stack, Chip, Typography, Paper } from '@mui/material/';
import {
	ElectricBolt as ElectricBoltIcon, LocalShipping as LocalShippingIcon,
	Apartment as ApartmentIcon,	NetworkWifi as NetworkWifiIcon,
	SmokeFree as SmokeFreeIcon, AcUnit as AcUnitIcon, Chair as ChairIcon,
	Kitchen as KitchenIcon,	Dining as DiningIcon, LocalLaundryService as LocalLaundryServiceIcon, 	Pets as PetIcon, AirportShuttle as AirportShuttleIcon, Bed as BedIcon, Bathtub as BathtubIcon, AspectRatio as AspectRatioIcon,
} from '@mui/icons-material/';

type RentalProps = {
	title: string,
	price: string,
	priceNegotiable: string,
	fridge: string,
	hydroIncluded: boolean,
	heatIncluded: boolean,
	waterIncluded: boolean,
	wifiIncluded: boolean,
	bedrooms: number,
	bathrooms: number,
	images: string[],
	moveInDate: boolean,
	location: boolean,
	type: string,
	parking: boolean,
	laundry: boolean,
	dishwasher: boolean,
	petFriendly: boolean,
	size: string,
	furnished: boolean,
	airConditioning: boolean,
	smoking: boolean,
}

const Rental = (props: RentalProps) => {
	const { title, price, priceNegotiable, fridge,
		hydroIncluded, heatIncluded, waterIncluded,
		wifiIncluded, bedrooms, bathrooms, images, moveInDate,
		location, type, parking, laundry, dishwasher,
		petFriendly, size, furnished, airConditioning, smoking
	} = props;
	return (
		<Paper elevation={1} className="p-5 mx-auto mb-10">
			<Stack alignItems="flex-start" direction="row" className="mb-2" justifyContent={"space-between"}>
				<div>
					<Typography
						variant="h5"
						className="font-semibold tracking-wide"
						gutterBottom
					>{title}</Typography>
					<Stack alignItems="center" direction="row" className="text-gray-500 mb-5">
						<KeyValue icon={<ApartmentIcon />} text={type}/>&#8226;
						<KeyValue icon={<BedIcon />} text={`${bedrooms} beds`}/>&#8226;
						<KeyValue icon={<BathtubIcon />} text={`${bathrooms} baths`}/>&#8226;
						<KeyValue icon={<AspectRatioIcon />} text={size}/>
					</Stack>
				</div>
				<div className="text-right">
					<Typography fontWeight="bold" color="primary" variant="h6" >${price}</Typography>
					<Typography sx={{fontSize: '11px'}} gutterBottom>*{!priceNegotiable && 'Non-'}Negotiable</Typography>
				</div>
			</Stack>
			<Stack spacing={2} direction="row">
				<RentalImages images={images} />
				<div className="flex-1">
					<KeyValue icon={<LocalShippingIcon />} text={`Move In Date: ${moveInDate}`}/>
					<div className="wrap pt-3 border-0 border-t border-solid border-gray-300">
						{wifiIncluded && <Chip className="ml-4 mb-4" variant="outlined" label="Wifi Included" icon={<NetworkWifiIcon />} />}
						{hydroIncluded && <Chip className="ml-4 mb-4" variant="outlined" label="Hydro Included" icon={<ElectricBoltIcon />} />}
						{smoking && <Chip className="ml-4 mb-4" variant="outlined" label="Smoking Prohibited" icon={<SmokeFreeIcon />} />}
						{airConditioning && <Chip className="ml-4 mb-4" variant="outlined" label="Air Conditioning" icon={<AcUnitIcon />} />}
						{furnished && <Chip className="ml-4 mb-4" variant="outlined" label="Furnished" icon={<ChairIcon />} />}
						{heatIncluded && <Chip className="ml-4 mb-4" variant="outlined" label="Gas Included" icon={<NetworkWifiIcon />} />}
						{waterIncluded && <Chip className="ml-4 mb-4" variant="outlined" label="Water Included" icon={<ElectricBoltIcon />} />}
						{parking && <Chip className="ml-4 mb-4" variant="outlined" label="Parking" icon={<AirportShuttleIcon />} />}
						{petFriendly && <Chip className="ml-4 mb-4" variant="outlined" label="Pet-Friendly" icon={<PetIcon />} />}
						{laundry && <Chip className="ml-4 mb-4" variant="outlined" label="Laundry" icon={<LocalLaundryServiceIcon />} />}
						{dishwasher && <Chip className="ml-4 mb-4" variant="outlined" label="Dishwasher" icon={<DiningIcon />} />}
						{fridge && <Chip className="ml-4 mb-4" size="medium" variant="outlined" label="Refrigerator" icon={<KitchenIcon />} />}
					</div>
				</div>
				<div className="w-[300px] h-300px bg-gray-400"></div>
			</Stack>
			<div className="pt-2">
				{location}
			</div>
		</Paper>
	)
}

type KeyValueProps = {
	icon: ReactNode,
	text: string,
}

const KeyValue = ({icon, text}: KeyValueProps) => (
	<div className="flex item-center mx-2 gap-1">{icon}{text} </div>
);

export default Rental;
