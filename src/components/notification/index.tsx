import React from "react";
import styles from './notification.module.sass';

interface NotificationProps {
	from: string;
	body: string;
	image: string;
}

const Notification: React.FC<NotificationProps> = ({image, from, body}): React.ReactElement => {
	return (
		<div className={styles.notification}>
			<div className={styles.notification__avatar}>
				<img src={image} alt="user-image"/>
			</div>
			<div className={styles.notification__body}>
				<span className={styles.notification__body__from}>{from}: </span>
				<span>{body}</span>
			</div>
		</div>
	);
};

export default Notification;