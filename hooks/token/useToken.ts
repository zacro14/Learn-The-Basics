import { useSession } from 'next-auth/react';

type Token = {
    access_token: string;
    refresh_token: string;
};

export function useToken(): Token | undefined {
    const { data: session } = useSession();
    return session?.user.token;
}
