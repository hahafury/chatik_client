import {
	ChatClearFoundRooms,
	ChatClearRoomMessagesAction,
	ChatClearStoreAction,
	ChatErrorAction,
	ChatGetRoomAction,
	ChatGetRoomMessagesAction,
	ChatGetRoomMessagesSuccessAction,
	ChatGetRoomSuccessAction,
	ChatGetRoomsAction,
	ChatGetRoomsSuccessAction,
	ChatRequestAction,
	ChatSearchRoomsAction,
	ChatSearchRoomsSuccessAction,
	ChatSendMessageAction,
	ChatSendMessageSuccessAction,
	IClearFoundUsers,
	ICreateGroupAction,
	ICreateGroupSuccessAction
} from './action-interfaces';
import {CHAT_ACTIONS, ISendMessageData, ISendMessageTargetProperty} from './action-type';
import {IUser} from "../../interfaces/auth";
import {IMessage, IRoom} from "../../types/chat";
import {ICustomFile} from "../../types/app";

export const getRoomRequest = (): ChatRequestAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_ROOM_REQUEST
});

export const getRoom = (room: IRoom): ChatGetRoomAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM,
	room
});

export const getRoomSuccess = (room: any): ChatGetRoomSuccessAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_SUCCESS,
	room
});

export const getRoomMessages = (params: any): ChatGetRoomMessagesAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_MESSAGES,
	params
});

export const getRoomMessagesSuccess = (messages: any): ChatGetRoomMessagesSuccessAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_MESSAGES_SUCCESS,
	messages
});

export const getRooms = (params?: any): ChatGetRoomsAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOMS,
	params
});

export const getRoomsSuccess = (rooms: any[]): ChatGetRoomsSuccessAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOMS_SUCCESS,
	rooms
});

export const sendMessage = (messageData: ISendMessageData, target: ISendMessageTargetProperty): ChatSendMessageAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_SEND_MESSAGE,
	messageData,
	target
});

export const sendMessageSuccess = (message: IMessage): ChatSendMessageSuccessAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_SEND_MESSAGE_SUCCESS,
	message
});

export const searchRooms = (name: string): ChatSearchRoomsAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS,
	name
});

export const searchRoomsSuccess = (rooms: IRoom[] | []): ChatSearchRoomsSuccessAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS_SUCCESS,
	rooms
});

export const searchUsers = (username: string) => ({
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_USERS,
	username
});

export const searchUsersSuccess = (users: IUser[]) => ({
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_USERS_SUCCESS,
	users
});

export const getContacts = () => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_CONTACTS
});

export const getContactsSuccess = (users: IUser[]) => ({
	type: CHAT_ACTIONS.ACTION_CHAT_GET_CONTACTS_SUCCESS,
	users
});

export const createGroup = (userIds: string[], name: string, image?: ICustomFile): ICreateGroupAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_CREATE_GROUP,
	userIds,
	name,
	image
});

export const createGroupSuccess = (group: IRoom): ICreateGroupSuccessAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_CREATE_GROUP_SUCCESS,
	group
});

export const clearRoomMessages = (): ChatClearRoomMessagesAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_ROOM_MESSAGES
});

export const clearFoundRooms = (): ChatClearFoundRooms => ({
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_FOUND_ROOMS
});

export const clearFoundUsers = (): IClearFoundUsers => ({
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_FOUND_USERS
});

export const clearChatStore = (): ChatClearStoreAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_STORE
});

export const chatError = (error: any): ChatErrorAction => ({
	type: CHAT_ACTIONS.ACTION_CHAT_ERROR,
	error
})
