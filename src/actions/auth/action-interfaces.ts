import {AUTH_ACTIONS, ILogin, ISignup} from './action-types';
import {IUpdateUserData} from './types';
import {IUser} from '../../types/auth';

export interface AuthLoginAction {
	type: AUTH_ACTIONS.ACTION_AUTH_LOGIN;
	loginData: ILogin;
}

export interface AuthRequestAction {
	type: AUTH_ACTIONS.ACTION_AUTH_REQUEST;
}

export interface AuthSignupAction {
	type: AUTH_ACTIONS.ACTION_AUTH_SIGNUP;
	signupData: ISignup;
}

export interface AuthLogoutAction {
	type: AUTH_ACTIONS.ACTION_AUTH_LOGOUT;
}

export interface AuthErrorAction {
	type: AUTH_ACTIONS.ACTION_AUTH_ERROR;
	error: any;
}

export interface AuthSuccessAction {
	type: AUTH_ACTIONS.ACTION_AUTH_SUCCESS;
}

export interface AuthClearErrorAction {
	type: AUTH_ACTIONS.ACTION_AUTH_CLEAR_ERROR;
}

export interface AuthGetUserAction {
	type: AUTH_ACTIONS.ACTION_AUTH_GET_USER;
}

export interface AuthGetUserSuccessAction {
	type: AUTH_ACTIONS.ACTION_AUTH_GET_USER_SUCCESS;
	user: IUser;
}

export interface IAuthUpdateUserAction {
	type: AUTH_ACTIONS.ACTION_AUTH_UPDATE_USER;
	userData: IUpdateUserData;
}

export interface IAuthUpdateUserSuccessAction {
	type: AUTH_ACTIONS.ACTION_AUTH_UPDATE_USER_SUCCESS;
	user: IUser;
}

export type AuthAction = AuthLoginAction
	| AuthRequestAction
	| AuthSignupAction
	| AuthLogoutAction
	| AuthErrorAction
	| AuthSuccessAction
	| AuthClearErrorAction
	| AuthGetUserSuccessAction
	| IAuthUpdateUserAction
	| IAuthUpdateUserSuccessAction;