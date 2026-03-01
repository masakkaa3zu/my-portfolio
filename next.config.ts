import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination:
          "https://github.com/masakkaa3zu/my-portfolio/releases/download/:path*",
      },
    ];
  },
};

export default nextConfig;
