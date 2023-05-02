/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.cappex.com',
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
            {
                source: '/api/acs/:slug',
                destination: 'https://go.cappex-health.com/api/:slug',
            },
        ];
    },
};

module.exports = nextConfig;
