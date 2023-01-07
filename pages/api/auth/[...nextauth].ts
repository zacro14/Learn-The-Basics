import { ApiClientPublic } from 'lib/axios/Api';
import { refreshAccessToken } from 'lib/axios/refreshToken';
import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';

type AuthUser = {
    user: {
        token: {
            accessToken: string;
            refreshToken: string;
        };
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
            const { data } = await ApiClientPublic.post('/auth/signin', {
                ...payload,
            });
            if (data) {
                return data;
            }
            return null;
        },
    }),
];

const callbacks = {
    async signIn() {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
            return true;
        } else {
            return '/auth/sign-in';
        }
    },
    async jwt({ token, user }: any) {
        if (user) {
            token.token = {
                access_token: user.accessToken,
                refresh_token: user.refreshToken,
            };

            token.user = user.user;
        }

        return token;
    },

    async session({ session, token }: any) {
        console.log('token =>', token);
        console.log('session', session);
        session.user = {
            token: {
                refresh_token: token.token.refresh_token,
                access_token: token.token.access_token,
            },
            ...token.user,
        };
        return session;
    },
};

const pages = {
    error: '/auth/sign-in',
};

const Options = {
    pages,
    providers,
    callbacks,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default NextAuth(Options);
