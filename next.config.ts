import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "https://freshmart-backend-1piv.onrender.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
