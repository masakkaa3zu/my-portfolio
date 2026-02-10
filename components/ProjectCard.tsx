"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const { locale } = useLocale();
  const label =
    Array.isArray(project.tags) && project.tags.length > 0
      ? project.tags.join(" / ")
      : project.category[locale];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        group
        grid
        grid-cols-4
        gap-x-6 md:gap-x-8 lg:gap-x-16
        transition-colors duration-300
      "
    >
      {/* 1列目：テキスト情報（右揃え） */}
      <div className="col-span-1 flex flex-col items-end justify-start pt-1 space-y-1 text-right">
        <h3 className="text-xs font-futura-light tracking-[0.12em] uppercase leading-tight">
          {project.title}
        </h3>
        <p className="text-[10px] font-futura text-neutral-500">
          {label}
        </p>
        <span className="block text-[10px] font-futura text-neutral-400">
          {project.year}
        </span>
      </div>

      {/* 2〜3列目：画像 */}
      <div className="col-span-2 relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 75vw, (min-width: 768px) 75vw, 75vw"
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-[1.03]
          "
        />
      </div>
    </Link>
  );
}
