import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/docs/[[...slug]]": ["./content/docs/**/*.mdx"],
  },
};

export default nextConfig;
