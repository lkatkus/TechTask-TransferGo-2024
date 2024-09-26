/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["tg-ui"],
  distDir: "../../docs/app",
};

export default nextConfig;
