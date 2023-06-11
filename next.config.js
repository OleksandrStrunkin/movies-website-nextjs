/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true,
  },
    images: {
      domains: ['image.tmdb.org', 'www.themoviedb.org', 'media.kitsu.io'],
    },
  };
  
  module.exports = nextConfig;