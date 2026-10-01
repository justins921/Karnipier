import type { MetadataRoute } from "next";

const pages = ["", "/designs", "/services", "/projects", "/about", "/classifieds", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `https://www.pierstoyou.com${p}`, lastModified: new Date() }));
}
