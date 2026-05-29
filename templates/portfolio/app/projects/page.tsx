import { hackathonProjects } from "../../content";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">Projects</h1>
      <p className="mt-4 text-lg text-ink/75 leading-relaxed max-w-xl">
        {hackathonProjects.intro}
      </p>
      <ul className="mt-12">
        {hackathonProjects.items.map((p, i) => (
          <li key={i} className="group border-t border-ink/10 py-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-medium group-hover:text-accent transition">
                {p.title}
              </h2>
              <span className="text-sm text-ink/50 shrink-0">{p.year}</span>
            </div>
            <p className="mt-3 text-ink/75 leading-relaxed">{p.summary}</p>
            {p.link && (
              <a
                href={p.link.href}
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.link.label} →
              </a>
            )}
          </li>
        ))}
        <li className="border-t border-ink/10" />
      </ul>
    </main>
  );
}
