import {takeEvery, takeLatest, takeLeading} from 'redux-saga/effects';
import {AUTH_ACTIONS} from '../actions/auth/action-types';
import {CHAT_ACTIONS} from '../actions/chat/action-type';
import * as authSaga from './auth';
import * as chatSaga from './chat';

function* rootSaga() {
	yield takeLatest(AUTH_ACTIONS.ACTION_AUTH_LOGIN, authSaga.login);
	yield takeLatest(AUTH_ACTIONS.ACTION_AUTH_SIGNUP, authSaga.signup);
	yield takeEvery(AUTH_ACTIONS.ACTION_AUTH_GET_USER, authSaga.getUser);
	yield takeLeading(CHAT_ACTIONS.ACTION_CHAT_GET_ROOMS, chatSaga.getRooms);
	yield takeEvery(CHAT_ACTIONS.ACTION_CHAT_SEND_MESSAGE, chatSaga.sendMessage);
	yield takeLeading(CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS, chatSaga.searchRooms);
	yield takeLeading(CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_MESSAGES, chatSaga.getRoomMessages);
	yield takeLeading(CHAT_ACTIONS.ACTION_CHAT_GET_CONTACTS, chatSaga.getContacts);
	yield takeLeading(CHAT_ACTIONS.ACTION_CHAT_CREATE_GROUP, chatSaga.createGroup);
	yield takeLeading(CHAT_ACTIONS.ACTION_CHAT_SEARCH_USERS, chatSaga.searchUsers);
	yield takeLeading(AUTH_ACTIONS.ACTION_AUTH_UPDATE_USER, authSaga.updateUser);
}

export default rootSaga;