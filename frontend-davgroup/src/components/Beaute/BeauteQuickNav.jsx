import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { sectionTabs } from "./beauteData";
import "../../styles/BeauteQuickNav.css";

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
  </svg>
);

function BeauteQuickNav() {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const updateVisibility = () => {
      setShowScrollTop(window.scrollY > Math.max(500, window.innerHeight * 0.7));
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    close();
  };

  return (
    <>
      {open && (
        <div className="beaute-quicknav__backdrop" onClick={close} aria-hidden="true" />
      )}

      <div className="beaute-quicknav">
        <div className={`beaute-quicknav__panel${open ? " beaute-quicknav__panel--open" : ""}`}>
          {sectionTabs.map((tab) => (
            tab.children ? (
              <div className="beaute-quicknav__group" key={tab.label}>
                <span>{tab.label}</span>
                {tab.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) => `beaute-quicknav__link${isActive ? " active" : ""}`}
                    onClick={close}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink
                key={tab.to}
                to={tab.to}
                end
                className={({ isActive }) => `beaute-quicknav__link${isActive ? " active" : ""}`}
                onClick={close}
              >
                {tab.label}
              </NavLink>
            )
          ))}
        </div>

        <button
          type="button"
          className={`beaute-scrolltop${showScrollTop ? " beaute-scrolltop--visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Remonter en haut de la page"
          title="Remonter en haut"
          tabIndex={showScrollTop ? 0 : -1}
        >
          <span aria-hidden="true">↑</span>
          <span>Haut</span>
        </button>

        <button
          type="button"
          className={`beaute-quicknav__btn${open ? " beaute-quicknav__btn--open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <GridIcon />
          <span className="beaute-quicknav__btn-label">Menu</span>
        </button>
      </div>
    </>
  );
}

export default BeauteQuickNav;
