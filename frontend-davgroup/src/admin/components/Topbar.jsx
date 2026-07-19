import { useState, useRef, useEffect } from "react";
import { useAdmin } from "../hooks/useAdmin";
import "../styles/admin.css";

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);
const OrderIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const RdvIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const StockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
  </svg>
);

const TITLES = {
  dashboard:    "Tableau de bord",
  orders:       "Commandes",
  rdvs:         "Rendez-vous",
  products:     "Produits & Stock",
  beauty:       "Beauté",
  photos:       "Galerie Photos",
  realisations: "Nos Réalisations",
  promos:       "Codes promotionnels",
  "promo-slides": "Publicités & bannières",
  testimonials: "Témoignages clients",
  "page-stats": "Vues & partages",
};

const Topbar = ({ onMenuToggle }) => {
  const { currentPanel, switchPanel, notifs } = useAdmin();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const goTo = (panel) => { switchPanel(panel); setOpen(false); };

  const items = [
    {
      panel: "orders",
      icon:  <OrderIcon />,
      label: "Commandes en attente",
      count: notifs.pendingOrders,
      color: "#e09020",
      bg:    "rgba(224,144,32,.1)",
    },
    {
      panel: "rdvs",
      icon:  <RdvIcon />,
      label: "Rendez-vous à confirmer",
      count: notifs.awaitingRdvs,
      color: "#c41420",
      bg:    "rgba(196,20,32,.08)",
    },
    {
      panel: "products",
      icon:  <StockIcon />,
      label: "Produits en rupture",
      count: notifs.outOfStock,
      color: "#2eaa5e",
      bg:    "rgba(46,170,94,.08)",
    },
  ];

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onMenuToggle} aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="topbar-title">
          {TITLES[currentPanel] || "Tableau de bord"}
        </div>
      </div>

      <div className="topbar-right">
        {/* Cloche notifications */}
        <div className="tb-notif" ref={dropRef}>
          <button
            className={`tb-bell${notifs.total > 0 ? " tb-bell--active" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Notifications"
          >
            <BellIcon />
            {notifs.total > 0 && (
              <span className="tb-bell-badge">{notifs.total}</span>
            )}
          </button>

          {open && (
            <div className="tb-drop">
              <div className="tb-drop__head">
                <span>Notifications</span>
                {notifs.total > 0 && (
                  <span className="tb-drop__total">{notifs.total} en attente</span>
                )}
              </div>

              {notifs.total === 0 ? (
                <div className="tb-drop__empty">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                  <p>Tout est à jour !</p>
                </div>
              ) : (
                <ul className="tb-drop__list">
                  {items.map((it) =>
                    it.count > 0 ? (
                      <li key={it.panel}>
                        <button
                          className="tb-drop__item"
                          onClick={() => goTo(it.panel)}
                        >
                          <span
                            className="tb-drop__icon"
                            style={{ background: it.bg, color: it.color }}
                          >
                            {it.icon}
                          </span>
                          <span className="tb-drop__label">{it.label}</span>
                          <span
                            className="tb-drop__count"
                            style={{ background: it.bg, color: it.color }}
                          >
                            {it.count}
                          </span>
                        </button>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="topbar-date">{date}</div>
      </div>
    </div>
  );
};

export default Topbar;
