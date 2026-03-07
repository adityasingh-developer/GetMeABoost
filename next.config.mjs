/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
  },
};

export default nextConfig;
