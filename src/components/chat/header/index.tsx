import React from 'react';
import styles from "./header.module.sass";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classnames from "classnames";
import {IUser} from "../../../types/auth";
import Contact from "../../contact";
import {IRoom, RoomType, RoomTypeValue} from "../../../types/chat";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import {Dispatch} from "redux";
import {getRoom} from "../../../actions/chat/action-creators";

interface HeaderProps {
	roomId: string;
	roomName: string;
	roomPhoto: string;
	roomType: RoomType;
	roomStatus?: string;
	members: IUser[];
}

const Header: React.FC<HeaderProps> = ({roomName, roomPhoto, roomStatus, members, roomType}): React.ReactElement => {
	const [isGroupSettingsShown, setIsGroupSettingsShown] = React.useState<boolean>(false);
	const {rooms} = useSelector((state: RootState) => state.chat);
	const {user} = useSelector((state: RootState) => state.auth);
	const dispatch: Dispatch = useDispatch();

	const handleGroupInfoOpen = (): void => {
		setIsGroupSettingsShown(!isGroupSettingsShown);
	};

	const onSelectContactFromMembers = (_user: IUser): void => {
		const foundPrivateRoomByUser: IRoom | undefined = rooms?.find(room => {
			return room.type === RoomTypeValue.PRIVATE && !!room.members.find(__user => __user._id === _user._id);
		});
		if (foundPrivateRoomByUser) {
			dispatch(getRoom(foundPrivateRoomByUser));
		} else {
			dispatch(getRoom({
				members: [_user, user],
				messages: [],
				type: RoomTypeValue.PRIVATE
			} as unknown as IRoom));
		}
		setIsGroupSettingsShown(false);
	};

	return (
		<div className={styles.header}>
			<div className={styles.headerChatInfo}>
				<div className={styles.room}>
					<div className={styles.roomPhoto}>
						<img src={roomPhoto} alt='interlocutor-photo'/>
					</div>
					<div className={styles.roomInfo}>
						<span className={styles.roomName}>{roomName}</span>
						<span className={styles.roomStatus}>{roomStatus}</span>
					</div>
				</div>
				{
					roomType === RoomTypeValue.PUBLIC && (
						<div className={styles.chatSettings}>
							<MoreVertIcon onClick={handleGroupInfoOpen}/>
						</div>
					)
				}
			</div>
			{
				roomType === RoomTypeValue.PUBLIC && (
					<div className={classnames(styles.headerGroupInfoOverlay, isGroupSettingsShown && styles.headerGroupInfo__show)}
					     onClick={handleGroupInfoOpen}>
						<div className={styles.headerGroupInfo} onClick={event => event.stopPropagation()}>
							<div className={styles.headerGroupInfoMembers}>
								{members.map(member => {
									return member._id !== user?._id &&
                      <Contact user={member} onSelect={onSelectContactFromMembers} isContactSelected={false}/>
								})}
							</div>
						</div>
					</div>
				)
			}
		</div>
	);
};

export default Header;