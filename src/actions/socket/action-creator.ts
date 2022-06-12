import {IUpdatedUserFields, SOCKET_ACTIONS} from './action-types';
import {ISocketActionOnNewGroup, ISocketActionOnNewMessage, ISocketActionOnUpdateUser} from './action-interfaces';
import {IMessage, IRoom} from '../../types/chat';

export const socketOnUpdateUser = (userUpdatedFields: IUpdatedUserFields): ISocketActionOnUpdateUser => ({
	type: SOCKET_ACTIONS.ACTION_SOCKET_ON_UPDATE_USER,
	userUpdatedFields
});

export const socketOnNewGroup = (room: IRoom): ISocketActionOnNewGroup => ({
	type: SOCKET_ACTIONS.ACTION_SOCKET_ON_NEW_GROUP,
	room
});

export const socketOnNewMessage = (message: IMessage): ISocketActionOnNewMessage => ({
	type: SOCKET_ACTIONS.ACTION_SOCKET_ON_NEW_MESSAGE,
	message
});
