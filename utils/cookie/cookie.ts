import Cookies from 'js-cookie';
import Cookie from 'js-cookie';

export const SetCookie = (name: string, value: string) => {
    Cookie.set(name, value);
};

export const GetCookie = (name: string): string | undefined => {
    return Cookies.get(name);
};
