/** @type {import('next').NextConfig} */
const nextConfig = {
    // ignoreBuildErrors: true,
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    async headers() {
        return [
            {
                source: "/(.*)", // apply to all routes
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                ],
            },
        ];
    },

};

// next.config.js

export default nextConfig;

