import React, {Dispatch, SetStateAction} from 'react';
import styles from './image-previews-wrapper.module.sass';
import ImagePreview from "./image-preview/image-preview";
import classnames from "classnames";

interface ImagesPreviewsWrapperProps {
	imgUrls: string[];
	setCurrentImageUrls: Dispatch<SetStateAction<string[]>>;
	isShow: boolean;
}

const ImagesPreviewsWrapper: React.FC<ImagesPreviewsWrapperProps> = ({imgUrls,setCurrentImageUrls, isShow}): React.ReactElement => {
	return (
		<div className={classnames([styles.imagesPreviewsWrapper, isShow && styles.imagesPreviewsWrapperShow])}>
			{
				imgUrls.map((imgUrl,index) => {
					return <ImagePreview setCurrentImageUrls={setCurrentImageUrls} indexComponent={index} imgUrl={imgUrl} key={index}/>;
				})
			}
		</div>
	);
};

export default ImagesPreviewsWrapper;
