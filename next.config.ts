import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "backend.chiv0037.online",
      "stage-event-platform-bucket.s3.me-south-1.amazonaws.com",
      "event-platform-bucket-production.s3.me-south-1.amazonaws.com"
    ]
  }
};

export default nextConfig;
