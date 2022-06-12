import {AUTH_ACTIONS} from "./action-types";
import {IUser, Login, Signup} from "../../interfaces/auth";
import {
	AuthClearErrorAction,
	AuthErrorAction,
	AuthGetUserAction,
	AuthGetUserSuccessAction,
	AuthLoginAction,
	AuthLogoutAction,
	AuthRequestAction,
	AuthSignupAction,
	AuthSuccessAction, IAuthUpdateUserAction, IAuthUpdateUserSuccessAction
} from "./action-interfaces";
import {IUpdateUserData} from "./types";

export const authRequest = (): AuthRequestAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_REQUEST
});

export const getUser = (): AuthGetUserAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_GET_USER
});

export const getUserSuccess = (user: IUser): AuthGetUserSuccessAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_GET_USER_SUCCESS,
	user
});

export const login = (loginData: Login): AuthLoginAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_LOGIN,
	loginData: loginData
});

export const signup = (signupData: Signup): AuthSignupAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_SIGNUP,
	signupData: signupData
});

export const logout = (): AuthLogoutAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_LOGOUT
});

export const updateUser = (userData: IUpdateUserData): IAuthUpdateUserAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_UPDATE_USER,
	userData
});

export const updateUserSuccess = (user: IUser): IAuthUpdateUserSuccessAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_UPDATE_USER_SUCCESS,
	user
});

export const authError = (error: any): AuthErrorAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_ERROR,
	error: error.response
});

export const authSuccess = (): AuthSuccessAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_SUCCESS
});

export const authClearError = (): AuthClearErrorAction => ({
	type: AUTH_ACTIONS.ACTION_AUTH_CLEAR_ERROR
});