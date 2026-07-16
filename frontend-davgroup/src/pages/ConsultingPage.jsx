import { useState, useEffect, useRef } from "react";
import ConsultingPreloader from "../components/Consulting/ConsultingPreloader";
import ConstellationCanvas from "../components/Consulting/ConstellationCanvas";
import ConsultingNav from "../components/Consulting/ConsultingNav";
import ConsultingHeroCarousel from "../components/Consulting/ConsultingHeroCarousel";
import ConsultingClientsStrip from "../components/Consulting/ConsultingClientsStrip";
import ConsultingNumbers from "../components/Consulting/ConsultingNumbers";
import ConsultingMobileSection from "../components/Consulting/ConsultingMobileSection";
import ConsultingDesignSection from "../components/Consulting/ConsultingDesignSection";
import ConsultingITSection from "../components/Consulting/ConsultingITSection";
import ConsultingProcess from "../components/Consulting/ConsultingProcess";
import ConsultingStack from "../components/Consulting/ConsultingStack";
import ConsultingRealisations from "../components/Consulting/ConsultingRealisations";
import ConsultingCTA from "../components/Consulting/ConsultingCTA";
import ConsultingFooter from "../components/Consulting/ConsultingFooter";
import "../styles/Consulting.css";

const THEME = "dark";

export default function ConsultingPage() {
  const [loaded, setLoaded] = useState(false);
  const scrollBarRef = useRef(null);

  /* Scroll progress bar */
  useEffect(() => {
    const bar = scrollBarRef.current;
    if (!bar) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll reveal with IntersectionObserver */
  useEffect(() => {
    if (!loaded) return;
    const targets = document.querySelectorAll(".c-reveal, .c-reveal-l, .c-reveal-r");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <div className="consulting-root" data-theme={THEME}>
      {!loaded && <ConsultingPreloader onComplete={() => setLoaded(true)} />}

      <ConstellationCanvas theme={THEME} />
      <div ref={scrollBarRef} className="c-scroll-bar" />

      <ConsultingNav />
      <ConsultingHeroCarousel />
      <ConsultingClientsStrip />
      <ConsultingNumbers />
      <ConsultingProcess />
      <ConsultingMobileSection />
      <ConsultingDesignSection />
      <ConsultingITSection />
      <ConsultingStack />
      <ConsultingRealisations />
      <ConsultingCTA />
      <ConsultingFooter />
    </div>
  );
}
