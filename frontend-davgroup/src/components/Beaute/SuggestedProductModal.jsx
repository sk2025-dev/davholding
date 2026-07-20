import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SuggestedProductModal.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const SESSION_KEY = "dav_suggested_product_seen";
const SHOW_AT_SCROLL_PROGRESS = 0.45;

export default function SuggestedProductModal() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
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
        if (json?.data) setProduct(json.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!product) return;
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
  }, [product]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  const discover = () => {
    close();
    navigate("/davbeaute");
  };

  if (!visible || !product) return null;

  return (
    <>
      <div className="spm-overlay" onClick={close} aria-hidden="true" />
      <div className="spm-panel" role="dialog" aria-modal="true" aria-label="Produit suggéré">
        <button type="button" className="spm-close" onClick={close} aria-label="Fermer">✕</button>

        <div className="spm-tag">✨ Rien que pour vous</div>

        <div className="spm-image-wrap">
          {product.badge && <span className="spm-badge">{product.badge}</span>}
          <img src={product.image || "/images/placeholder.svg"} alt={product.name} loading="lazy" decoding="async" />
        </div>

        <h3 className="spm-name">{product.name}</h3>
        {product.category && <p className="spm-category">{product.category}</p>}
        <p className="spm-price">{Number(product.price).toLocaleString("fr-FR")} FCFA</p>

        <div className="spm-actions">
          <button type="button" className="spm-btn spm-btn--secondary" onClick={close}>
            Non merci
          </button>
          <button type="button" className="spm-btn spm-btn--primary" onClick={discover}>
            Découvrir →
          </button>
        </div>
      </div>
    </>
  );
}
