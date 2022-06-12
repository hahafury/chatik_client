import React from 'react';
import RoomItem from './room';
import styles from './rooms-container.module.sass';
import {IRoom} from '../../../../types/chat';

interface RoomsContainerProps {
	rooms: IRoom[];
}

const RoomsContainer: React.FC<RoomsContainerProps> = ({rooms}): React.ReactElement => {
	return (
		<div className={styles.roomsContainer}>
			{
				rooms.length
					? rooms.map((room: IRoom, index: number): React.ReactElement => {
						return (
							<RoomItem
								key={room._id ?? index}
								room={room}
							/>
						);
					})
					: <span className={styles.roomsNotFound}>Not found :(</span>
			}
		</div>
	);
};

export default RoomsContainer;