import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBaseUrl =
      process.env.BREASTCARE_API_BASE_URL ?? process.env.BREASTCARE_API_URL;

    if (!apiBaseUrl) {
      return [];
    }

    return [
      {
        source: "/api/report-intelligence/:path*",
        destination: `${apiBaseUrl}/api/report-intelligence/:path*`,
      },
    ];
  },
};

export default nextConfig;
