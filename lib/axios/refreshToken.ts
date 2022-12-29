import axios from 'axios';

export async function refreshAccessToken(
    refreshToken: string
): Promise<string> {
    return axios
        .get('/auth/refresh', {
            headers: { Authorization: `Bearer ${refreshToken}` },
        })
        .then((response) => response.data.accessToken);
}
