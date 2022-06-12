import {AxiosResponse} from 'axios';
import http from '../interceptor';
import {IAccessTokens, IUser} from '../../types/auth';
import {ILogin, ISignup} from '../../interfaces/auth';

/**
 * User login request
 * 
 * @param loginData
 */
export const loginRequest = (loginData: ILogin): Promise<AxiosResponse<IAccessTokens>> => http.post('/login', loginData);

/**
 * User signup request
 *
 * @param signupData
 */
export const signUpRequest = (signupData: ISignup): Promise<AxiosResponse<IAccessTokens>> => http.post('/signup', signupData);

/**
 * Get user request
 */
export const getUserRequest = (): Promise<AxiosResponse<IUser>> => http.get('/user');
