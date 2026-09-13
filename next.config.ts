import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.11'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn-cf.behance.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.behance.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
