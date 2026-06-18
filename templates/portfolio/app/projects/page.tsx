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

      <div className="mt-8 flex justify-center">
        <a
          href="#ai-philosophy"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#6B5CE7] px-6 text-sm font-medium text-white transition-colors hover:bg-[#5849d6]"
        >
          Read how I use AI
        </a>
      </div>

      <div className="mt-32">
        <AiProjectCards />
      </div>

      {/* TODO: Add future AI project cards here */}

      <AIProcess />
    </main>
  );
}
