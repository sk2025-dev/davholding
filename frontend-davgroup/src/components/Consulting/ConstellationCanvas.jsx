import { useEffect, useRef } from "react";

export default function ConstellationCanvas({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;
    const NUM = 75;
    const MAX_DIST = 145;
    const SPEED = 0.28;

    function spawn() {
      const isRed = Math.random() < 0.28;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        r: isRed ? 1.8 + Math.random() * 1.2 : 1 + Math.random() * 1,
        isRed,
      };
    }

    let pts = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      pts = [];
      for (let i = 0; i < NUM; i++) pts.push(spawn());
    }

    let rafId;
    function frame() {
      const isLight = theme === "light";
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > MAX_DIST) continue;
          const alpha = (1 - d / MAX_DIST) * (isLight ? 0.13 : 0.2);
          const bothRed = pts[i].isRed && pts[j].isRed;
          const oneRed = pts[i].isRed || pts[j].isRed;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.lineWidth = bothRed ? 0.8 : 0.4;
          ctx.strokeStyle = bothRed
            ? `rgba(204,0,16,${alpha * 1.3})`
            : oneRed
            ? `rgba(204,0,16,${alpha * 0.6})`
            : isLight
            ? `rgba(60,60,70,${alpha})`
            : `rgba(200,195,190,${alpha})`;
          ctx.stroke();
        }
      }
      for (const p of pts) {
        if (p.isRed) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(204,0,16,0.6)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isRed
          ? `rgba(204,0,16,${theme === "light" ? 0.65 : 0.82})`
          : theme === "light"
          ? `rgba(80,75,70,.38)`
          : `rgba(220,215,210,.45)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(frame);
    }

    init();
    frame();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="c-constellation" aria-hidden="true" />;
}
