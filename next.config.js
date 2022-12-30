/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        API_BASE_URL: 'http://localhost:5003/v1/api',
        NEXTAUTH: 'http://localhost:3001',
    },
};

module.exports = nextConfig;
