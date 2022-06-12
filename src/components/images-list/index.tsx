import React from 'react';
import styles from "../chat/messages-container/message/chat-message.module.sass";
import ImageListItem from './image-list-item';
import ImageList from "@mui/material/ImageList";

interface ImagesListProps {
	images: string[];
}

export interface ISrcSet {
	src: string;
	srcSet: string;
}

const ImagesList: React.FC<ImagesListProps> = ({images}): React.ReactElement => {
	const srcset = (image: string, size: number, rows: number = 1, cols: number = 1): ISrcSet => {
		return {
			src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
			srcSet: `${image}?w=${size * cols}&h=${
				size * rows
			}&fit=crop&auto=format&dpr=2 2x`
		};
	};

	const calculateRows = (_images: string[], index: number): number | undefined => {
		if (_images.length === 2) return 3
		else {
			if (index === 0) return 3
			else {
				if (_images.length % 2 === 0) {
					if (index <= _images.length - 4) return 2
					else return 1
				}
				if (_images.length % 2 !== 0) return 2
			}
		}
	}

	const calculateCols = (_images: string[], index: number): number | undefined => {
		if (_images.length === 2) return 3
		else {
			if (index === 0) return 6
			else {
				if (_images.length % 2 === 0) {
					if (index <= _images.length - 4) return 3
					else return 2
				}
				if (_images.length % 2 !== 0) return 3
			}
		}
	};

	return (
		<ImageList
			sx={{width: 280}}
			variant="quilted"
			cols={6}
			rowHeight={100}
			className={styles.uploadImage}
		>
			{images.map((image, index) => (
				<ImageListItem
					key={image}
					image={image}
					images={images}
					srcSet={{...srcset(image, 100, calculateRows(images, index), calculateCols(images, index))}}
					col={calculateCols(images, index)}
					row={calculateRows(images, index)}
					index={index}
				/>
			))}
		</ImageList>
	);
};

export default ImagesList;