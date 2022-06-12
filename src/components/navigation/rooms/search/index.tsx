import {clearFoundRooms, searchRooms} from '../../../../actions/chat/action-creators';
import {Dispatch} from "redux";
import React from 'react';
import TextField from "@mui/material/TextField";
import styles from "./search.module.sass";
import {ThemeProvider, createTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../reducers";

interface RoomsSearchProps {
	onSearch: (name: string) => void;
	onEmptySearchField: () => void;
}

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

const Search: React.FC<RoomsSearchProps> = ({onSearch, onEmptySearchField}): React.ReactElement => {
	const onSearchValueChange = (event: any): void => {
		if (event.target.value.length) {
			onSearch(event.target.value);
		} else {
			onEmptySearchField();
		}
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

export default Search;