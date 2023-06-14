/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.wired.com', 'rdhgkxlkgwfskhjqbykd.supabase.co'],
  },
};

//empty string: insert project url from error if above dont work

module.exports = nextConfig;
