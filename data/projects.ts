// data/projects.ts

import projectsJson from "./projects.json";

export type LocalizedString = { ja: string; en: string };

export type Project = {
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  year: string;
  thumbnail: string;
  featured: boolean;
  focus: "bottom" | "bottom-zoom" | "center" | "top";
  images: string[];
  description: LocalizedString;
  visible?: boolean;
  tags?: string[];
  collaborators?: { ja: string; en: string }[];
};

const allProjects = projectsJson as Project[];

export const projects = allProjects.filter((p) => p.visible !== false);
export const featuredProjects = projects.filter((p) => p.featured);
export const nonFeaturedProjects = projects.filter((p) => !p.featured);
export const findProjectBySlug = (slug: string) =>
  allProjects.find((p) => p.slug === slug);
