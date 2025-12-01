import HeroSlider from "@/components/HeroSlider";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section className="px-6 md:px-8 lg:px-16 pt-24 pb-24">
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}
