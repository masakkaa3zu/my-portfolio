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
      {/* デスクトップ：1列目テキスト情報（右揃え） */}
      <div className="hidden md:flex col-span-1 flex-col items-end justify-start pt-1 space-y-1 text-right">
        <h3 className="text-xs font-futura-light tracking-[0.12em] uppercase leading-tight">
          {project.title[locale]}
        </h3>
        <p className="text-[10px] font-futura text-neutral-500">
          {label}
        </p>
        <span className="block text-[10px] font-futura text-neutral-400">
          {project.year}
        </span>
      </div>

      {/* 画像：モバイル4列、デスクトップ2列 */}
      <div className="col-span-4 md:col-span-2 relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={project.thumbnail}
          alt={project.title[locale]}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-[1.03]
          "
        />
      </div>

      {/* モバイル：画像下にテキスト情報 */}
      <div className="col-span-4 md:hidden mt-2 space-y-1">
        <h3 className="text-xs font-futura-light tracking-[0.12em] uppercase leading-tight">
          {project.title[locale]}
        </h3>
        <p className="text-[10px] font-futura text-neutral-500">
          {label}
        </p>
        <span className="block text-[10px] font-futura text-neutral-400">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
