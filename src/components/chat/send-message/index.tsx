import styles from "./chat-send-message.module.sass";
import React, {FunctionComponent, ReactElement} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {sendMessage} from "../../../actions/chat/action-creators";
// @ts-ignore
import InputEmoji from "react-input-emoji";
import {RootState} from "../../../reducers";
import {IUser} from "../../../interfaces/auth";
import {RoomTypeValue} from "../../../interfaces/chat";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import parseImg, {ParsedImageReturn} from '../../../helpers/parse-img'
import ImagesPreviewsWrapper from "./image-previews-wrapper/index";

interface SendMessageProps {
	roomId: string | undefined;
}

const SendMessage: FunctionComponent<SendMessageProps> = ({roomId}): ReactElement => {
	const [currentRoomId, setCurrentRoomId] = React.useState<string | null>(null);
	const [currentImageUrls, setCurrentImageUrls] = React.useState<string[]>([])
	const {currentRoom} = useSelector((state: RootState) => state.chat);
	const {user} = useSelector((state: RootState) => state.auth);
	const interlocutor: IUser | undefined = currentRoom?.members.find(_user => _user._id !== user?._id);
	const dispatch: Dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			body: '',
			images: []
		},
		onSubmit: values => {
			if (values.body.length > 0 && currentRoom) {
				dispatch(sendMessage({
					body: values.body,
					images: values.images
				}, {
					type: currentRoom.type,
					roomId: currentRoom.type === RoomTypeValue.PUBLIC ? currentRoom._id : undefined,
					recipientId: currentRoom.type === RoomTypeValue.PRIVATE ? interlocutor?._id : undefined
				}));
				formik.values.body = '';
				setCurrentImageUrls([]);
			}
		},
	});

	React.useEffect((): void => {
		if (!currentRoom) {
			return;
		}
		if (currentRoomId !== currentRoom._id) {
			formik.values.body = '';
			formik.values.images = [];
			setCurrentImageUrls([]);
		}
		setCurrentRoomId(currentRoom._id);
	}, [currentRoom])

	const onChangeMessageBody = async (message: string): Promise<any> => {
		await formik.setFieldValue('body', message);
	};

	const addPhotoData = async (parsedFiles: ParsedImageReturn[]): Promise<void> => {
		const filePaths: string[] = [];

		for (const parsedFile of parsedFiles) {
			filePaths.push(parsedFile.originalFilePath);
		}

		setCurrentImageUrls([...currentImageUrls, ...filePaths]);

		await formik.setFieldValue('images', [...parsedFiles.map(parsedFile => {
			return {
				file: parsedFile.file,
				filename: parsedFile.filename
			}
		})])
	};

	const addImage = async (): Promise<void> => {
		const file = await window.electron.dialog.showOpenDialog({
			properties: ['openFile', 'multiSelections'],
			filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}]
		});

		await parseImg(file.filePaths, addPhotoData)
	};

	return (
		<div className={styles.chatSendMessage}>
			<ImagesPreviewsWrapper isShow={!!currentImageUrls.length} setCurrentImageUrls={setCurrentImageUrls} imgUrls={currentImageUrls}/>
			<form
				onSubmit={formik.handleSubmit}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						formik.handleSubmit();
					}
				}}
			>
				<PhotoSizeSelectActualIcon onClick={addImage} className={styles.photoAction}/>
				<InputEmoji
					id="body"
					name="body"
					onChange={onChangeMessageBody}
					value={formik.values.body}
				/>
			</form>
		</div>
	);
};

export default SendMessage;