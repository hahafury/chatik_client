import CONSTANTS from '../../constants';
import {ISocketEventConfig, SOCKET_EVENTS} from '../../types/socket';
import {Dispatch} from 'redux';
import io, {Socket} from 'socket.io-client';
import {RootState} from '../../reducers';
import {socketOnNewGroup, socketOnNewMessage, socketOnUpdateUser} from '../../actions/socket/action-creator';
import {IMessage, IRoom} from '../../types/chat';
import {IUpdatedUserFields} from '../../actions/socket/action-types';
import {IUser} from '../../types/auth';
import {toast} from 'react-toastify';
import Notification from '../../components/notification';

class SocketConnection {
	private readonly _dispatch: Dispatch;
	private readonly _getState: () => RootState;
	private _socket?: Socket;
	private eventConfig: ISocketEventConfig = {
		[SOCKET_EVENTS.SOCKET_NEW_MESSAGE_EVENT]: this.onNewMessage.bind(this),
		[SOCKET_EVENTS.SOCKET_UPDATE_USER_EVENT]: this.onUpdateUser.bind(this),
		[SOCKET_EVENTS.SOCKET_NEW_GROUP_EVENT]: this.onNewGroup.bind(this)
	};

	constructor(dispatch: Dispatch, getState: () => RootState) {
		this._dispatch = dispatch;
		this._getState = getState;
	};
	
	get socket(): Socket | undefined {
		return this._socket;
	};

	public eventsRecorder(): void {
		for (const event in this.eventConfig) {
			this._socket?.on(event, this.eventConfig[event as keyof ISocketEventConfig])
		}
	};

	public onGainingAccess(userId: string): void {
		this._socket = io(CONSTANTS.SOCKET_CONNECTION);
		this.eventsRecorder();
		this._socket.emit(CONSTANTS.SOCKET_JOIN, {roomName: 'user', id: userId})
	};

	public onNewMessage(message: IMessage): void {
		const user: IUser | null = this._getState().auth.user;
		this._dispatch(socketOnNewMessage(message));

		if (user?._id !== message.sender._id) {
			toast(<Notification from={message.sender.username} image={message.sender.photo} body={message.body ?? ''}/>)
		}
	};

	public onUpdateUser(userUpdatedFields: IUpdatedUserFields): void {
		this._dispatch(socketOnUpdateUser(userUpdatedFields))
	};

	public onLogout(): void {
		this._socket?.close()
	};

	public onNewGroup(room: IRoom): void {
		this._dispatch(socketOnNewGroup(room));
	};

	public connectToRoom(roomId: number): void {
		this._socket?.emit(CONSTANTS.SOCKET_JOIN, {roomName: 'room', id: roomId});
	};
}

export default SocketConnection;
