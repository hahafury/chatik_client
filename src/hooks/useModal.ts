import React from 'react';
import {initializeModal} from '../actions/app/action-creators';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import ReactModal from "react-modal";

export interface IUseModalReturn {
	modalStyles: [modalStyles: ReactModal.Styles],
	modal: [modalContent: any, setModalContent: (content: any, styles?: ReactModal.Styles) => void]
}

export interface IUseModalStyles {
	content?: React.CSSProperties;
	overlay?: React.CSSProperties;
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: 99999999,
		overflow: 'hidden'
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.8)'
	}
};

const useModal = (): IUseModalReturn => {
	const [modalContent, setModalContent] = React.useState<any>(null);
	const [modalStyles, setModalStyles] = React.useState<ReactModal.Styles>(customStyles);
	const dispatch: Dispatch = useDispatch();

	const handleModal = (content: any, styles?: IUseModalStyles) => {
		if (content) {
			setModalContent(content);
			styles && setModalStyles({
				content: {
					...modalStyles.content,
					...styles.content
				},
				overlay: {
					...modalStyles.overlay,
					...styles.overlay
				}
			});
		} else {
			setModalContent(null);
			setModalStyles(customStyles);
		}
	};

	React.useEffect((): void => {
		dispatch(initializeModal({
			show: (content: any, styles?: IUseModalStyles): void => handleModal(content, styles),
			hide: (): void => setModalContent(null)
		}));
	},[]);

	return {
		modalStyles: [modalStyles],
		modal: [modalContent, handleModal]
	};
};

export default useModal;