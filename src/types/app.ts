import {searchRooms, searchUsers} from '../api/services/chat';
import {IUseModalStyles} from "../hooks/useModal";

export type SettingsModalType = "EDIT-PROFILE" | "EDIT-APP";

export const ApiCalls = {
	search: searchRooms,
	searchUsers: searchUsers,
}

export interface ICustomFile {
	filename: string;
	file: Blob;
}

export interface IModalService {
	show: (content: any, styles?: IUseModalStyles) => void;
	hide: () => void;
}
