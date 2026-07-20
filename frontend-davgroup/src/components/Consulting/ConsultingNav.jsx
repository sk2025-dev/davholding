import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { href: "#service-overview", label: "Services" },
  { href: "#offres",        label: "Offres" },
  { href: "#realisations",  label: "Réalisations" },
  { href: "#about",         label: "À propos" },
  { href: "#contact",       label: "Contact" },
];

export default function ConsultingNav() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const nav = navRef.current;
    let animationFrame = 0;

    const onScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        nav?.classList.toggle("scrolled", window.scrollY > 60);

        const activationLine = window.scrollY + Math.min(220, window.innerHeight * 0.32);
        let current = "";

        const orderedSections = NAV_LINKS
          .map(({ href }) => {
            const section = document.querySelector(href);
            if (!section) return null;
            return {
              href,
              top: section.getBoundingClientRect().top + window.scrollY,
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.top - b.top);

        orderedSections.forEach(({ href, top }) => {
          if (top <= activationLine) current = href;
        });

        const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
        if (pageBottom) current = "#contact";
        setActiveHref((previous) => (previous === current ? previous : current));
        animationFrame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  /* Ferme le menu si on clique sur un lien ancre */
  const handleNavClick = (href) => {
    if (href) setActiveHref(href);
    setMenuOpen(false);
  };

  /* Empêche le scroll quand le menu est ouvert */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} className="c-nav" id="c-nav">
        <div className="c-container">
          <div className="c-nav__inner">
            <a href="#hero" className="c-nav__logo" aria-label="Dav'Consulting — retour en haut">
              <img src="/consulting/images/code.png" alt="DAV Consulting" />
            </a>

            {/* Liens desktop */}
            <ul className="c-nav__links">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={activeHref === l.href ? "is-active" : ""}
                    aria-current={activeHref === l.href ? "location" : undefined}
                    onClick={() => setActiveHref(l.href)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="c-nav__right">
              <Link to="/" className="c-nav__back">Groupe DAV ↗</Link>
              <a href="#contact" className="c-nav__cta c-nav__cta--desktop">Démarrer un projet</a>

              {/* Hamburger */}
              <button
                className={`c-hamburger${menuOpen ? " c-hamburger--open" : ""}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay mobile */}
      <div
        className={`c-mobile-overlay${menuOpen ? " c-mobile-overlay--open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer mobile */}
      <div className={`c-mobile-drawer${menuOpen ? " c-mobile-drawer--open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu de navigation">
        <div className="c-mobile-drawer__top">
          <a href="#hero" className="c-nav__logo" onClick={() => handleNavClick("")}>
            <img src="/consulting/images/code.png" alt="DAV Consulting" />
          </a>
          <button className="c-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fermer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="c-mobile-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`c-mobile-link${activeHref === l.href ? " is-active" : ""}`}
              aria-current={activeHref === l.href ? "location" : undefined}
              onClick={() => handleNavClick(l.href)}
            >
              {l.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>

        <div className="c-mobile-drawer__footer">
          <a href="#contact" className="c-btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => handleNavClick("#contact")}>
            Démarrer un projet
          </a>
          <Link to="/" className="c-nav__back" style={{ textAlign: "center", display: "block", marginTop: 12 }} onClick={() => handleNavClick("")}>
            Groupe DAV ↗
          </Link>
        </div>
      </div>
    </>
  );
}
