import Socket from '../../api/socket';
import {AUTH_ACTIONS} from '../../actions/auth/action-types';
import {AuthAction} from '../../actions/auth/action-interfaces';
import {Middleware} from 'redux';
import {ChatAction} from '../../actions/chat/action-interfaces';

const socketMiddleware: Middleware = ({ dispatch, getState }) => {
	const socket = new Socket(dispatch, getState);

	return (next: any) => (action: AuthAction | ChatAction) => {
		switch (action.type) {
			case AUTH_ACTIONS.ACTION_AUTH_GET_USER_SUCCESS: {
				socket.onGainingAccess(action.user._id);
				break;
			}
			case AUTH_ACTIONS.ACTION_AUTH_LOGOUT: {
				socket.onLogout();
				break;
			}
			default: break;
		}
		return next(action);
	}
}

export default socketMiddleware;