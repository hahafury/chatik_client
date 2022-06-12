import React from 'react';
import styles from './create-group-form.module.sass';
import {Dispatch} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {createGroup, getContacts} from '../../../actions/chat/action-creators';
import {RootState} from '../../../reducers';
import Contact from '../../contact';
import {useFormik} from 'formik';
import {TextField, ThemeProvider, createTheme} from '@mui/material';
import UsersSearch from './users-search';
import {IUser} from '../../../types/auth';
import AddIcon from '@mui/icons-material/Add';
import parseImg, {ParsedImageReturn} from '../../../helpers/parse-img';
import {defaultGroupImageUrl} from '../../../constants';
import {ICustomFile} from '../../../types/app';

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					width: "100%",
					marginTop: '21px'
				},
			},
		},
	},
});

const CreateGroupForm: React.FC = (): React.ReactElement => {
	const [selectedUsers, setSelectedUsers] = React.useState<IUser[]>([]);
	const [currentGroupImage, setCurrentGroupImage] = React.useState<string | null>(null);
	const dispatch: Dispatch = useDispatch();
	const {contacts, searchedUsers} = useSelector((state: RootState) => state.chat);
	const formik = useFormik({
		initialValues: {
			name: '',
			image: undefined as ICustomFile | undefined
		},
		onSubmit<Values>(values: {name: string, image: ICustomFile | undefined}): void | Promise<any> {
			const userIds: string[] = selectedUsers.map(user => user._id);
			dispatch(createGroup(userIds, values.name, values.image))
		},
	})

	const setPhotoData = async (parsedFile: ParsedImageReturn): Promise<void> =>{
		await formik.setFieldValue('image', {
			filename: parsedFile.filename,
			file: parsedFile.file
		}, false);
		setCurrentGroupImage(parsedFile.originalFilePath);
	}

	const onSelectNewGroupImage = async (): Promise<void> => {
		const file = await window.electron.dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}]
		});
		const files = file.filePaths[0];
		await parseImg(files, setPhotoData);
	}

	const onSelectContact = (user: IUser): void => {
		const spreadedUsers: IUser[] = [...selectedUsers];
		if (spreadedUsers.find(_user => _user._id === user._id)) {
			setSelectedUsers(spreadedUsers.filter(_user => _user._id !== user._id));
		} else {
			spreadedUsers.push(user);
			setSelectedUsers(spreadedUsers);
		}
	};

	const renderContacts = (users: IUser[] | null) => {
		if (!users?.length) {
			return <div>not found</div>
		}
		let _users: IUser[];
		const splitedSelectedUsers: IUser[] = [...selectedUsers];
		const splitedUsers: IUser[] = [...users];

		if (!searchedUsers) {
			_users = splitedUsers
				.filter(user => !splitedSelectedUsers.find(_user => _user._id === user._id))
				.reverse()
				.concat(splitedSelectedUsers)
				.reverse();
		} else {
			_users = splitedUsers;
		}

		return _users?.map(user => {
			const isContactSelected: boolean = !!selectedUsers.find(_user => _user._id === user._id);
			return <Contact user={user} isContactSelected={isContactSelected} onSelect={onSelectContact} key={user._id}/>;
		});
	};

	React.useEffect(() => {
		dispatch(getContacts());
	}, []);

	return (
		<div className={styles.createGroupWrapper}>
			<div className={styles.createGroupContacts}>
				<UsersSearch/>
				{renderContacts(searchedUsers ?? contacts)}
			</div>
			<div className={styles.createGroupForm}>
				<form onSubmit={formik.handleSubmit}>
					<ThemeProvider theme={theme}>
						<div className={styles.wrapperGroupImg}>
							<img className={styles.profileImg} src={currentGroupImage ?? defaultGroupImageUrl}/>
							<div className={styles.actionImgWrapper} onClick={onSelectNewGroupImage}>
								<AddIcon className={styles.actionImg}/>
							</div>
						</div>
						<TextField
							id="standard-basic"
							label="Name"
							variant="standard"
							name='name'
							onChange={formik.handleChange}
							value={formik.values.name}
						/>
					</ThemeProvider>
					<button type='submit' className={styles.createGroupBtn}>Create</button>
				</form>
			</div>
		</div>
	);
};

export default CreateGroupForm;