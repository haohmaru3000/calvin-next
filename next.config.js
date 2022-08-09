/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  env: {
    siteTitle: "Doggy Stickers",
    siteDescription: "Get some Doggy Stickers!",
    siteKeywords: "dog, stickers, fun",
    siteUrl: "https://www.doggystickers.xyz",
    siteImagePreviewUrl: "/images/main.jpg",
    twitterHandle: "@deepwhitman",
  },
};

module.exports = nextConfig;
