import axios, { AxiosRequestConfig } from 'axios';
import { useToken } from 'hooks/token/useToken';
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
    async (config: AxiosRequestConfig) => {
        const token = useToken();
        config.headers!.Authorization = `Bearer ${token?.access_token}`;
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
        console.log('error', error);
        const token = useToken();
        console.log('token', token);

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (token?.refresh_token) {
                return refreshAccessToken(token.refresh_token).then(
                    (accesToken) => {
                        originalRequest.headers[
                            'Authorization'
                        ] = `Bearer ${accesToken}`;

                        return ApiClientPrivate(originalRequest);
                    }
                );
            }
        }
    }
);
