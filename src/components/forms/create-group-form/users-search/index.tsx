import React from 'react';
import styles from "./users-search.module.sass";
import {ThemeProvider, createTheme} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {clearFoundUsers, searchUsers} from "../../../../actions/chat/action-creators";

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					width: "100%",
					'& label.Mui-focused': {
						color: "black"
					},
					label: {
						color: "black"
					}
				},
			},
		},
	},
});

const UsersSearch: React.FC = (): React.ReactElement => {
	const dispatch: Dispatch = useDispatch();
	const onSearchValueChange = (event: any): void => {
		dispatch(event.target.value.length ? searchUsers(event.target.value) : clearFoundUsers());
	};

	return (
		<div className={styles.search}>
			<ThemeProvider theme={theme}>
				<TextField
					id="standard-basic"
					type="search"
					variant="standard"
					fullWidth={true}
					onChange={onSearchValueChange}
				/>
			</ThemeProvider>
		</div>
	);
};

export default UsersSearch;