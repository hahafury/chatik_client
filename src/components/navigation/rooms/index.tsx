import React from 'react';
import RoomsContainer from "./rooms-container";
import Search from './search';
import styles from './rooms.module.sass';
import {useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import {IRoom, RoomTypeValue} from "../../../types/chat";

interface RoomsProps {
	rooms: IRoom[];
}

const Rooms: React.FC<RoomsProps> = ({rooms}): React.ReactElement => {
	const [foundRooms, setFoundRooms] = React.useState<IRoom[] | null>(null);
	const {api} = useSelector((state: RootState) => state.app);
	const {user} = useSelector((state: RootState) => state.auth);

	const onSearch = async (name: string): Promise<any> => {
		const {data} = await api.search(name);
		const resultRooms: IRoom[] = [...data.rooms];
		const usersToRoom: IRoom[] = data.users.map(_user => {
			const foundPrivateRoomByFoundUser: IRoom | undefined = rooms.find(room => !!room.members.find(__user => __user._id === _user._id));
			if (foundPrivateRoomByFoundUser) {
				return foundPrivateRoomByFoundUser;
			}
			return {
				members: [_user, user],
				messages: [],
				type: RoomTypeValue.PRIVATE
			} as unknown as IRoom;
		});
		setFoundRooms([...resultRooms, ...usersToRoom]);
	};

	const onEmptySearchField = (): void => {
		setFoundRooms(null);
	};

	return (
		<div className={styles.rooms}>
			<Search onSearch={onSearch} onEmptySearchField={onEmptySearchField}/>
			<RoomsContainer rooms={foundRooms ?? rooms}/>
		</div>
	);
};

export default Rooms;