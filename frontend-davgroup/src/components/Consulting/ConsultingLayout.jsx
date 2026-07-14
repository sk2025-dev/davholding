import { useEffect, useRef, useState } from "react";
import ConsultingNav from "./ConsultingNav";
import ConsultingFooter from "./ConsultingFooter";
import ConsultingQuickNav from "./ConsultingQuickNav";
import ConstellationCanvas from "./ConstellationCanvas";

export default function ConsultingLayout({ children, hideNav = false }) {
  const [theme, setTheme] = useState("dark");
  const scrollBarRef = useRef(null);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dav-consulting-theme", next);
  };

  useEffect(() => {
    const bar = scrollBarRef.current;
    if (!bar) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      bar.style.width = total > 0 ? `${(doc.scrollTop / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".c-reveal, .c-reveal-l, .c-reveal-r");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="consulting-root" data-theme={theme}>
      <ConstellationCanvas theme={theme} />
      <div ref={scrollBarRef} className="c-scroll-bar" />
      {!hideNav && <ConsultingNav theme={theme} onThemeToggle={toggleTheme} />}
      {hideNav && (
        <>
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            style={{
              position: "fixed", top: 24, right: 28, zIndex: 100,
              background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)",
              backdropFilter: "blur(8px)", borderRadius: "50%",
              width: 40, height: 40, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", transition: "background .2s",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </>
      )}
      <main>{children}</main>
      <ConsultingFooter />
      <ConsultingQuickNav />
    </div>
  );
}
