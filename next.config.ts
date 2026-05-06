// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com", 
      },
      {
        protocol: "https",
        hostname: "sasin.vn", 
        port: "8002",
      },
    ],
  },
};

export default nextConfig;
