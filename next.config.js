const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        // Optionally, specify a port if your external images are served on a specific port
        port: "", // Leave empty if not required
        // Optionally, specify a pathname pattern if you want to restrict to certain paths
        pathname: "/**", // '**' means any path under this hostname is allowed
      },
    ],
  },
  webpack: (config, options) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
