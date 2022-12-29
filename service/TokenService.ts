import { GetCookie } from 'utils/cookie/cookie';

const token = () => {
    const access_token = GetCookie('token');
    return access_token;
};
const TokenService = {
    token,
};
export default TokenService;
