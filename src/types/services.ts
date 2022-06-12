import {IRoom} from './chat';
import {IUser} from './auth';

export interface ISearchReturn {
	users: IUser[];
	rooms: IRoom[];
}