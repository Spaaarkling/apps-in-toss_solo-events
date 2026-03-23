import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist/web',
  trailingSlash: true,
};

export default nextConfig;
