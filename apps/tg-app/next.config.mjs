/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/TechTask-TransferGo-2024/app",
  output: "export",
  transpilePackages: ["tg-ui"],
  distDir: "../../docs/app",
};

export default nextConfig;
