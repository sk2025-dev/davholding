import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/BeauteMainNav.css";

function BeauteMainNav({ tabs }) {
  const location = useLocation();
  const navRef = useRef(null);
  const [openGroup, setOpenGroup] = useState("");

  useEffect(() => {
    const closeOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setOpenGroup("");
    };
    const closeWithEscape = (event) => {
      if (event.key === "Escape") setOpenGroup("");
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div className="main-nav-wrap">
      <nav ref={navRef} className="main-nav" id="mainNav" aria-label="Navigation Beauté">
        {tabs.map((tab) => {
          if (!tab.children) {
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end
                className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
              >
                {tab.label}
              </NavLink>
            );
          }

          const active = tab.children.some((child) => location.pathname === child.to);
          const isOpen = openGroup === tab.label;
          return (
            <div className={`nav-group${active ? " active" : ""}${isOpen ? " is-open" : ""}`} key={tab.label}>
              <button
                className="nav-item nav-group__trigger"
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup((current) => current === tab.label ? "" : tab.label)}
              >
                {tab.label}<span aria-hidden="true">⌄</span>
              </button>
              <div className="nav-group__menu">
                {tab.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) => `nav-group__link${isActive ? " active" : ""}`}
                    onClick={() => setOpenGroup("")}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default BeauteMainNav;
