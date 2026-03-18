import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    loader: "custom",
    loaderFile: "./src/utils/image-loader/image-loader.ts",
  },
};

export default nextConfig;
