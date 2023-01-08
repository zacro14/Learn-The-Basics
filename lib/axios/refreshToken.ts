import { ApiClientPrivate, ApiClientPublic } from './Api';

export async function refreshAccessToken(
    refreshToken: string
): Promise<string> {
    //NOTE: please see implementation for getting new access token
    console.log('token', refreshToken);
    return ApiClientPublic.get('/auth/refresh', {
        headers: { Authorization: `Bearer ${refreshToken}` },
    }).then((response) => response.data.accessToken);
}
