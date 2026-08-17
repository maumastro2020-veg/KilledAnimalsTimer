import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useOffline: true,
  },
  async headers() {
    return [
      {
        // Never cache the service worker script itself, or fixes to its
        // caching logic (like this one) can't reach devices already running it.
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
