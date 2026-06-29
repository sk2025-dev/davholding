import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ConsultingPreloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const maskRef = useRef(null);
  const logoRef = useRef(null);
  const tagRef = useRef(null);
  const akwabaRef = useRef(null);
  const subRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const mask = maskRef.current;
    const chars = akwabaRef.current?.querySelectorAll(".char");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("loading");
        onComplete?.();
      },
    });

    document.body.classList.add("loading");

    tl.to(logoRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2);
    tl.to(tagRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3);
    tl.to(chars, { y: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, 0.5);
    tl.to(subRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.4);
    tl.to(barRef.current, { width: "100%", duration: 1.8, ease: "power2.inOut" }, 1.0);
    tl.to(
      [chars, tagRef.current, subRef.current, barRef.current?.parentNode, logoRef.current],
      { y: -30, opacity: 0, duration: 0.6, stagger: 0.03, ease: "power3.in" },
      3.0,
    );
    tl.to(mask, { y: "0%", duration: 0.8, ease: "power4.inOut" }, 3.2);
    tl.set(preloader, { display: "none" }, 3.8);
    tl.to(mask, { y: "-100%", duration: 1.2, ease: "power4.inOut" }, 3.9);

    return () => {
      tl.kill();
      document.body.classList.remove("loading");
    };
  }, [onComplete]);

  return (
    <>
      <div ref={preloaderRef} className="c-preloader" aria-label="Chargement de DAV Consulting" role="status">
        <div className="c-preloader-content">
          <div ref={tagRef} className="c-preload-tag">DAV Consulting</div>
          <img
            ref={logoRef}
            src="/consulting/images/code.png"
            alt="DAV Consulting"
            className="c-preload-logo"
          />
          <div ref={akwabaRef} className="c-preload-akwaba">
            {"Akwaba".split("").map((c, i) => (
              <span key={i} className="char">{c}</span>
            ))}
          </div>
          <div ref={subRef} className="c-preload-sub">
            <em>Bienvenue</em>
          </div>
          <div className="c-preload-bar-wrap">
            <div ref={barRef} className="c-preload-bar-fill" />
          </div>
        </div>
      </div>
      <div ref={maskRef} className="c-reveal-mask" />
    </>
  );
}
