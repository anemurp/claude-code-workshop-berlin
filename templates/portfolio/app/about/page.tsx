import { about, skills, experience, contact } from "../../content";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">{about.heading}</h1>
      <div className="mt-8 space-y-4 text-lg text-ink/80 leading-relaxed">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-8">
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#6B5CE7] text-white rounded-full text-sm font-medium hover:opacity-85 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download resume ↓
        </a>
      </div>

      <section className="mt-16 border-t border-ink/10 pt-10">
        <h2 className="text-2xl font-semibold mb-6">{skills.heading}</h2>
        <div className="space-y-5">
          {skills.groups.map((group, i) => (
            <div key={i} className="grid md:grid-cols-[120px_1fr] gap-3 md:gap-6">
              <p className="text-sm font-medium text-ink/60 pt-1">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-sm rounded-full border border-ink/15 bg-ink/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-ink/10 pt-10">
        <h2 className="text-2xl font-semibold mb-6">{experience.heading}</h2>
        <ul className="space-y-8">
          {experience.roles.map((role, i) => (
            <li key={i}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium">
                  {role.title} ·{" "}
                  <span className="text-ink/60">{role.company}</span>
                </h3>
                <span className="text-sm text-ink/50 shrink-0">{role.period}</span>
              </div>
              <p className="mt-2 text-ink/75 leading-relaxed">{role.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-ink/10 pt-10">
        <h2 className="text-2xl font-semibold mb-4">{contact.heading}</h2>
        <a
          href={`mailto:${contact.email}`}
          className="text-lg text-accent hover:underline"
        >
          {contact.email}
        </a>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink/70">
          {contact.socials.map((s, i) => (
            <li key={i}>
              <a
                href={s.href}
                className="hover:text-accent transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label} →
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
