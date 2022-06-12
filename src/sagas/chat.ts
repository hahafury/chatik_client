import {put} from 'redux-saga/effects';
import * as chatService from '../api/services/chat';
import {toast} from 'react-toastify';
import {
	chatError, createGroupSuccess, getContactsSuccess, getRoomMessagesSuccess,
	getRoomsSuccess,
	searchRoomsSuccess, searchUsersSuccess,
	sendMessageSuccess
} from '../actions/chat/action-creators';
import {
	ChatGetRoomMessagesAction,
	ChatGetRoomsAction,
	ChatSearchRoomsAction,
	ChatSendMessageAction,
	IChatGetContactsAction, IChatSearchUsersAction,
	ICreateGroupAction
} from '../actions/chat/action-interfaces';

export function* getContacts(action: IChatGetContactsAction) {
	try {
		const {data} = yield chatService.getContacts();
		yield put(getContactsSuccess(data))
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

export function* searchUsers(action: IChatSearchUsersAction) {
	try {
		const {data} = yield chatService.searchUsers(action.username);
		yield put(searchUsersSuccess(data));
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

export function* getRooms(action: ChatGetRoomsAction) {
	try {
		const {data} = yield chatService.getRooms(action.params);
		yield put(getRoomsSuccess(data));
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

export function* sendMessage(action: ChatSendMessageAction) {
	try {
		const formData = new FormData();
		if (action.messageData.images.length > 0) {
			action.messageData.images.forEach(image => {
				formData.append('images[]', image.file);
			})
		}
		formData.append('messageData', JSON.stringify({...action.messageData, target: action.target}));
		yield chatService.sendMessage(formData);
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

export function* searchRooms(action: ChatSearchRoomsAction) {
	try {
		const {data} = yield chatService.searchRooms(action.name);
		yield put(searchRoomsSuccess(data));
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

export function* getRoomMessages(action: ChatGetRoomMessagesAction) {
	try {
		const {data} = yield chatService.getRoomMessages(action.params);
		yield put(getRoomMessagesSuccess(data));
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

export function* createGroup(action: ICreateGroupAction) {
	try {
		const formData = new FormData();
		if (action.image) {
			formData.append('image', action.image.file, action.image.filename)
		}
		formData.append('groupData', JSON.stringify({...action, image: undefined, type: undefined}))
		yield chatService.createGroup(formData);
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}
