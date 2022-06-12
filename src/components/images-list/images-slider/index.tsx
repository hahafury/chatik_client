import React from 'react';
import styles from './images-slider.module.sass';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import ClearIcon from '@mui/icons-material/Clear';
import classnames from "classnames";

interface IImagesSliderProps {
	images: string[];
	defaultIndex: number;
}

const ImagesSlider: React.FunctionComponent<IImagesSliderProps> = ({images, defaultIndex}): React.ReactElement => {
	const {modalService} = useSelector((state: RootState) => state.app);
	const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(defaultIndex);

	const backwardAction = () => {
		setCurrentImageIndex(currentImageIndex !== 0 ? currentImageIndex - 1 : images.length - 1);
	}

	const forwardAction = (): void => {
		setCurrentImageIndex(currentImageIndex !== images.length - 1 ? currentImageIndex + 1 : 0);
	};

	const onNavigateImageList = (index: number): void => {
		if (currentImageIndex === index) {
			return;
		}
		setCurrentImageIndex(index);
	};

	const exitAction = () => {
		modalService.hide();
	};

	return (
		<div className={styles.imagesSliderWrapper}>
			{images.length > 1 && (
				<button onClick={backwardAction} className={styles.actionButton}><ArrowBackIosNewIcon/></button>
			)}
			<div className={styles.imgBlock}>
				<img className={styles.mainImg} src={images[currentImageIndex]}/>
				{images.length > 1 && (
					<div className={styles.imagesListWrapper}>
						{
							images.map((image, index) => {
								return <img
									key={index}
									onClick={() => onNavigateImageList(index)}
									className={classnames(styles.imagesListItem, index === currentImageIndex && styles.imagesListItem_active)}
									src={image}/>
							})
						}
					</div>
				)}
			</div>
			<button onClick={exitAction} className={styles.exitAction}><ClearIcon/></button>
			{images.length > 1 && (
				<button onClick={forwardAction} className={styles.actionButton}><ArrowForwardIosIcon/></button>
			)}
		</div>
	);
};

export default ImagesSlider
