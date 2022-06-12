import {AUTH_ACTIONS} from '../actions/auth/action-types';
import {AuthAction} from "../actions/auth/action-interfaces";
import CONSTANTS from "../constants";
import {IUser} from "../interfaces/auth";
import {SOCKET_ACTIONS} from "../actions/socket/action-types";
import {SocketAction} from '../actions/socket/action-interfaces';

export interface AuthState {
	isFetching: boolean;
	error: object | null;
	user: IUser | null;
	isLoggedIn: boolean;
}

const initialState: AuthState = {
	isFetching: false,
	error: null,
	user: null,
	isLoggedIn: !!window.localStorage.getItem(CONSTANTS.LOCAL_STORAGE_TOKEN_KEYS)
};

const authReducer = (state: AuthState = initialState, action: AuthAction | SocketAction): AuthState => {
	switch (action.type) {
		case AUTH_ACTIONS.ACTION_AUTH_REQUEST: {
			return {
				...state,
				isFetching: true,
				error: null,
			};
		}
		case AUTH_ACTIONS.ACTION_AUTH_SUCCESS: {
			return {
				...state,
				isFetching: false,
				isLoggedIn: true
			};
		}
		case AUTH_ACTIONS.ACTION_AUTH_GET_USER_SUCCESS: {
			return {
				...state,
				isFetching: false,
				user: action.user
			}
		}
		case AUTH_ACTIONS.ACTION_AUTH_LOGOUT: {
			localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_TOKEN_KEYS);
			return {
				isFetching: false,
				error: null,
				user: null,
				isLoggedIn: false
			};
		}
		case SOCKET_ACTIONS.ACTION_SOCKET_ON_UPDATE_USER: {
			return <AuthState>{
				...state,
				user: {...state.user, ...action.userUpdatedFields}
			}
		}
		case AUTH_ACTIONS.ACTION_AUTH_ERROR: {
			return {
				...state,
				isFetching: false,
				error: action.error,
			};
		}
		case AUTH_ACTIONS.ACTION_AUTH_CLEAR_ERROR: {
			return {
				...state,
				error: null,
			};
		}
		default:
			return state;
	}
};

export default authReducer;