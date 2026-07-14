import { useState } from "react";
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
  const close = () => setOpen(false);

  return (
    <>
      {open && (
        <div className="beaute-quicknav__backdrop" onClick={close} aria-hidden="true" />
      )}

      <div className="beaute-quicknav">
        <div className={`beaute-quicknav__panel${open ? " beaute-quicknav__panel--open" : ""}`}>
          {sectionTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end
              className={({ isActive }) => `beaute-quicknav__link${isActive ? " active" : ""}`}
              onClick={close}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

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
