import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/docs/**": ["./docs/**/*.mdx"],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;