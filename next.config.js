/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
