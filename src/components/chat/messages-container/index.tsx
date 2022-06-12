import styles from './chat-messages-container.module.sass';
// @ts-ignore
import ScrollToBottom, {useAnimating} from 'react-scroll-to-bottom';
import ChatMessage from './message';
import React from 'react';
import {IMessage, IRoom} from '../../../types/chat';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {Dispatch} from 'redux';
import Loading from '../../loading';

interface ChatMessagesContainerProps {
	userId: string;
	currentRoom: IRoom;
}

const MessagesContainer: React.FC<ChatMessagesContainerProps> = ({userId, currentRoom}): React.ReactElement => {
	const [currentRoomId, setCurrentRoomId] = React.useState<string | null>(null);
	useAnimating(false);
	const [messagesState, setMessagesState] = React.useState<React.ReactElement[] | null>(null);
	const [isMessagesInitialize, setIsMessagesInitialize] = React.useState<boolean>(false);
	const dispatch: Dispatch = useDispatch();

	if (currentRoomId !== currentRoom?._id && currentRoom) {
		setCurrentRoomId(currentRoom?._id);
	}

	React.useEffect((): void => {
		if (isMessagesInitialize && messagesState && currentRoomId !== currentRoom._id) {
			const newMessage: IMessage = currentRoom.messages[currentRoom.messages.length - 1];
			setMessagesState(messagesState?.concat([
				<ChatMessage
					key={newMessage._id}
					roomType={currentRoom.type}
					isOwn={userId === newMessage.sender._id}
					sender={newMessage.sender}
					body={newMessage.body}
					images={newMessage.images}
					createdAt={newMessage.createdAt}
				/>
			]));
		} else {
			setMessagesState(currentRoom.messages.map((message: IMessage): React.ReactElement => {
				return <ChatMessage
					key={message._id}
					roomType={currentRoom.type}
					isOwn={userId === message.sender._id}
					sender={message.sender}
					body={message.body}
					images={message.images}
					createdAt={message.createdAt}
				/>
			}));
			setIsMessagesInitialize(true);
		}
	}, [currentRoom]);

	return (
		<ScrollToBottom debounce={1} className={styles.chatMessagesContainer}>
			{messagesState ?? <Loading/>}
		</ScrollToBottom>
	);
};

export default MessagesContainer;