"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function ProjectCard({ project }: any) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}
      `}
    >
      <Link href={`/projects/${project.slug}`} className="group block w-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
        </div>

        <h2 className="mt-6 text-2xl font-light tracking-wide">
          {project.title}
        </h2>
      </Link>
    </div>
  );
}
