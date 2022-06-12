import {FunctionComponent, ReactElement} from "react";
import UserPanelSettings from "./settings";
import styles from "./user-panel.module.sass";

interface UserPanelProps {
	username: string;
	userPhoto: string;
}

const UserPanel: FunctionComponent<UserPanelProps> = ({username, userPhoto}): ReactElement => {
	return (
		<div className={styles.userInfo}>
			<div className={styles.userPhoto}>
				<img src={userPhoto} alt='user-photo'/>
			</div>
			<div className={styles.userName}>
				<span>{username}</span>
			</div>
			<div className={styles.userSettings}>
				<UserPanelSettings/>
			</div>
		</div>
	);
};

export default UserPanel;