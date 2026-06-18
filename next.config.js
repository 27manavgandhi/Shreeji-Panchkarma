/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    minimumCacheTTL: 86400,
  },
  // Enable MDX
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    optimizeCss: true,
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  // Redirects for old URLs (if migrating)
  async redirects() {
    return [
      {
        source: "/panchakarma",
        destination: "/treatments/panchakarma",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
