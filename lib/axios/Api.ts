import axios from 'axios';
export const ApiClient = axios.create({
    baseURL: 'http://localhost:5003/v1/api',
});
