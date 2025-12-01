import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const label =
    Array.isArray(project.tags) && project.tags.length > 0
      ? project.tags.join(" / ")
      : project.category; // ← なければ category

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        group
        block
        border border-neutral-200
        hover:border-neutral-400
        transition-colors duration-300
      "
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-[1.03]
          "
        />
      </div>

      <div className="px-4 py-3 space-y-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm tracking-[0.16em] uppercase">
            {project.title}
          </h3>
          <span className="text-[11px] text-neutral-500">
            {project.year}
          </span>
        </div>

        <p className="text-[11px] text-neutral-500">
          {label}
        </p>

        <p className="mt-1 text-[11px] leading-snug text-neutral-700 line-clamp-2">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
