import React from 'react';
import {ISrcSet} from "../index";
import {ImageListItem as ImageListItemMui} from "@mui/material";
import styles from './image-list-item.module.sass';
import ImagesSlider from "../images-slider";
import {RootState} from "../../../reducers";
import {useSelector} from "react-redux";

interface ImageListItemProps {
	images:string[]
	image: string;
	row: number | undefined;
	col:number | undefined;
	srcSet: ISrcSet;
	index:number;
}


const ImageListItem: React.FC<ImageListItemProps> = ({image,images ,col, row, srcSet, index}): React.ReactElement => {
	const {modalService} = useSelector((state: RootState) => state.app);

	const onImageClick = (): void =>{
		modalService.show(<ImagesSlider images={images} defaultIndex={index}/>, {
			content: {
				backgroundColor: 'transparent'
			},
			overlay: {
				backgroundColor: 'rgba(0,0,0,0.8)',
			}
		})
	};

	return (
		<ImageListItemMui className={styles.imageListItemWrapper} onClick={onImageClick} key={image} cols={col} rows={row}>
			<img
				{...srcSet}
				loading="lazy"
			/>
		</ImageListItemMui>
	)
};

export default ImageListItem;