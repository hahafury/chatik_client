export enum SOCKET_EVENTS {
	SOCKET_NEW_MESSAGE_EVENT = 'new-message',
	SOCKET_NEW_GROUP_EVENT = 'new-group',
	SOCKET_UPDATE_USER_EVENT = 'update-user',
}

export type ISocketEventConfig = {
	[key in SOCKET_EVENTS]: (payload: any) => void;
};