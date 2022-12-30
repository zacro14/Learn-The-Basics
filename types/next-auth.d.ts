import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            token: {
                access_token: string;
                refresh_token: string;
            };
            role: string;
            id: string;
            username: string;
        } & DefaultSession['user'];
    }
}
