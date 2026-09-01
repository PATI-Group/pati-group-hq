import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  typescript: { ignoreBuildErrors: true },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/p/:slug", destination: "/writing/:slug", permanent: true },
      { source: "/archive", destination: "/writing", permanent: true },
    ];
  },
};

export default nextConfig;
