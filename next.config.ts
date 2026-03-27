import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // We will use unoptimized since images hosted on external social media CDNs can be very dynamic
  }
};

export default nextConfig;
