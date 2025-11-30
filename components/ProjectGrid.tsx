import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project: any) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
