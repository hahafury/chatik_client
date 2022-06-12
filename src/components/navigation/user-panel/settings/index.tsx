import {FunctionComponent, MouseEvent, ReactElement, useState} from "react";
import styles from "./settings.module.sass";
import {Button, Popover, ThemeProvider, Typography, createTheme} from "@mui/material";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../actions/auth/action-creators";
import {Chat, DisplaySettings, Logout, Settings} from '@mui/icons-material';
import {RootState} from "../../../../reducers";
import AppSettings from "../../../app-settings";
import CreateGroupForm from "../../../forms/create-group-form";

const theme = createTheme({
	components: {
		MuiPopover: {
			styleOverrides: {
				paper: {
					backgroundColor: "#FFFFFF",
					color: '#000000'
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					transition: "0.35s",
					"&:hover": {
						backgroundColor: "#0c5dff",
						color: '#FFFFFF',
						transition: "0.35s"
					}
				}
			}
		}
	},
});

const HeaderSettings: FunctionComponent = (): ReactElement => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const {modalService} = useSelector((state: RootState) => state.app);
	const dispatch: Dispatch = useDispatch();

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	const onLogout = (): void => {
		dispatch(logout());
	};

	const onCreateGroupClick = (): void => {
		modalService.show(<CreateGroupForm/>);
		handleClose();
	};

	const onSettingsClick = (): void => {
		modalService.show(<AppSettings/>);
		handleClose();
	};

	return (
		<div className={styles.headerSettings}>
			<ThemeProvider theme={theme}>
				<Button aria-describedby={anchorEl ? "simple-popover" : undefined} variant="contained" onClick={handleClick}>
					<Settings/>
				</Button>
				<Popover
					id={anchorEl ? "simple-popover" : undefined}
					open={!!anchorEl}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
				>
					<Typography sx={{p: 2}}>
					<span className={styles.headerSettingsPopoverItem} onClick={onCreateGroupClick}>
						<Chat/> Create group
					</span>
					</Typography>
					<Typography sx={{p: 2}}>
					<span className={styles.headerSettingsPopoverItem} onClick={onSettingsClick}>
						<DisplaySettings/> Settings
					</span>
					</Typography>
					<Typography sx={{p: 2}}>
					<span className={styles.headerSettingsPopoverItem} onClick={onLogout}>
						<Logout style={{color: "red"}}/> Logout
					</span>
					</Typography>
				</Popover>
			</ThemeProvider>
		</div>
	);
};

export default HeaderSettings;