export interface ILogin {
	email: string;
	password: string;
	rememberMe?: string[];
}

export interface ISignup {
	username: string;
	email: string;
	password: string;
	phone: string;
}

export interface IAccessTokens {
	accessToken: string;
	refreshToken: string;
}

export interface IUser {
	_id: string;
	username: string;
	password: string;
	email: string;
	phone: string;
	bio?: string;
	photo: string;
	lastRoomId?: any
}