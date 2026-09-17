import type { NextConfig } from "next";
import { INVITE_URL, SUPPORT_URL } from "./src/lib/data";

const nextConfig: NextConfig = {
  /* config options here */
  // Local LAN origin for on-device testing. Only set when DEV_IP is
  // defined — otherwise Next would see the literal string "undefined".
  ...(process.env.DEV_IP ? { allowedDevOrigins: [process.env.DEV_IP] } : {}),
  async redirects() {
    return [
      {
        source: "/invite",
        destination: INVITE_URL,
        permanent: false,
      },
      {
        source: "/support",
        destination: SUPPORT_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
