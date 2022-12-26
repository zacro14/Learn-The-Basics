import { ApiClientPublic } from 'lib/axios/Api';

export async function GetCategory() {
    const { data } = await ApiClientPublic.get('/category');
    if (!data) {
        throw new Error('error');
    }
    return data;
}
