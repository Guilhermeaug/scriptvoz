/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'guilhermeaug.me',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'scriptvoz.medicina.ufmg.br',
      },
    ],
  },
};

module.exports = nextConfig;
