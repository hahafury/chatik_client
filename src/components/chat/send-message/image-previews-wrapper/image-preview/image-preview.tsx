import classnames from "classnames";
import React, {Dispatch, SetStateAction} from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './image-preview.module.sass';

interface ImagePreviewProps {
	imgUrl: string;
	setCurrentImageUrls: Dispatch<SetStateAction<string[]>>;
	indexComponent: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({imgUrl, setCurrentImageUrls, indexComponent}): React.ReactElement => {
	const [deleteIconIsShown,setDeleteIconIsShown] = React.useState<boolean>(false)

	const onMouseMove = (): void => {
		setDeleteIconIsShown(!deleteIconIsShown);
	}

	const removeImg = (): void => {
		setCurrentImageUrls((state) => {
			return [...state.filter((url,index) => index !== indexComponent)]
		});
	};

	return (
		<div onMouseEnter={onMouseMove} onMouseLeave={onMouseMove} className={styles.imagePreviewWrapper}>
			<img className={classnames([deleteIconIsShown && styles.hovered])} src={imgUrl} alt=''/>
			<HighlightOffIcon onClick={removeImg} className={classnames(styles.actionButton, [deleteIconIsShown && styles.actionButtonShow])}/>
		</div>
	);
};

export default ImagePreview;