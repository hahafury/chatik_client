import React from 'react';
import {IUser} from '../../types/auth';
import classnames from 'classnames';
import styles from './contact.module.sass';

interface ContactProps {
	user: IUser;
	onSelect: (user: IUser) => void;
	isContactSelected: boolean;
}

const Contact: React.FC<ContactProps> = ({user, onSelect, isContactSelected}): React.ReactElement => {
	const onSelectContact = (): void => {
		onSelect(user);
	};

	return (
		<div className={classnames([styles.contact, isContactSelected && styles.selectedContact])} onClick={onSelectContact}>
			<div className={styles.contactInfo}>
				<div className={styles.contactInfoPhoto}>
					<img src={user.photo} alt='contact-photo'/>
				</div>
				<span>{user.username}</span>
			</div>
		</div>
	);
};

export default Contact;