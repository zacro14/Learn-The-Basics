import { ApiClientPrivate } from 'lib/axios/Api';

type User = {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: 'ADMIN' | 'TEACHER' | 'USER';
    isActive: boolean;
};

export async function fetchUser(userId: string | undefined): Promise<User> {
    try {
        const { data } = await ApiClientPrivate.get(`/user/${userId}`);
        return data;
    } catch (error) {
        throw new Error();
    }
}
