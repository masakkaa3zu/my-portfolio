import Link from "next/link";

export default function ProjectCard({ project }: any) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="aspect-video overflow-hidden bg-neutral-100">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="object-cover transition-opacity duration-150 group-hover:opacity-80"
        />
      </div>
      <p className="text-sm mt-2">{project.title}</p>
    </Link>
  );
}
