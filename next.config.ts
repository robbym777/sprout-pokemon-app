import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove `output: "export"` to allow SSR
  // output: "export",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      }
    ]
  }
};

export default nextConfig;
