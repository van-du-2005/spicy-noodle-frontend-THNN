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
      {
        protocol: 'https',
        hostname: 'cdn2.fptshop.com.vn', // Cho phép link từ FPT Shop
      },
      {
        protocol: 'https',
        hostname: '**', // (Mẹo nhỏ) Dấu ** này cho phép TẤT CẢ các link ảnh trên mạng để bạn tiện test dữ liệu
      },
      {
        protocol: 'https',
        hostname: 'vinwonders.com', 
      }
    ],
  },
};

export default nextConfig;
