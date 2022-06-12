import React, {FunctionComponent, ReactElement} from 'react';
import RegistrationForm from '../../components/forms/registration-form';
import styles from './registration.module.sass';

const RegistrationPage: FunctionComponent = (): ReactElement =>{
	return (
		<div className={styles.registrationWrapper}>
			<RegistrationForm/>
		</div>
	);
};
export default  RegistrationPage;