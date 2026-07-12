/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Never let the browser cache the service worker file itself, or
        // updates to caching logic can't roll out to already-installed users.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
