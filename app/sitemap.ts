import type { MetadataRoute } from "next";
import projects from "@/data/projects.json";

const siteUrl = "https://masakazusakakibara.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
    },
    ...projectUrls,
  ];
}
