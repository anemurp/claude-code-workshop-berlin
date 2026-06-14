import { hackathonProjects } from "../../content";
import { AiProjectCards } from "../../components/AiProjectCards";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">AI Projects</h1>
      <p className="mt-4 text-lg text-ink/75 leading-relaxed">
        {hackathonProjects.intro}
      </p>

      <div className="mt-12">
        <AiProjectCards />
      </div>

      {/* TODO: Add future AI project cards here */}
    </main>
  );
}
