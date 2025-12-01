import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: any) {
  return (
    <div className="w-full max-w-[900px] mx-auto space-y-32">
      {projects.map((project: any) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
