/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
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
                destination: 'https://go.cappexhealth.com/form/submit:path*',
            },
            {
                source: '/api/acs/:slug',
                destination: 'https://go.cappexhealth.com/api/:slug',
            },
        ];
    },
};

module.exports = nextConfig;
