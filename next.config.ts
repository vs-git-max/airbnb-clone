import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "1h3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
