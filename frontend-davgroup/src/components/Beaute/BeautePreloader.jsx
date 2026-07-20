import { useEffect, useState } from "react";

export default function BeautePreloader({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const displayDuration = reducedMotion ? 300 : 2300;
    const exitDuration = reducedMotion ? 0 : 650;

    document.body.classList.add("beauty-loading");

    const exitTimer = window.setTimeout(() => setLeaving(true), displayDuration);
    const completeTimer = window.setTimeout(() => {
      document.body.classList.remove("beauty-loading");
      onComplete?.();
    }, displayDuration + exitDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.classList.remove("beauty-loading");
    };
  }, [onComplete]);

  return (
    <div
      className={`beauty-preloader${leaving ? " beauty-preloader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Chargement de Dav’Beauté"
    >
      <div className="beauty-preloader__halo" aria-hidden="true" />
      <div className="beauty-preloader__content">
        <span className="beauty-preloader__tag">L’univers beauté du Groupe DAV</span>
        <div className="beauty-preloader__logo-wrap">
          <img
            src="/images/logo dav beauty.png"
            alt="Dav’Beauté"
            className="beauty-preloader__logo"
          />
        </div>
        <p className="beauty-preloader__welcome">Akwaba</p>
        <p className="beauty-preloader__sub">Beauté · Élégance · Bien-être</p>
        <div className="beauty-preloader__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
