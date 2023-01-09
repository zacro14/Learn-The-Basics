import { ApiClientPrivate, ApiClientPublic } from './Api';

export async function refreshAccessToken(
    refreshToken: string
): Promise<string> {
    //NOTE: please see implementation for getting new access token in back-end
    const token = await ApiClientPublic.get('/auth/refresh', {
        headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (!token) {
        throw new Error('error in getting a refresh token ');
    }

    console.log('token', token);

    return token.data;
}
