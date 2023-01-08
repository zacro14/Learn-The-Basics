import axios, { AxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './refreshToken';
import { getSession } from 'next-auth/react';

type Token = {
    access_token: string;
    refresh_token: string;
};
async function getToken(): Promise<Token | null> {
    const session = await getSession();
    return session ? session.user.token : null;
}

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
        const token = await getToken();
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
        const token = await getToken();
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (token) {
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
