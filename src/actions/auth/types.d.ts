import {ICustomFile} from '../../types/app';


export interface IUpdateUserData {
	username?: string;
	photo?: ICustomFile;
	phone?: string;
	bio?: string;
}