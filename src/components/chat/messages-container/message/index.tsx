import styles from './chat-message.module.sass';
import classnames from 'classnames';
import React from 'react';
import moment from 'moment';
import {IUser} from '../../../../interfaces/auth';
import ImageList from '../../../images-list';
import {RoomType, RoomTypeValue} from "../../../../types/chat";

interface ChatMessageProps {
	isOwn: boolean;
	body?: string;
	images?: string[];
	sender: IUser;
	createdAt: string;
	roomType: RoomType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
 isOwn,
 body,
 images,
 sender,
 createdAt,
 roomType
}): React.ReactElement => {



	return (
		<div className={styles.chatMessage} style={!isOwn && roomType === RoomTypeValue.PUBLIC ? {marginTop: '32px'} : {}}>
			<div className={classnames([styles.messageWrapper, isOwn && styles.ownMessage])}>
				{
					roomType === RoomTypeValue.PUBLIC && !isOwn &&
            <span className={styles.messageSenderUsername}>{sender.username}</span>
				}
				{
					images && images.length > 0 && (
						<ImageList images={images}/>
					)
				}
				{
					!isOwn && (
						<div className={styles.messageSender}>
							<img src={sender.photo} alt="sender"/>
						</div>
					)
				}
				<span className={styles.messageBody}>{body}</span>
				<span className={styles.messageTime}>{moment(new Date(+createdAt)).format("hh:mm")}</span>
			</div>
		</div>
	);
};

export default ChatMessage;