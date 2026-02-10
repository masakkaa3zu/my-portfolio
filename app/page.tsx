import HeroSlider from "@/components/HeroSlider";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      {/* 下の project グリッド部分 */}
      <section id="projects" className="px-6 md:px-8 lg:px-16 pt-24 pb-24">
        {/* DevGridOverlay と同じ 4 列グリッド + gap を再現 */}
        <div
          className="
            grid
            grid-cols-4
            gap-x-6 md:gap-x-8 lg:gap-x-16
          "
        >
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </main>
  );
}
