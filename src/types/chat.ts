import {IUser} from "./auth";

export type RoomType = 'private' | 'public';

export class RoomTypeValue {
	static PRIVATE: RoomType = 'private';
	static PUBLIC: RoomType = 'public';
}

export interface IRoom {
	_id: string;
	members: IUser[];
	type: RoomType;
	preview?: IMessage;
	messages: IMessage[];
	properties?: IGroupProperties;
}

export interface IGroupProperties {
	author: IUser;
	name: string;
	photo?: string;
}

export interface IMessage {
	_id: string;
	sender: IUser;
	roomId: string;
	body?: string;
	images?: string[];
	createdAt: string;
	updatedAt: string;
}
