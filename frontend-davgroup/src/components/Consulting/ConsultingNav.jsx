import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const NAV_LINKS = [
  { href: "#services",      label: "Services" },
  { href: "#realisations",  label: "Réalisations" },
  { href: "#stack",         label: "Stack" },
  { href: "#contact",       label: "Contact" },
];

export default function ConsultingNav({ theme, onThemeToggle }) {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Ferme le menu si on clique sur un lien ancre */
  const handleNavClick = () => setMenuOpen(false);

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
            <a href="#" className="c-nav__logo">
              <img src="/consulting/images/code.png" alt="DAV Consulting" />
            </a>

            {/* Liens desktop */}
            <ul className="c-nav__links">
              {NAV_LINKS.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>

            <div className="c-nav__right">
              <Link to="/" className="c-nav__back">Groupe DAV ↗</Link>
              <button
                className="c-theme-toggle"
                onClick={onThemeToggle}
                aria-label="Changer de thème"
              >
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </button>
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
          <a href="#" className="c-nav__logo" onClick={handleNavClick}>
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
            <a key={l.href} href={l.href} className="c-mobile-link" onClick={handleNavClick}>
              {l.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>

        <div className="c-mobile-drawer__footer">
          <a href="#contact" className="c-btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleNavClick}>
            Démarrer un projet
          </a>
          <Link to="/" className="c-nav__back" style={{ textAlign: "center", display: "block", marginTop: 12 }} onClick={handleNavClick}>
            Groupe DAV ↗
          </Link>
        </div>
      </div>
    </>
  );
}
