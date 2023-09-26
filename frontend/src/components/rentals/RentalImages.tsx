import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material/';

interface RentalImageProps {
	images: string[];
}

const RentalImage = ({ images }: RentalImageProps) => {
	const [image, setImage] = useState(0);
	return (
		<div className="relative w-[350px] h-[350px]">
			<div className="w-full h-full brightness-90 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${images[image]})` }} ></div>
			{images.length > 1 && (
				<div className="w-full h-full absolute top-0 flex justify-between items-center">
					<div
						className="h-full pointer flex items-center"
						onClick={() => image === 0 ? setImage(images.length - 1) : setImage(image - 1)}>
						<ChevronLeft
							htmlColor="white"
							className="h-10 w-10 text-white felx items-center justify-center"
						/>
					</div>
					<div
						className="h-full pointer flex items-center"
						onClick={() => image === images.length - 1 ? setImage(0) : setImage(image + 1)}
					>
						<ChevronRight
							htmlColor="white"
							className="h-10 w-10 text-white felx items-center justify-center"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default RentalImage;