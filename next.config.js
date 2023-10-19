/** @type {import('next').NextConfig} */
const nextConfig = {
    // async redirects() {
    //     return [{
    //         source: '/:path*',
    //         destination: 'https://advance.appily.com',
    //         permanent: true,
    //     }]
    // },
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
