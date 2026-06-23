import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { realisationCategories } from "./beauteData";
import { useClientAuth } from "../../context/ClientAuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const CATEGORY_GROUPS = [
  { key: "coiffure",   title: "Nos coiffures",    em: "",     sub: "Tressage · Twists · Coiffures protectrices", to: "/beaute/coiffures" },
  { key: "ongerie",    title: "Pose",             em: "ongles",        sub: "Gel · Résine · Nail art · French",          to: "/beaute/ongerie" },
  { key: "spa",        title: "Nos soins",        em: "spa & détente", sub: "Soins visage · Massage · Relaxation",       to: "/beaute/spa" },
  { key: "soins",      title: "Soins",            em: "capillaires",   sub: "Hydratation · Traitement · Brillance",      to: "/beaute/capillaires" },
  { key: "maquillage", title: "Maquillage",       em: "& beauté",      sub: "Jour · Soirée · Événementiel",              to: null },
];

const CAT_MAP = ["coiffure", "coiffure", "ongerie", "spa"];

const buildFallback = () =>
  realisationCategories.flatMap((cat, ci) =>
    cat.images.map((img, ii) => ({
      id: `s-${ci}-${ii}`,
      title: img.alt,
      subtitle: null,
      price: null,
      category_key: CAT_MAP[ci] || "coiffure",
      image_url: img.src,
    }))
  );

function RealisationsSection() {
  const navigate = useNavigate();
  const { requireAuth, openBooking } = useClientAuth();
  const [items, setItems]       = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox]   = useState(null); /* { items: [], idx: number } */

  useEffect(() => {
    let mounted = true;
    fetch(`${API_URL}/beauty-services?section_key=realisations`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const api = (data?.data || []).filter((i) => i.is_active);
        setItems(api.length > 0 ? api : buildFallback());
      })
      .catch(() => { if (mounted) setItems(buildFallback()); })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  /* ── Lightbox helpers ── */
  const openLightbox  = useCallback((groupItems, idx) => setLightbox({ items: groupItems, idx }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(() =>
    setLightbox((l) => ({ ...l, idx: l.idx > 0 ? l.idx - 1 : l.items.length - 1 })), []);
  const nextPhoto = useCallback(() =>
    setLightbox((l) => ({ ...l, idx: l.idx < l.items.length - 1 ? l.idx + 1 : 0 })), []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft")  prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prevPhoto, nextPhoto, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  /* Grouper les items par category_key */
  const grouped = CATEGORY_GROUPS
    .map((g) => ({ ...g, photos: items.filter((i) => i.category_key === g.key) }))
    .filter((g) => g.photos.length > 0);

  const currentItem = lightbox ? lightbox.items[lightbox.idx] : null;

  return (
    <section id="realisations" className="rl-section">

      {/* ── En-tête ── */}
      <div className="rl-section-header">
        <div className="rl-section-title-block">
          <div className="rl-section-eyebrow">Notre portfolio</div>
          <h2 className="rl-section-title">Nos <em>prestations</em></h2>
        </div>
        <button
          className="rl-rdv-cta"
          onClick={() => requireAuth(() => openBooking())}
        >
          📅 Prendre un rendez-vous
        </button>
      </div>

      {/* ── Contenu ── */}
      {isLoading ? (
        <div className="rl-state">
          <div className="rl-spinner" />
          <p>Chargement du portfolio…</p>
        </div>
      ) : grouped.length === 0 ? (
        <div className="rl-state">
          <span style={{ fontSize: 48, opacity: .4 }}>📸</span>
          <p>Aucune prestation pour le moment.</p>
        </div>
      ) : (
        grouped.map((group) => (
          <div key={group.key} className="rl-category">

            {/* En-tête catégorie */}
            <div className="rl-cat-header">
              <div className="rl-cat-line" />
              <div className="rl-cat-header-inner">
                <div>
                  <h3 className="rl-cat-title">
                    {group.title} <em>{group.em}</em>
                  </h3>
                  <span className="rl-cat-sub">{group.sub}</span>
                </div>
                {group.to && (
                  <button
                    className="rl-voir-plus"
                    onClick={() => navigate(group.to)}
                  >
                    Voir plus →
                  </button>
                )}
              </div>
            </div>

            {/* Grille — layout selon la catégorie */}
            <div className="rl-grid rl-grid--portrait6">
              {group.photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className="rl-card"
                  onClick={() => openLightbox(group.photos, idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(group.photos, idx)}
                  aria-label={`Voir ${photo.title}`}
                >
                  {photo.image_url ? (
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="rl-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : null}
                  <div className="rl-placeholder">
                    <span>📸</span>
                    <p>{photo.title || "Photo"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* ── Lightbox ── */}
      {lightbox && currentItem && (
        <div
          className="rl-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button className="rl-lb-close" onClick={closeLightbox} aria-label="Fermer">✕</button>

          <button
            className="rl-lb-nav rl-lb-nav--prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Précédent"
          >‹</button>

          <div className="rl-lb-inner" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="rl-lb-img"
            />
            <div className="rl-lb-footer">
              <div className="rl-lb-info">
                <div className="rl-lb-name">{currentItem.title}</div>
                {currentItem.price && <div className="rl-lb-price">{currentItem.price}</div>}
                <div className="rl-lb-count">{lightbox.idx + 1} / {lightbox.items.length}</div>
              </div>
              <button
                className="rl-lb-rdv-btn"
                onClick={() => { closeLightbox(); requireAuth(() => openBooking()); }}
              >
                📅 Réserver ce soin
              </button>
            </div>
          </div>

          <button
            className="rl-lb-nav rl-lb-nav--next"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Suivant"
          >›</button>
        </div>
      )}
    </section>
  );
}

export default RealisationsSection;
