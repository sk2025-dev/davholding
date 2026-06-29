import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeauteMainNav from "./BeauteMainNav";
import { useClientAuth } from "../../context/ClientAuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const DEFAULT_BAR = "✦ Livraison offerte à partir de 25 000 FCFA d'achat ✦ Code : DAVBEAUTE";

function BeauteHeader({ sectionTabs, cartCount = 0, onCartClick }) {
  const [promoBarText, setPromoBarText] = useState(DEFAULT_BAR);
  const { user, logout } = useClientAuth();
  const navigate = useNavigate();
  const initials = user ? (user.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : null;

  useEffect(() => {
    fetch(`${API_URL}/promos/bar`)
      .then(r => r.json())
      .then(d => { if (d.text) setPromoBarText(d.text); })
      .catch(() => {});
  }, []);

  return (
    <header className="site-header">
      <div className="promo-bar">
        <span>✦</span>
        {promoBarText}
        <span>✦</span>
      </div>

      <div className="logo-zone">
        <Link to="/" className="back-link">
          Accueil groupe
        </Link>
        <div className="site-logo-wrap">
          <img className="site-logo" src="/images/beauté.png" alt="Dav'Beauté" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
          {user && (
            <Link to="/beaute/profil" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none" }} title={`Mon espace — ${user.name}`}>
              <span className="header-avatar">{initials}</span>
              <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c41420", fontWeight: 700 }}>Mon espace</span>
            </Link>
          )}

          {onCartClick ? (
            <button
              className="cart-btn"
              type="button"
              onClick={onCartClick}
              aria-label="Ouvrir le panier"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="cart-badge">{cartCount}</span>
            </button>
          ) : (
            <span className="cart-btn cart-btn--placeholder" aria-hidden="true" />
          )}
        </div>
      </div>

      <BeauteMainNav tabs={sectionTabs} />
    </header>
  );
}

export default BeauteHeader;
