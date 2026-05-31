import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/docs/**": ["./content/docs/**/*.mdx"],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;