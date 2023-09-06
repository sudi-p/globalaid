import React, { useState, FC } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material/';
import styles from './styles/RentalImages.module.scss';

interface RentalImageProps {
	images: string[];
}

const RentalImage = ({ images }: RentalImageProps) => {
	const [image, setImage] = useState<number>(0);
	return (
		<div className={styles.imageWrapper}>
			<div className={styles.image} style={{ backgroundImage: `url(${images[image]})` }} ></div>
			{images.length > 1 && (
				<div className={styles.imageHandle}>
					<div
						className={styles.imageHandleIconWrapper}
						onClick={() => image === 0 ? setImage(images.length - 1) : setImage(image - 1)}>
						<ChevronLeft
							htmlColor="white"
							className={styles.imageHandleIcon}
						/>
					</div>
					<div
						className={styles.imageHandleIconWrapper}
						onClick={() => image === images.length - 1 ? setImage(0) : setImage(image + 1)}
					>
						<ChevronRight
							htmlColor="white"
							className={styles.imageHandleIcon}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default RentalImage;