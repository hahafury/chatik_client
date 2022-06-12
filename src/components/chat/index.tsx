import React from 'react';
import styles from './chat-container.module.sass';
import MessagesContainer from './messages-container';
import SendMessage from './send-message';
import Header from './header';
import {Room, RoomTypeValue} from '../../interfaces/chat';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Starter from './starter';
import {IRoom} from "../../types/chat";

interface ChatProps {
	currentRoom: IRoom | null;
	isFetchingCurrentRoom: boolean;
	userId: string;
}

const Chat: React.FC<ChatProps> = ({userId, currentRoom}): React.ReactElement => {
	const {user} = useSelector((state: RootState) => state.auth);
	const name: string = currentRoom?.type === RoomTypeValue.PRIVATE
		? currentRoom?.members.find(_user => _user._id !== user?._id)?.username ?? ''
		: currentRoom?.properties ? currentRoom.properties.name : '';
	const photo: string = currentRoom?.type === RoomTypeValue.PRIVATE
		? currentRoom?.members.find(_user => _user._id !== user?._id)?.photo ?? ''
		: currentRoom?.properties && currentRoom.properties.photo ? currentRoom.properties.photo : '';

	return currentRoom
			?  (
				<div className={styles.chatContainer}>
					<Header roomId={currentRoom._id} roomName={name} roomPhoto={photo} members={currentRoom.members} roomType={currentRoom.type}/>
					<MessagesContainer currentRoom={currentRoom} userId={userId}/>
					<SendMessage roomId={currentRoom._id}/>
				</div>
			) : <Starter/>
};

export default Chat;