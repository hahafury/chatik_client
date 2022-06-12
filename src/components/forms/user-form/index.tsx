import React, {useState} from "react";
import {TextField, ThemeProvider, createTheme} from "@mui/material";
import styles from "./user-form.module.sass";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import classnames from "classnames";
import validationSchemas from "../../../validation";
import {Dispatch} from "redux";
import {updateUser} from '../../../actions/auth/action-creators'
import parseImg, {ParsedImageReturn} from "../../../helpers/parse-img";
import {IUpdateUserData} from "../../../actions/auth/types";

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '100%',
					marginBottom: "10px",
					'& label.Mui-focused': {
						color: "black",
					},
					label: {
						fontWeight: '600',
						color: "black"
					}
				},
			},
		},
	},
});

const UserForm: React.FC = (): React.ReactElement => {
	const dispatch :Dispatch = useDispatch()
	const {user} = useSelector((state: RootState) => state.auth);
	const [currentPhotoSrc,setCurrentPhotoSrc] = useState<string | null>(null)
	const [isUserDataUpdates, setIsUserDataUpdates] = React.useState<boolean>(false);

	const updatedFields = (formikValues: typeof formik.values): IUpdateUserData | void => {
		if (!user) {
			return;
		}

		const formikPropertyKeys = Object.getOwnPropertyNames(formikValues);
		const changedData: IUpdateUserData = {};

		for (const property of formikPropertyKeys) {
			const userProperty = user[property as keyof typeof user];
			const formikProperty = formikValues[property as keyof typeof formikValues];
			const isUpdates = userProperty ? userProperty !== formikProperty && true : !!formikProperty.length;

			if (isUpdates) {
				//@ts-ignore
				changedData[property] = formikValues[property as keyof typeof formikValues];
			}
		}
		return changedData;
	}
	const formik = useFormik({
		initialValues: {
			'username': user?.username ?? '',
			'bio': user?.bio ?? '',
			'phone': user?.phone ?? '',
			'photo': user?.photo ?? ''
		},
		validationSchema: validationSchemas.editProfileSchema,
		onSubmit<Values>(values: Values): void {
			const _updatedFields = updatedFields(formik.values)

			if (_updatedFields) {
				dispatch(updateUser(
					_updatedFields
				));
			}
		},
	});

	const isUpdateDataCheck = (): void => {
		const formikPropertyKeys = Object.getOwnPropertyNames(formik.values);
		if (!user) {
			return setIsUserDataUpdates(false);
		}

		for (const property of formikPropertyKeys) {
			const userProperty = user[property as keyof typeof user];
			const formikProperty = formik.values[property as keyof typeof formik.values];
			const isUpdates = userProperty ? userProperty !== formikProperty && true : !!formikProperty.length;

			if (isUpdates) {
				return setIsUserDataUpdates(true);
			}
		}
		return setIsUserDataUpdates(false);
	};

	const setPhotoData = async (parsedFile: ParsedImageReturn): Promise<void> =>{
		await formik.setFieldValue('photo', {
			filename: parsedFile.filename,
			file: parsedFile.file
		}, false);
		setCurrentPhotoSrc(parsedFile.originalFilePath);
	}

	const onSelectNewAvatar = async (): Promise<void> => {
		const file = await window.electron.dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}]
		});
		const files = file.filePaths[0]
		await parseImg(files,setPhotoData)
	}

	React.useEffect((): void => {
		if (user) {
			setCurrentPhotoSrc(user.photo)
		}
	}, [user]);

	React.useEffect((): void => {
		isUpdateDataCheck()
	}, [formik.values]);

	return (
		<div className={styles.userFormWrapper}>
			<form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
				<div className={styles.wrapperProfileImg}>
					<img className={styles.profileImg} src={currentPhotoSrc ?? ''}/>
					<div className={styles.actionImgWrapper} onClick={onSelectNewAvatar}>
						<AddIcon className={styles.actionImg}/>
					</div>
				</div>
				<div className={styles.username}>
					<ThemeProvider theme={theme}>
						<TextField
							id="username"
							label="Username"
							name="username"
							value={formik.values.username}
							variant="outlined"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</ThemeProvider>
					{formik.touched.username && formik.errors.username &&
              <p className={styles.error}>{formik.errors.username}</p>}
				</div>
				<div className={styles.bio}>
					<ThemeProvider theme={theme}>
						<TextField
							id="bio"
							label="Bio"
							name="bio"
							value={formik.values.bio}
							placeholder={!formik.values.bio.length ? '' : 'No bio yet'}
							variant="outlined"
							multiline={true}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.bio && formik.errors.bio && <p className={styles.error}>{formik.errors.bio}</p>}
						<TextField
							id="phone"
							label="Phone"
							name="phone"
							value={formik.values.phone}
							variant="outlined"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.phone && formik.errors.phone && <p className={styles.error}>{formik.errors.phone}</p>}
					</ThemeProvider>
				</div>
				<button type="submit" className={classnames([styles.actionButton, isUserDataUpdates && styles.btnShown])}>
					<CheckIcon/>
				</button>
			</form>
		</div>
	);
};

export default UserForm;