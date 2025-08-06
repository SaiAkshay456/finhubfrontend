// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // ✅ Required for Netlify static export
    reactStrictMode: true,

    images: {
        unoptimized: true, // ✅ Required if you're using <Image /> without image optimization
    },

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

export default nextConfig;
