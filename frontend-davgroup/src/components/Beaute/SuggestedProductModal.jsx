import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SuggestedProductModal.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const SESSION_KEY = "dav_suggested_product_seen";
const SHOW_AT_SCROLL_PROGRESS = 0.45;

export default function SuggestedProductModal() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    fetch(`${API_URL}/products/featured`, { headers: { Accept: "application/json" } })
      .then((res) => res.json())
      .then((json) => {
        const data = Array.isArray(json?.data) ? json.data : (json?.data ? [json.data] : []);
        setItems(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;
      const progress = window.scrollY / documentHeight;
      if (progress >= SHOW_AT_SCROLL_PROGRESS) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  const currentItem = items[activeIndex] || null;

  const discover = () => {
    close();
    navigate(currentItem?.detail_url || "/davbeaute");
  };

  if (!visible || !currentItem) return null;

  return (
    <>
      <div className="spm-overlay" onClick={close} aria-hidden="true" />
      <div className="spm-panel" role="dialog" aria-modal="true" aria-label="Sélection en vedette">
        <button type="button" className="spm-close" onClick={close} aria-label="Fermer">✕</button>

        <div className="spm-tag">✨ Rien que pour vous</div>

        <div className="spm-image-wrap">
          {currentItem.badge && <span className="spm-badge">{currentItem.badge}</span>}
          <img src={currentItem.image || "/images/placeholder.svg"} alt={currentItem.name} loading="lazy" decoding="async" />
          {items.length > 1 && (
            <>
              <button type="button" className="spm-nav spm-nav--prev" onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)} aria-label="Suggestion précédente">‹</button>
              <button type="button" className="spm-nav spm-nav--next" onClick={() => setActiveIndex((activeIndex + 1) % items.length)} aria-label="Suggestion suivante">›</button>
            </>
          )}
        </div>

        <h3 className="spm-name">{currentItem.name}</h3>
        {currentItem.category && <p className="spm-category">{currentItem.category}</p>}
        {(currentItem.price_label || currentItem.price !== null) && (
          <p className="spm-price">{currentItem.price_label || `${Number(currentItem.price).toLocaleString("fr-FR")} FCFA`}</p>
        )}
        {items.length > 1 && (
          <div className="spm-dots" aria-label={`${activeIndex + 1} sur ${items.length}`}>
            {items.map((item, index) => (
              <button key={item.id} type="button" className={`spm-dot${index === activeIndex ? " is-active" : ""}`} onClick={() => setActiveIndex(index)} aria-label={`Afficher ${item.name}`} />
            ))}
          </div>
        )}

        <div className="spm-actions">
          <button type="button" className="spm-btn spm-btn--secondary" onClick={close}>
            Non merci
          </button>
          <button type="button" className="spm-btn spm-btn--primary" onClick={discover}>
            En savoir plus →
          </button>
        </div>
      </div>
    </>
  );
}
