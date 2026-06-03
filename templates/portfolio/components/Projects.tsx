import { projects } from "../content";

export function Projects() {
  return (
    <section id="projects" className="py-16 border-t border-ink/10">
      <h2 className="text-3xl font-semibold mb-8">{projects.heading}</h2>
      <ul className="space-y-10">
        {projects.items.map((p, i) => (
          <li key={i} className="group">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-medium group-hover:text-accent transition">
                {p.title}
              </h3>
            </div>
            <p className="mt-3 text-ink/75 leading-relaxed max-w-2xl">
              {p.summary}
            </p>
            {p.link && (
              <a
                href={p.link.href}
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
              >
                {p.link.label} →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
