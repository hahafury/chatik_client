import {AccessTokens} from "../interfaces/auth";
import CONSTANTS from "../constants";

export default (tokens: AccessTokens): void => {
	localStorage.setItem(CONSTANTS.LOCAL_STORAGE_TOKEN_KEYS, JSON.stringify(tokens));
};
