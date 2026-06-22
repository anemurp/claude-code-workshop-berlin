import { Download } from "lucide-react";
import { about } from "../content";

export function About() {
  return (
    <section id="about" className="py-16 border-t border-ink/10">
      <h2 className="text-3xl font-semibold mb-6">{about.heading}</h2>
      <div className="space-y-4 text-lg text-ink/80 leading-relaxed">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-8">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#0F0F0F] hover:text-white"
          style={{
            padding: "10px 20px",
            borderRadius: 999,
            border: "1px solid #0F0F0F",
            color: "#0F0F0F",
            background: "transparent",
            textDecoration: "none",
          }}
        >
          <Download size={16} />
          Resume
        </a>
      </div>
    </section>
  );
}
