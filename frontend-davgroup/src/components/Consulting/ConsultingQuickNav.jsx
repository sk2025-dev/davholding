import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/ConsultingQuickNav.css";

const QUICK_LINKS = [
  { label: "Accueil Consulting", to: "/davconsulting" },
  { label: "Réalisations Branding", to: "/consulting/realisations/branding" },
  { label: "Réalisations Développement", to: "/consulting/realisations/developpement" },
  { label: "Réalisations Design", to: "/consulting/realisations/design" },
  { label: "IT & Sécurité", to: "/consulting/secure" },
];

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
  </svg>
);

export default function ConsultingQuickNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {open && (
        <div className="c-quicknav__backdrop" onClick={close} aria-hidden="true" />
      )}

      <div className="c-quicknav">
        <div className={`c-quicknav__panel${open ? " c-quicknav__panel--open" : ""}`}>
          {QUICK_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) => `c-quicknav__link${isActive ? " active" : ""}`}
              onClick={close}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className={`c-quicknav__btn${open ? " c-quicknav__btn--open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <GridIcon />
          <span className="c-quicknav__btn-label">Menu</span>
        </button>
      </div>
    </>
  );
}
