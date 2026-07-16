import { useEffect, useRef } from "react";
import ConsultingNav from "./ConsultingNav";
import ConsultingFooter from "./ConsultingFooter";
import ConsultingQuickNav from "./ConsultingQuickNav";
import ConstellationCanvas from "./ConstellationCanvas";

const THEME = "dark";

export default function ConsultingLayout({ children, hideNav = false }) {
  const scrollBarRef = useRef(null);

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
    <div className="consulting-root" data-theme={THEME}>
      <ConstellationCanvas theme={THEME} />
      <div ref={scrollBarRef} className="c-scroll-bar" />
      {!hideNav && <ConsultingNav />}
      <main>{children}</main>
      <ConsultingFooter />
      <ConsultingQuickNav />
    </div>
  );
}
