import HeroSlider from "@/components/HeroSlider";
import ProjectGrid from "@/components/ProjectGrid";
import projects from "@/data/projects.json";

export default function Home() {
  return (
    <main className="w-full m-0 p-0">

      {/* ヒーロースライダー */}
      <HeroSlider />

      {/* グリッド */}
      <section className="w-full flex justify-center py-40 px-10">
        <div className="w-full max-w-[900px] space-y-32">
          {projects.map((p) => (
            <ProjectGrid key={p.slug} projects={projects} />
          ))}
        </div>
      </section>
    </main>
  );
}
