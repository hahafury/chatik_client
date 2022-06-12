import React from 'react';
import styles from './starter.module.sass';

const Starter: React.FC = (): React.ReactElement => {
	return (
		<div className={styles.chatStarter}>
			<span>Select chat to start chatting</span>
		</div>
	);
};

export default Starter;