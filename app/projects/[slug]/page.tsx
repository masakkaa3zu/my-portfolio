import projects from "@/data/projects.json";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← これが Next.js 16 の必須ポイント！

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="p-10">Project not found</div>;
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-10">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full mb-10"
      />

      <h1 className="text-4xl font-semibold mb-6">{project.title}</h1>

      <p className="text-neutral-700 leading-relaxed mb-12">
        {project.description}
      </p>

      {project.images.map((img: string) => (
        <img key={img} src={img} className="w-full my-10" />
      ))}

      <div className="border-t border-neutral-200 mt-16 pt-6 text-sm text-neutral-500">
        <p><b>Year:</b> {project.year}</p>
        <p><b>Category:</b> {project.category}</p>
      </div>
    </div>
  );
}
