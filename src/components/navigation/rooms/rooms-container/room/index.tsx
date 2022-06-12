import {FunctionComponent, ReactElement} from "react";
import styles from "./room.module.sass";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getRoom} from "../../../../../actions/chat/action-creators";
import {RootState} from "../../../../../reducers";
import {RoomTypeValue} from "../../../../../interfaces/chat";
import {IRoom} from "../../../../../types/chat";

interface RoomProps {
	room: IRoom;
}

const RoomI: FunctionComponent<RoomProps> = ({room}): ReactElement => {
	const dispatch: Dispatch = useDispatch();
	const {user} = useSelector((state: RootState) => state.auth);
	const name: string = room.type === RoomTypeValue.PRIVATE
		? room.members.find(_user => _user._id !== user?._id)?.username ?? ''
		: room.properties ? room.properties.name : '';
	const photo: string = room.type === RoomTypeValue.PRIVATE
		? room.members.find(_user => _user._id !== user?._id)?.photo ?? ''
		: room.properties && room.properties.photo ? room.properties.photo : '';

	const onSelectRoom: () => void = () => {
		dispatch(getRoom(room));
	};
	console.log(room)
	return (
		<div className={styles.room} onClick={onSelectRoom}>
			<div className={styles.roomPhoto} style={{background: `url(${photo})`}}/>
			<div className={styles.roomInfo}>
				<span className={styles.roomName}>{name}</span>
				{room.preview?.sender.username && room.preview.body && (
					<span className={styles.roomMessagePreview}>{
						(user?._id === room.preview.sender._id ? 'you' : room.preview.sender.username) + ' : ' + room.preview.body
					}</span>
				)}
			</div>
		</div>
	);
};

export default RoomI;