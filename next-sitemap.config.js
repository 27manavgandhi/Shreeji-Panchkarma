/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://shreejipanchkarma.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/checkout", "/cart", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/checkout"] },
    ],
    additionalSitemaps: [
      "https://shreejipanchkarma.com/sitemap.xml",
    ],
  },
  transform: async (config, path) => {
    // Higher priority for main pages
    const priorities: Record<string, number> = {
      "/": 1.0,
      "/treatments": 0.9,
      "/shop": 0.85,
      "/about": 0.8,
      "/contact": 0.85,
      "/blog": 0.75,
    };
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: priorities[path] ?? 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
