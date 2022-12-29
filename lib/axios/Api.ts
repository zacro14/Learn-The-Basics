import axios, { AxiosRequestConfig } from 'axios';
import TokenService from 'service/TokenService';
import { GetCookie } from 'utils/cookie/cookie';
import { refreshAccessToken } from './refreshToken';
export const ApiClientPublic = axios.create({
    baseURL: process.env.API_BASE_URL,
});

//TODO create an authorization bearer for private api endpoints
export const ApiClientPrivate = axios.create({
    withCredentials: true,
    baseURL: process.env.API_BASE_URL,
});

ApiClientPrivate.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = TokenService.token();
        if (typeof token !== undefined) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

ApiClientPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = GetCookie('refresh_token');
            if (refreshToken) {
                return refreshAccessToken(refreshToken).then((accesToken) => {
                    originalRequest.headers[
                        'Authorization'
                    ] = `Bearer ${accesToken}`;

                    return ApiClientPrivate(originalRequest);
                });
            }
        }
    }
);
