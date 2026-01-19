/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '6060',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
