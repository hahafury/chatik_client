import {FunctionComponent} from "react";
import styles from "./navigation.module.sass"
import UserPanel from "./user-panel";
import Rooms from "./rooms";
import {IRoom} from "../../types/chat";

interface NavigationProps {
	rooms: IRoom[];
	username: string;
	userPhoto: string;
}

const Navigation: FunctionComponent<NavigationProps> = ({username, rooms, userPhoto}) => {
	return (
		<div className={styles.navigation}>
			<UserPanel username={username} userPhoto={userPhoto}/>
			<Rooms rooms={rooms}/>
		</div>
	);
};

export default Navigation;