export const googleIcon = require('../../public/cdnlogo.com_google-icon.svg');
export const signupImage = require('../../public/devushka-belyi-fon-anime-3.jpg');
export const loadingSvg = require('../../public/Infinity-1s-200px.svg');
export const loginPageGif = require('../../public/7S7P.gif').default;

export enum API_CONSTANTS {
	DEV_API_HOST = 'localhost',
	DEV_API_PORT = 4000,
}

export const defaultGroupImageUrl = `http://${API_CONSTANTS.DEV_API_HOST}:${API_CONSTANTS.DEV_API_PORT}/public/default-group-plug.png`;

export default {
	BASE_URL: `http://${API_CONSTANTS.DEV_API_HOST}:${API_CONSTANTS.DEV_API_PORT}/`,
	PROD_URL: 'http://ec2-54-210-71-125.compute-1.amazonaws.com',
	SOCKET_CONNECTION: `http://${API_CONSTANTS.DEV_API_HOST}:${API_CONSTANTS.DEV_API_PORT}`,
	PROD_SOCKET_CONNECTION: 'http://ec2-54-210-71-125.compute-1.amazonaws.com/',
	LOCAL_STORAGE_TOKEN_KEYS: "TOKENS",
	LOCAL_STORAGE_REMEMBER_ME_KEY: "REMEMBER_ME",
	SOCKET_JOIN: 'join'
}
