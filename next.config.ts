/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"], // ⬅️ السماح باستخدام الصور من هذا الدومين
  },
};

module.exports = nextConfig;
