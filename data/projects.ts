// data/projects.ts

import projectsJson from "./projects.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  featured: boolean;
  focus: "bottom" | "bottom-zoom" | "center" | "top";
  images: string[];
  description: string;
  tags?: string[]; // ← 将来 tags を追加したいとき用。今はなくてもOK
};

export const projects = projectsJson as Project[];

export const featuredProjects = projects.filter((p) => p.featured);
export const nonFeaturedProjects = projects.filter((p) => !p.featured);
export const findProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
