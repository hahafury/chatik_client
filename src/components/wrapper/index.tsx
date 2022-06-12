import styles from "./wrapper.module.sass";
import React from "react";
import Navigation from "../navigation";
import Loading from "../loading";
import Chat from "../chat";
import CONSTANTS from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../actions/auth/action-creators";
import {clearChatStore, getRooms} from "../../actions/chat/action-creators";

const Wrapper: React.FC = (): React.ReactElement => {
	const {user, isLoggedIn} = useSelector((state: RootState) => state.auth);
	const {rooms, currentRoom, searchedRooms, isFetchingCurrentRoom} = useSelector((state: RootState) => state.chat);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	React.useEffect((): void => {
		if (!user) {
			localStorage.getItem(CONSTANTS.LOCAL_STORAGE_TOKEN_KEYS) ? dispatch(getUser()) : navigate('/login');
		} else {
			dispatch(getRooms());
		}
	}, [user, isLoggedIn]);

	React.useEffect((): void => {
		dispatch(clearChatStore());
	}, []);

	return (
		<div className={styles.mainWrapper}>
			{
				rooms && user ? (
					<div className={styles.chatContent}>
						<Navigation rooms={searchedRooms ?? rooms} username={user.username} userPhoto={user.photo}/>
						<Chat currentRoom={currentRoom} userId={user._id} isFetchingCurrentRoom={isFetchingCurrentRoom}/>
					</div>
				) : <Loading/>
			}
		</div>
	);
};

export default Wrapper;