"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/data/translations";
import type { Project } from "@/data/projects";

type Props = {
  project: Project | undefined;
};

export default function ProjectDetailContent({ project }: Props) {
  const { locale } = useLocale();

  if (!project) {
    return <div className="p-10">{t.projectNotFound[locale]}</div>;
  }

  return (
    <div className="w-full">
      {/* ヒーロー画像：幅いっぱい */}
      <img
        src={project.thumbnail}
        className="w-full h-screen object-cover"
        alt={project.title[locale]}
        style={{
          objectPosition:
            project.focus === "top" || project.focus === "top-zoom" ? "center top" :
            project.focus === "bottom" || project.focus === "bottom-zoom" ? "center bottom" :
            "center center",
          ...(project.focus === "top-zoom" ? { transformOrigin: "top center", transform: "scale(1.2)" } :
             project.focus === "bottom-zoom" ? { transformOrigin: "bottom center", transform: "scale(1.2)" } :
             {}),
        }}
      />

      <div
        className="
          px-6 md:px-8 lg:px-16
          pt-10 pb-24
          grid
          grid-cols-4
          gap-x-6 md:gap-x-8 lg:gap-x-16
        "
      >
        {/* テキスト情報：2〜3列目 */}
        <div className="col-span-4 md:col-span-2 md:col-start-2 mt-10">
          <h1 className="text-lg font-futura-light tracking-[0.12em]">{project.title[locale]}</h1>
          <p className="mt-2 text-[10px] font-futura text-neutral-500">
            {project.category[locale]}
          </p>
          <span className="block text-[10px] font-futura text-neutral-400">
            {project.year}
          </span>
          {project.collaborators && project.collaborators.length > 0 && (
            <p className="mt-1 text-[10px] font-futura text-neutral-400">
              {locale === "ja" ? "共同設計：" : "with "}{project.collaborators.map((c) => c[locale]).join(", ")}
            </p>
          )}
          {project.assistants && project.assistants.length > 0 && (
            <p className="mt-1 text-[10px] font-futura text-neutral-400">
              {locale === "ja" ? "制作補助：" : "Production Assistant: "}{project.assistants.map((a) => a[locale]).join(", ")}
            </p>
          )}
          <p className="mt-4 text-[13px] leading-loose">{project.description[locale]}</p>
        </div>

        {/* 詳細画像：2〜3列目 */}
        {project.images.map((img) => (
          <div key={img} className="col-span-4 md:col-span-2 md:col-start-2 mt-10">
            <img src={img} className="w-full" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
