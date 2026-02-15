import projects from "@/data/projects.json";
import type { Project } from "@/data/projects";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (projects as Project[]).find((p) => p.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title.en} | ${project.title.ja}`,
    description: project.description.ja.slice(0, 160),
    openGraph: {
      title: `${project.title.en} | ${project.title.ja}`,
      description: project.description.en.slice(0, 160),
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;

  const project = (projects as Project[]).find((p) => p.slug === slug);

  return <ProjectDetailContent project={project} />;
}
