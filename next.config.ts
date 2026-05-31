import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/docs/[[...slug]]": ["./content/**/*.mdx"],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;