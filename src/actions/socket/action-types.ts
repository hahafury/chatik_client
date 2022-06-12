export enum SOCKET_ACTIONS {
	ACTION_SOCKET_ON_UPDATE_USER = 'ACTION_SOCKET_ON_UPDATE_USER',
	ACTION_SOCKET_ON_NEW_GROUP = 'ACTION_SOCKET_ON_NEW_GROUP',
	ACTION_SOCKET_ON_NEW_MESSAGE = 'ACTION_SOCKET_ON_NEW_MESSAGE'
}

export interface IUpdatedUserFields {
	photo?: string;
	username?: string;
	bio?: string;
	phone?: string;
}