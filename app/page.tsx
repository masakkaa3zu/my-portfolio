import projects from "@/data/projects.json";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
