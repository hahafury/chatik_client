import {IUpdatedUserFields, SOCKET_ACTIONS} from './action-types';
import {IMessage, IRoom} from '../../types/chat';

export interface ISocketActionOnUpdateUser {
	type: SOCKET_ACTIONS.ACTION_SOCKET_ON_UPDATE_USER;
	userUpdatedFields: IUpdatedUserFields;
}

export interface ISocketActionOnNewGroup {
	type: SOCKET_ACTIONS.ACTION_SOCKET_ON_NEW_GROUP;
	room: IRoom;
}

export interface ISocketActionOnNewMessage {
	type: SOCKET_ACTIONS.ACTION_SOCKET_ON_NEW_MESSAGE;
	message: IMessage;
}


export type SocketAction = ISocketActionOnNewGroup | ISocketActionOnUpdateUser | ISocketActionOnNewMessage;