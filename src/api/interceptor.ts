import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import CONSTANTS from '../constants'

const instance: AxiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

/**
 * Interceptor for appending user tokens for each request
 */
instance.interceptors.request.use((config): AxiosRequestConfig => {
    const token = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_TOKEN_KEYS);
    if (token) {
        config.headers = { ...config.headers, Authorization: token }
    }
    return config;
}, (err) => Promise.reject(err));

export default instance;