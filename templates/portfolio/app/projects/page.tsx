import { AiProjectCards } from "../../components/AiProjectCards";
import { AIProcess } from "../../components/AIProcess";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-16 pb-32">
      <h1 className="text-4xl font-bold leading-[1.25]">
        <span className="block text-ink">
          AI didn&apos;t replace the design thinking.
        </span>
        <span className="block text-[color:var(--accent-purple)]">
          It collapsed the gap between idea and shipped.
        </span>
      </h1>

      <div className="mt-32">
        <AiProjectCards />
      </div>

      {/* TODO: Add future AI project cards here */}

      <AIProcess />
    </main>
  );
}
