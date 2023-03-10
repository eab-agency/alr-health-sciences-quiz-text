/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/submit:path*',
                destination: 'https://go.cappex-health.com/form/submit:path*',
            },
        ];
    },
};

module.exports = nextConfig;
