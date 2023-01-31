import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import styles from './styles/RentalImages.module.scss';

const RentalImage = (props) => {
	const { images } = props;
	const [image, setImage] = useState(0);	
	return(
		<div className={styles.imageWrapper}>
			<div className={styles.image} style={{'background-image': `url(${images[image]})`}} ></div>
			{images.length>1 && (
				<div className={styles.imageHandle}>
					<div className={styles.imageHandleIconWrapper} onClick={()=> image === 0 ? setImage(images.length-1): setImage(image-1)}> <ChevronLeftIcon boxSize="8" color="white" className={styles.imageHandleIcon} /></div>
					<div className={styles.imageHandleIconWrapper} onClick={() => image === images.length-1 ? setImage(0): setImage(image+1)}> <ChevronRightIcon boxSize="8" color="white" className={styles.imageHandleIcon}/></div>
				</div>
			)}
		</div>
	);
}

export default RentalImage;