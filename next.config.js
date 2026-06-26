/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — generates ./out/ for Cloudflare Pages / any static host
  output: 'export',
  // Required when using output: 'export' (Next.js Image Optimization needs a server)
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'cdn.prod.website-files.com'],
  },
  // Trailing slash for clean URLs on static hosts
  trailingSlash: true,
};
module.exports = nextConfig;
