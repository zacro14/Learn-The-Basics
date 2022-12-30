import { ApiClientPublic } from 'lib/axios/Api';
import { refreshAccessToken } from 'lib/axios/refreshToken';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';

type AuthUser = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        username: string;
        role: string;
    };
};

type Credential = {
    usernameOrEmail: string;
    password: string;
};

type Token = {
    access_token: string;
    refresh_token: string;
    id: string;
};

const Session = {
    session: {
        strategy: 'jwt',
    },
};

const providers = [
    CredentialProvider({
        name: 'Credential',
        credentials: {},
        authorize: async (credentials: Credential) => {
            const payload = {
                username: credentials.usernameOrEmail,
                password: credentials.password,
            };
            const { data } = await ApiClientPublic.post<AuthUser>(
                '/auth/signin',
                {
                    ...payload,
                }
            );
            if (data) {
                return data;
            }
            return null;
        },
    }),
];

const callbacks = {
    async jwt({ token, user }: any) {
        console.log('user => ', user);
        console.log('token', token);

        if (user) {
            token.access_token = user.accessToken;
            token.refresh_token = user.refreshToken;
            token.user = user.user;
        }

        return token;
    },

    async session({ session, token }: any) {
        session.token = {
            refresh_token: token.refresh_token,
            access_token: token.access_token,
        };
        session.user = token.user;
        return session;
    },
};

const Options = {
    providers,
    callbacks,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default NextAuth(Options);
