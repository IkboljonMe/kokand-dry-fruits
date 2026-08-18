/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Uy katalogidagi begona lockfile tanlanmasligi uchun ildiz aniq ko'rsatiladi.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
