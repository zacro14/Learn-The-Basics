import { AxiosError } from 'axios';
import { ApiClientPublic } from 'lib/axios/Api';

type TCategory = {
    id: string;
    name: string;
    description: string;
};
export async function GetCategory(): Promise<TCategory[] | undefined> {
    try {
        const { data } = await ApiClientPublic.get('/category');
        return data;
    } catch (error) {
        throw new Error();
    }
}
