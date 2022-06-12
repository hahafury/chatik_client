 import {put} from 'redux-saga/effects';
import * as authService from '../api/services/auth';
import {authError, authRequest, authSuccess, getUserSuccess} from '../actions/auth/action-creators';
import {AuthLoginAction, AuthSignupAction, IAuthUpdateUserAction} from "../actions/auth/action-interfaces";
import setTokens from "../helpers/set-tokens";
import {toast} from "react-toastify";
import * as chatService from "../api/services/chat";
import {chatError} from "../actions/chat/action-creators";

export function* login(action: AuthLoginAction) {
	yield put(authRequest());
	try {
		const {data} = yield authService.loginRequest(action.loginData);
		setTokens(data);
		yield put(authSuccess());
	} catch (error: any) {
		yield put(authError(error));
		toast.error(error.response.data);
	}
}

export function* signup(action: AuthSignupAction) {
	yield put(authRequest());
	try {
		const {data} = yield authService.signUpRequest(action.signupData);
		setTokens(data);
		yield put(authSuccess());
	} catch (error: any) {
		yield put(authError(error));
		toast.error(error.response.data);
	}
}

export function* getUser() {
	yield put(authRequest());
	try {
		const {data} = yield authService.getUserRequest();
		yield put(getUserSuccess(data));
	} catch (error: any) {
		yield put(authError(error));
		toast.error(error.response.data);
	}
}

export function* updateUser(action: IAuthUpdateUserAction) {
	try {
		const formData: FormData = new FormData();
		if (action.userData.photo) {
			formData.append('photo', action.userData.photo.file, action.userData.photo.filename);
		}
		formData.append('userData', JSON.stringify(action.userData));
		yield chatService.updateUserRequest(formData);
	} catch (error: any) {
		yield put(chatError(error));
		toast.error(error.response.data);
	}
}

// export function* refreshToken(action) {
// 	yield put(request());
// 	try {
// 		const { data } = yield authService.refreshToken(action.data);
// 		setToken(data);
// 	} catch (error) {
// 		yield put(authError(error));
// 	}
// }