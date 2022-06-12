import {DisplaySettings, Edit} from '@mui/icons-material';
import React, {ReactElement} from "react";
import UserForm from "../forms/user-form";
import styles from "./app-settings.module.sass";

type SettingsType = 'EDIT-PROFILE' | 'EDIT_APP';

class SettingsTypeValue {
	static EDIT_PROFILE: SettingsType = 'EDIT-PROFILE';
	static EDIT_APP: SettingsType = 'EDIT_APP';
}
const settings = {
	[SettingsTypeValue.EDIT_PROFILE]: UserForm,
	[SettingsTypeValue.EDIT_APP]: UserForm,
}

const AppSettings: React.FC = (): ReactElement => {
	const [settingsType, setSettingsType] = React.useState<SettingsType>(SettingsTypeValue.EDIT_PROFILE);
	const Form = settings[settingsType];

	const selectSettingsForm = (settingsType: SettingsType) => {
		setSettingsType(settingsType);
	};

	return (
		<div className={styles.appSettings}>
			<UserForm/>
		</div>
	);
};

export default AppSettings;