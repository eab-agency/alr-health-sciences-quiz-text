/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{
            source: '/quiz',
            destination: 'https://www.advance.appily.com/careers/healthcare/quiz',
            permanent: true,
        },
        {
            source: '/:path*',
            destination: 'https://www.advance.appily.com/careers/healthcare/:path*',
            permanent: true,
        }]
    },
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
                destination: 'https://go.advance.appily.com/form/submit:path*',
            },
            {
                source: '/api/acs/:slug',
                destination: 'https://go.advance.appily.com/api/:slug',
            },
        ];
    },
};

module.exports = nextConfig;
