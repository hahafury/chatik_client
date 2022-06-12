import http from '../interceptor';
import {AxiosResponse} from "axios";
import {IMessage, IRoom} from "../../types/chat";
import {ChatGetRoomPredicate} from "../../actions/chat/action-interfaces";
import {IUser} from "../../interfaces/auth";
import {ICreateGroupParams} from "./services";
import {ISearchReturn} from "../../types/services";

/**
 * Get rooms by specific params
 *
 * @param params
 */
export const getRooms = (params?: any): Promise<AxiosResponse<IRoom[]>> => http.get('/rooms', params);

/**
 * Get room by specific predicate
 *
 * @param predicate
 */
export const getRoom = (predicate: ChatGetRoomPredicate): Promise<AxiosResponse<IRoom>> => http.get('/room', {
	params: {...predicate}
});

/**
 * Send message to specific target(roomId or recipientId)
 *
 * @param formData
 */
export const sendMessage = (formData: FormData): Promise<AxiosResponse<IMessage>> => http.post('/message', formData, {
	headers: {
		'Content-type': 'multipart/form-data'
	}
});

/**
 * Search rooms by room name
 *
 * @param name
 */
export const searchRooms = (name: string): Promise<AxiosResponse<ISearchReturn>> => http.get('/rooms/search', {
	params: {name}
});

/**
 * Get room messages
 *
 * @param params
 * @deprecated
 */
export const getRoomMessages = (params: object): Promise<AxiosResponse<IRoom[]>> => http.get('/messages', {
	params
});

/**
 * Get contacts by user private rooms
 *
 * @returns users
 */
export const getContacts = (): Promise<AxiosResponse<IUser[]>> => http.get('/contacts');

/**
 * Create group with specific params
 *
 * @returns room
 * @param formData
 */
export const createGroup = (formData: FormData): Promise<AxiosResponse<IRoom>> => http.post('/group', formData, {
	headers: {
		'Content-type': 'multipart/form-data'
	}
});

/**
 * Search users by username
 *
 * @param username
 * @returns user
 */
export const searchUsers = (username: string): Promise<AxiosResponse<IUser[]>> => http.get('/users', {params: {username}});

/**
 * Updates user request
 *
 * @param formData
 * @returns user
 */
export const updateUserRequest = (formData: FormData): Promise<AxiosResponse<IUser>> => http.patch('/user', formData, {
	headers: {
		'Content-type': 'multipart/form-data'
	}
});
