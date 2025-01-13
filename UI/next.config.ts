import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            }, {
                protocol: 'https',
                hostname: 'judoinfo.com',
            },{
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
        ],
    }
};

export default nextConfig;
