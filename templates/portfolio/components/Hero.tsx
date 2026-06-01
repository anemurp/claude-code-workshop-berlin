"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { hero } from "../content";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];
const spring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

function line(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  };
}

const TEXT: React.CSSProperties = {
  fontSize: "clamp(36px, 6vw, 80px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 1.05,
  fontFamily: '"Inter Display", Inter, sans-serif',
};

const PHOTO_SIZE: React.CSSProperties = {
  width: "clamp(100px, 12vw, 200px)",
  height: "clamp(100px, 12vw, 200px)",
  borderRadius: "50%",
  border: "3px solid white",
  boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
  display: "inline-block",
  verticalAlign: "middle",
};

function spawnConfettiAt(centerX: number, centerY: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = Math.floor(Math.random() * 5) + 12;
  const colors = ["#E8392A", "#1A2FD4", "#0D7A6B", "#6B5FE8", "#F5820A", "#2A7A1A"];
  const shapes = ["circle", "rect", "square"];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 4 + 5;

    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      width: ${shape === "rect" ? size / 2 : size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === "circle" ? "50%" : "1px"};
      pointer-events: none;
      z-index: 9999;
      transform-origin: center;
    `;
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rot = Math.random() * 360 - 180;
    const duration = Math.random() * 800 + 1400;

    const anim = particle.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg) scale(1)", opacity: "1" },
        { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg) scale(0.3)`, opacity: "0" },
      ],
      { duration, easing: "ease-out", fill: "forwards" }
    );

    anim.onfinish = () => particle.remove();
  }
}

function spawnConfetti(e: React.MouseEvent<HTMLSpanElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  spawnConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

export function Hero() {
  const [photoError, setPhotoError] = useState(false);
  const photoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect();
        spawnConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="pt-[48px] pb-[80px] relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="text-center px-6 relative z-10">


        {/* Headline */}
        <h1 style={{ margin: 0, ...TEXT }}>

          {/* Line 1: I'm [photo] Anna */}
          <motion.span {...line(0)} style={{ display: "block", ...TEXT, color: "var(--text)" }}>
            I&apos;m
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: spring }}
              ref={photoRef}
            onMouseEnter={spawnConfetti}
            onClick={spawnConfetti}
            style={{ display: "inline-block", verticalAlign: "middle", margin: "0 20px", cursor: "pointer" }}
            >
              {photoError ? (
                <span style={{
                  ...PHOTO_SIZE,
                  backgroundColor: "#E8392A",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 22,
                  fontWeight: 700,
                }}>
                  AM
                </span>
              ) : (
                <Image
                  src="/images/photo.png"
                  alt="Anna Murphy"
                  width={200}
                  height={200}
                  onError={() => setPhotoError(true)}
                  style={{
                    ...PHOTO_SIZE,
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              )}
            </motion.span>
            Anna
          </motion.span>

          {/* Line 2: Product Designer */}
          <motion.span {...line(0.15)} style={{ display: "block", ...TEXT }}>
            <span style={{
              background: "linear-gradient(90deg, #B8A8E8, #C8A8F0, #F0A8C0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {hero.role}
            </span>
          </motion.span>

          {/* Lines 3–4 */}
          <motion.span {...line(0.25)} style={{ display: "block", ...TEXT }}>
            <span style={{
              background: "linear-gradient(90deg, #C0A8F0, #E8A8D8, #F0B8C0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {hero.line2}
            </span>
            <br />
            <span style={{
              background: "linear-gradient(90deg, #C8A8F0, #F0A8C0, #F5B0B0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {hero.line3}
            </span>
          </motion.span>

        </h1>


      </div>
    </section>
  );
}
