import projects from "@/data/projects.json";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="p-10">Project not found</div>;
  }

  return (
    <div className="w-full">
      <img
        src={project.thumbnail}
        className="w-full h-screen object-cover"
        alt={project.title}
      />

      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="mt-4">{project.description}</p>

        {project.images.map((img) => (
          <img key={img} src={img} className="mt-10 w-full" />
        ))}
      </div>
    </div>
  );
}
