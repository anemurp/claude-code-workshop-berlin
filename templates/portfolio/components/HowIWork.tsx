"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const rowVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const items = [
  {
    number: "01",
    headline: "Process-oriented, flexibly creative",
    description:
      "I know the frameworks — and I know when to bend them. The best solutions I've shipped came from asking \"what if we tried something completely different?\" within a structured approach.",
  },
  {
    number: "02",
    headline: "A connective thread between teams",
    description:
      "I'm in the engineering standups, the accessibility reviews, and the stakeholder presentations — often on the same day. Design doesn't ship in isolation. Neither do I.",
  },
  {
    number: "03",
    headline: "Research as alignment, not just insight",
    description:
      "Good research doesn't just tell you what to design — it tells everyone in the room why. I use it as a shared language to move teams from opinion to decision.",
  },
  {
    number: "04",
    headline: "AI as a thinking partner",
    description:
      "I use AI for discovery, synthesis, and rapid visualization — to arrive at conversations with something concrete enough to react to. The judgment is still mine.",
  },
];

export function HowIWork() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(number: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(number) ? next.delete(number) : next.add(number);
      return next;
    });
  }

  return (
    <section className="mx-auto max-w-3xl px-6" style={{ paddingTop: 112 }}>
      <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 600 }}>
        How I work
      </h2>

      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {items.map((item) => {
          const isOpen = open.has(item.number);
          return (
            <motion.div key={item.number} variants={rowVariants} className="border-t border-[#E5E3F3]">
              <div
                className={`px-3 -mx-3 rounded-lg transition-colors duration-150 ${
                  isOpen ? "bg-[#EEEDFE]" : "hover:bg-[#EEEDFE]"
                }`}
              >
                {/* Clickable header row */}
                <button
                  onClick={() => toggle(item.number)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-9 flex items-center gap-4 md:gap-8"
                >
                  <span
                    className="text-sm font-medium tabular-nums w-8 md:w-14 shrink-0 transition-colors duration-150"
                    style={{ color: "#6B5CE7" }}
                  >
                    {item.number}
                  </span>

                  <span
                    className="flex-1 text-[15px] font-semibold leading-snug text-left"
                    style={{ color: "#0F0F0F" }}
                  >
                    {item.headline}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0 flex"
                    style={{ color: "#BBBBBB" }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                {/* Expandable description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="pb-5 pl-12 md:pl-[5.5rem] pr-6 text-sm leading-relaxed"
                        style={{ color: "#666666" }}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
        <div className="border-t border-[#E5E3F3]" />
      </motion.div>
    </section>
  );
}
