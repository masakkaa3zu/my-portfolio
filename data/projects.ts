// data/projects.ts

import projectsJson from "./projects.json";

export type LocalizedString = { ja: string; en: string };

export type Project = {
  slug: string;
  title: string;
  category: LocalizedString;
  year: string;
  thumbnail: string;
  featured: boolean;
  focus: "bottom" | "bottom-zoom" | "center" | "top";
  images: string[];
  description: LocalizedString;
  tags?: string[];
};

export const projects = projectsJson as Project[];

export const featuredProjects = projects.filter((p) => p.featured);
export const nonFeaturedProjects = projects.filter((p) => !p.featured);
export const findProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
