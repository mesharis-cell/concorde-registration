import type { NextConfig } from "next";

const imageDomainCandidates = [
  "tailwindui.com",
  "images.unsplash.com",
  "stage-event-platform-bucket.s3.me-south-1.amazonaws.com",
  "event-platform-bucket-production.s3.me-south-1.amazonaws.com"
];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (apiBaseUrl) {
  try {
    imageDomainCandidates.push(new URL(apiBaseUrl).hostname);
  } catch {
    // Ignore invalid URL values and keep static domain list.
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [...new Set(imageDomainCandidates)]
  }
};

export default nextConfig;
