import axios from 'axios';
export const ApiClientPublic = axios.create({
    baseURL: process.env.API_BASE_URL,
});

export const ApiClientPrivate = axios.create({
    withCredentials: true,
    baseURL: process.env.API_BASE_URL,
});
