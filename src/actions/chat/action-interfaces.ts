import {CHAT_ACTIONS, ISendMessageData, ISendMessageTargetProperty} from "./action-type";
import {IUser} from "../../interfaces/auth";
import {IMessage, IRoom} from '../../types/chat';
import {ICustomFile} from "../../types/app";


export interface ChatRequestAction {
	type: CHAT_ACTIONS.ACTION_CHAT_ROOM_REQUEST;
}

export interface ChatGetRoomPredicate {
	roomId?: number;
	userId?: number;
	type?: any;
}

export interface ChatGetRoomAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM;
	room: IRoom;
}

export interface ChatGetRoomSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_SUCCESS;
	room: IRoom;
}

export interface ChatGetRoomsAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOMS;
	params?: any;
}

export interface ChatGetRoomsSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOMS_SUCCESS;
	rooms: any[];
}

export interface ChatGetRoomMessagesAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_MESSAGES,
	params?: any;
}

export interface ChatGetRoomMessagesSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_MESSAGES_SUCCESS,
	messages: IMessage[];
}

export interface ChatSendMessageAction {
	type: CHAT_ACTIONS.ACTION_CHAT_SEND_MESSAGE;
	messageData: ISendMessageData;
	target: ISendMessageTargetProperty;
}

export interface ChatSendMessageSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_SEND_MESSAGE_SUCCESS;
	message: IMessage;
}

export interface ChatSearchRoomsAction {
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS;
	name: string;
}

export interface ChatSearchRoomsSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS_SUCCESS;
	rooms: IRoom[] | [];
}

export interface IChatSearchUsersAction {
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_USERS;
	username: string;
}

export interface IChatSearchUsersSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_SEARCH_USERS_SUCCESS;
	users: IUser[];
}

export interface IChatGetContactsAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_CONTACTS
}

export interface IChatGetContactsSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_GET_CONTACTS_SUCCESS,
	users: IUser[]
}

export interface ICreateGroupAction {
	type: CHAT_ACTIONS.ACTION_CHAT_CREATE_GROUP;
	userIds: string[];
	name: string;
	image?: ICustomFile;
}

export interface ICreateGroupSuccessAction {
	type: CHAT_ACTIONS.ACTION_CHAT_CREATE_GROUP_SUCCESS;
	group: IRoom;
}

export interface ChatClearFoundRooms {
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_FOUND_ROOMS;
}

export interface IClearFoundUsers {
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_FOUND_USERS;
}

export interface ChatClearStoreAction {
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_STORE;
}

export interface ChatClearRoomMessagesAction {
	type: CHAT_ACTIONS.ACTION_CHAT_CLEAR_ROOM_MESSAGES;
}

export interface ChatErrorAction {
	type: CHAT_ACTIONS.ACTION_CHAT_ERROR;
	error: any;
}

export type ChatAction = ChatRequestAction
	| ChatGetRoomsAction
	| ChatGetRoomsSuccessAction
	| ChatErrorAction
	| ChatGetRoomSuccessAction
	| ChatSendMessageAction
	| ChatSendMessageSuccessAction
	| ChatClearStoreAction
	| ChatGetRoomAction
	| ChatSearchRoomsAction
	| ChatSearchRoomsSuccessAction
	| ChatClearFoundRooms
	| ChatGetRoomMessagesAction
	| ChatGetRoomMessagesSuccessAction
	| ChatClearRoomMessagesAction
	| IChatGetContactsAction
  | IChatGetContactsSuccessAction
	| ICreateGroupAction
	| ICreateGroupSuccessAction
	| IChatSearchUsersAction
	| IChatSearchUsersSuccessAction
	| IClearFoundUsers;