"use client";

// Add your intro video at /public/videos/intro.mp4

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

const VIDEO_SRC = "/videos/intro.mp4";
const DISMISS_KEY = "intro-video-dismissed";

export function FloatingVideo() {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) !== "true") {
      setShow(true);
    }
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    function updateBottom() {
      const footer = document.querySelector("footer");
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      if (footerTop < viewportHeight) {
        setBottomOffset(viewportHeight - footerTop + 24);
      } else {
        setBottomOffset(24);
      }
    }
    window.addEventListener("scroll", updateBottom, { passive: true });
    updateBottom();
    return () => window.removeEventListener("scroll", updateBottom);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClickOut(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOut);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOut);
    };
  }, [isOpen]);

  function open() {
    setIsOpen(true);
    setIsHovered(false);
  }

  function close() {
    videoRef.current?.pause();
    setIsOpen(false);
  }

  function dismiss(e: React.MouseEvent) {
    e.stopPropagation();
    localStorage.setItem(DISMISS_KEY, "true");
    setShow(false);
  }

  const expandedWidth = isMobile ? `calc(100vw - 48px)` : 360;
  const expandedBorderRadius = isMobile ? "20px 20px 0 0" : 20;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="floating-video"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
            ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
          }}
          style={{
            position: "fixed",
            bottom: isOpen && isMobile ? 0 : bottomOffset,
            right: 24,
            zIndex: 999,
          }}
        >
          <motion.div
            layout
            ref={containerRef}
            whileHover={!isOpen ? { y: -2 } : undefined}
            onMouseEnter={() => !isOpen && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              background: isOpen ? "#0F0F0F" : "#ffffff",
              borderRadius: isOpen ? expandedBorderRadius : 16,
              boxShadow: isOpen
                ? "0 24px 64px rgba(0,0,0,0.35)"
                : isHovered
                ? "0 12px 40px rgba(0,0,0,0.20)"
                : "0 8px 32px rgba(0,0,0,0.15)",
              overflow: "hidden",
              cursor: isOpen ? "default" : "pointer",
              width: isOpen ? expandedWidth : "auto",
            }}
            transition={{
              layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
              y: { duration: 0.25 },
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div
                    style={{
                      padding: "14px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "white", lineHeight: 1.3 }}>
                        Anna Murphy
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                        Senior UX Designer
                      </div>
                    </div>
                    <button
                      onClick={close}
                      aria-label="Close video"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 4,
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Video area */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      background: "#1A2FD4",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {videoError ? (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 14,
                        }}
                      >
                        Video coming soon
                      </div>
                    ) : (
                      <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        controls
                        autoPlay
                        playsInline
                        onError={() => setVideoError(true)}
                        style={{ width: "100%", height: "100%", display: "block" }}
                      />
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  role="button"
                  aria-label="Watch Anna's introduction video"
                  aria-expanded={false}
                  onClick={open}
                  style={{
                    padding: "8px 16px 8px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    position: "relative",
                    userSelect: "none",
                  }}
                >
                  {/* Thumbnail circle */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "#1A2FD4",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Play size={16} color="white" fill="white" />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F0F0F", lineHeight: 1.3 }}>
                      Hi, I&apos;m Anna 👋
                    </div>
                    <div style={{ fontSize: 11, color: "#999", fontWeight: 400, marginTop: 1 }}>
                      Watch intro
                    </div>
                  </div>

                  {/* Dismiss X — visible on hover only */}
                  {isHovered && (
                    <button
                      onClick={dismiss}
                      aria-label="Dismiss introduction video"
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "#999",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        fontSize: 10,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
