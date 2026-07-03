import { useState, useEffect } from "react";
import "../../styles/ProductDetailModal.css";

const QUALITY_BADGES = [
  {
    key: "vegan",
    label: "Végétalien",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" />
        <path d="M12 12C12 7 17 3 20 3c0 5-3 9-8 9z" />
        <path d="M12 12C12 7 7 3 4 3c0 5 3 9 8 9z" />
      </svg>
    ),
  },
  {
    key: "cruelty",
    label: "Sans cruauté",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 3C7.5 3 7 4 7 5.5c0 1 .4 1.8 1 2.3" />
        <path d="M15.5 3c1 0 1.5 1 1.5 2.5 0 1-.4 1.8-1 2.3" />
        <path d="M7 7.8C5.5 8.5 5 10 5 11.5 5 15 8 18 12 18s7-3 7-6.5c0-1.5-.5-3-2-3.7" />
        <circle cx="10" cy="11" r=".8" fill="currentColor" stroke="none" />
        <circle cx="14" cy="11" r=".8" fill="currentColor" stroke="none" />
        <path d="M10 14.5c.5.5 1.5.5 2 0" />
      </svg>
    ),
  },
  {
    key: "natural",
    label: "Naturel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
        <path d="M6.34 6.34l2.12 2.12M15.54 15.54l2.12 2.12M15.54 8.46l2.12-2.12M6.34 17.66l2.12-2.12" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    key: "parabens",
    label: "Sans parabènes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6l1 3H8L9 3z" />
        <rect x="7" y="6" width="10" height="13" rx="1.5" />
        <path d="M9 12h6M12 9v6" />
        <line x1="7" y1="19" x2="17" y2="7" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    key: "limited",
    label: "Édition limitée",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
];

function StarRow() {
  return (
    <div className="pdm-stars" aria-label="Aucune évaluation">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="pdm-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ProductDetailModal({ product, onClose, onAddToCart, suggestions = [] }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const images = [product.image, product.image2].filter(Boolean);
  const currentImg = images[activeImg] || "/images/placeholder.png";

  const handleAdd = () => {
    onAddToCart(product, qty);
    onClose();
  };

  return (
    <>
      <div className="pdm-overlay" onClick={onClose} aria-hidden="true" />
      <div className="pdm-panel" role="dialog" aria-modal="true" aria-label={product.title}>
        <button type="button" className="pdm-close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="pdm-layout">
          {/* Colonne images */}
          <div className="pdm-images">
            <div className="pdm-main-img">
              {product.badge && <span className="pdm-img-badge">{product.badge}</span>}
              <img src={currentImg} alt={product.title} />
            </div>
            {images.length > 1 && (
              <div className="pdm-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`pdm-thumb${activeImg === i ? " active" : ""}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Photo ${i + 1}`}
                  >
                    <img src={img} alt={`${product.title} — vue ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="pdm-suggestions">
                <p className="pdm-sug-title">Vous aimerez aussi</p>
                <ul className="pdm-sug-list">
                  {suggestions.map((s) => (
                    <li key={s.id} className="pdm-sug-row">
                      <div className="pdm-sug-img">
                        <img src={s.image || "/images/placeholder.png"} alt={s.title} />
                      </div>
                      <div className="pdm-sug-info">
                        <span className="pdm-sug-name">{s.title}</span>
                        <span className="pdm-sug-price">{s.price}</span>
                      </div>
                      <button
                        type="button"
                        className="pdm-sug-btn"
                        onClick={() => { onAddToCart(s, 1); onClose(); }}
                        aria-label={`Ajouter ${s.title} au panier`}
                      >
                        +
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Colonne info */}
          <div className="pdm-info">
            <p className="pdm-breadcrumb">
              maison&nbsp;/&nbsp;{product.type?.toLowerCase()}&nbsp;/&nbsp;{product.title?.toLowerCase()}
            </p>
            <h2 className="pdm-title">{product.title}</h2>
            <StarRow />

            {product.description && (
              <p className="pdm-desc-preview">
                {product.description.length > 140
                  ? product.description.slice(0, 140) + "…"
                  : product.description}
              </p>
            )}

            {/* Quantité + panier */}
            <div className="pdm-actions">
              <div className="pdm-qty">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              <button type="button" className="pdm-add-btn" onClick={handleAdd}>
                ajouter au panier · {product.price}
              </button>
            </div>

            {/* Accordéon Détails */}
            <div className="pdm-accordion">
              <button
                type="button"
                className="pdm-accordion-trigger"
                onClick={() => setDetailsOpen((v) => !v)}
                aria-expanded={detailsOpen}
              >
                <span>détails</span>
                <span className="pdm-accordion-icon">{detailsOpen ? "−" : "+"}</span>
              </button>
              <div className={`pdm-accordion-body${detailsOpen ? " is-open" : ""}`}>
                <p>{product.description || "Aucun détail disponible pour ce produit."}</p>
              </div>
            </div>

            {/* Accordéon Ingrédients & qualité */}
            <div className="pdm-accordion">
              <button
                type="button"
                className="pdm-accordion-trigger"
                onClick={() => setIngredientsOpen((v) => !v)}
                aria-expanded={ingredientsOpen}
              >
                <span>ingrédients</span>
                <span className="pdm-accordion-icon">{ingredientsOpen ? "−" : "+"}</span>
              </button>
              <div className={`pdm-accordion-body${ingredientsOpen ? " is-open" : ""}`}>
                <div className="pdm-quality-row">
                  {QUALITY_BADGES.map((b) => (
                    <div key={b.key} className="pdm-quality-item">
                      <div className="pdm-quality-circle">{b.icon}</div>
                      <p>{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ProductDetailModal;
