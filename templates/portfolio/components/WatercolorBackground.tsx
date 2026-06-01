export function WatercolorBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Cobalt blue — top left */}
      <div style={{
        position: "absolute",
        width: 700, height: 580,
        left: -120, top: -100,
        borderRadius: "40% 60% 55% 45% / 45% 35% 65% 55%",
        background: "#B8CCFF",
        opacity: 0.28,
        filter: "blur(90px)",
      }} />

      {/* Coral — right, mid-high */}
      <div style={{
        position: "absolute",
        width: 560, height: 640,
        right: -120, top: "10%",
        borderRadius: "55% 45% 40% 60% / 60% 50% 50% 40%",
        background: "#FFB8B0",
        opacity: 0.22,
        filter: "blur(100px)",
      }} />

      {/* Warm gold — center */}
      <div style={{
        position: "absolute",
        width: 500, height: 420,
        left: "30%", top: "20%",
        borderRadius: "50% 50% 40% 60% / 55% 45% 55% 45%",
        background: "#FFF0A8",
        opacity: 0.28,
        filter: "blur(80px)",
      }} />

      {/* Teal — bottom left */}
      <div style={{
        position: "absolute",
        width: 580, height: 500,
        left: -80, bottom: "5%",
        borderRadius: "35% 65% 60% 40% / 50% 40% 60% 50%",
        background: "#A8E8DC",
        opacity: 0.22,
        filter: "blur(95px)",
      }} />

      {/* Lavender — bottom right */}
      <div style={{
        position: "absolute",
        width: 520, height: 480,
        right: -80, bottom: "8%",
        borderRadius: "60% 40% 45% 55% / 40% 60% 40% 60%",
        background: "#D0C0FF",
        opacity: 0.20,
        filter: "blur(85px)",
      }} />

      {/* Soft rose — top right */}
      <div style={{
        position: "absolute",
        width: 380, height: 360,
        right: "15%", top: -60,
        borderRadius: "45% 55% 50% 50% / 50% 45% 55% 50%",
        background: "#FFD0D8",
        opacity: 0.20,
        filter: "blur(70px)",
      }} />
    </div>
  );
}
