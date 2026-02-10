import projects from "@/data/projects.json";
import type { Project } from "@/data/projects";
import ProjectDetailContent from "@/components/ProjectDetailContent";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = (projects as Project[]).find((p) => p.slug === slug);

  return <ProjectDetailContent project={project} />;
}
