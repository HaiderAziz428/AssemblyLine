/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.assemblylineworkshop.com",
  generateRobotsTxt: true,

  // SEO Optimizations
  changefreq: "weekly", // More realistic than daily for most content
  priority: 0.7,
  sitemapSize: 7000, // Split large sitemaps for better crawling

  // Generate additional sitemaps
  generateIndexSitemap: true,

  // Exclude unnecessary pages
  exclude: [
    "/api/*",
    "/admin/*",
    "/private/*",
    "/404",
    "/500",
    "/_*",
    "/sitemap*.xml",
    "/robots.txt",
  ],

  // Custom robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"], // Block AI crawlers if desired
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed
      // 'https://www.assemblylineworkshop.com/news-sitemap.xml',
    ],
  },

  // Transform function for dynamic URLs
  transform: async (config, path) => {
    // Custom priority based on page importance
    const customPriority = {
      "/": 1.0,
      "/about": 0.9,
      "/services": 0.9,
      "/contact": 0.8,
    };

    // Custom change frequency based on content type
    const customChangeFreq = {
      "/": "daily",
      "/blog": "weekly",
      "/services": "monthly",
    };

    return {
      loc: path,
      changefreq: customChangeFreq[path] || config.changefreq,
      priority: customPriority[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },

  // Auto-generate lastmod
  autoLastmod: true,

  // Additional SEO enhancements
  trailingSlash: false, // Consistent URL structure

  // Custom additional paths (if you have dynamic routes)
  additionalPaths: async (config) => {
    // Example: Add dynamic service pages
    // const services = await getServices();
    // return services.map(service => ({
    //   loc: `/services/${service.slug}`,
    //   changefreq: 'monthly',
    //   priority: 0.8,
    //   lastmod: service.updatedAt
    // }));
    return [];
  },
};
