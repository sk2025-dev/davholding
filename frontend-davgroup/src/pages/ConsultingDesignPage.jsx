import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConsultingLayout from "../components/Consulting/ConsultingLayout";
import "../styles/Consulting.css";
import "../styles/ConsultingDesign.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const FILTERS = [
  { key: "all",    label: "Tous" },
  { key: "UI Design",    label: "UI Design" },
  { key: "UX Design",   label: "UX Design" },
  { key: "UI/UX Design", label: "UI/UX" },
];

/* ── Lightbox ── */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="ds-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="ds-lightbox-close" onClick={onClose} aria-label="Fermer">✕</button>
      <div className="ds-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={item.img} alt={item.title} />
        <div className="ds-lightbox-info">
          <div className="ds-lightbox-title">{item.title}</div>
          <div className="ds-lightbox-cat">{item.cat}</div>
          {item.tags?.length > 0 && (
            <div className="ds-lightbox-stack">
              {item.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          )}
          {item.description && <p className="ds-lightbox-desc">{item.description}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Carte ── */
function DesignCard({ item, delay, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("ds-visible"); observer.unobserve(el); }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ds-card"
      style={{ transitionDelay: `${delay}s` }}
      onClick={() => onOpen(item)}
    >
      <img src={item.img} alt={item.title} loading="lazy" />
      <div className="ds-card-overlay">
        <div className="ds-card-overlay-content">
          <div className="ds-card-cat">{item.cat}</div>
          <div className="ds-card-title">{item.title}</div>
          <div className="ds-card-tags">
            {item.tags.map((t) => <span key={t} className="ds-card-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════ */
export default function ConsultingDesignPage() {
  const [items, setItems] = useState([]);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [filter, setFilter] = useState("all");
  const heroRef = useRef(null);

  const filtered = filter === "all" ? items : items.filter((p) => p.cat === filter);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("ds-hero-in"), 50);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/consulting-realisations?category=design`)
      .then((res) => res.json())
      .then((json) => {
        const mapped = (json?.data || []).map((r) => ({ img: r.image_url, title: r.title, cat: r.tag, tags: r.tags || [], description: r.description }));
        setItems(mapped);
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <ConsultingLayout hideNav>

      {/* ── Hero ── */}
      <section className="ds-hero">
        <img className="ds-hero-bg" src="/consulting/images/desi.png" alt="" />
        <div className="ds-hero-overlay" />

        <Link to="/davconsulting" className="ds-logo">
          <img src="/consulting/images/code.png" alt="DAV Consulting" />
        </Link>

        <Link to="/davconsulting" className="ds-back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Retour
        </Link>

        <div className="ds-hero-content" ref={heroRef}>
          <h1 className="ds-hero-title">Design UI / UX</h1>
          <p className="ds-hero-sub">Interfaces pensées pour l'utilisateur, conçues pour convertir et marquées par un style distinctif.</p>
        </div>
      </section>

      {/* ── Grille projets ── */}
      <section className="ds-section">
        <div className="ds-section-header">
          <div className="ds-section-title">Nos créations</div>
          <div className="ds-section-bar" />
        </div>

        {/* Filtres */}
        <div className="ds-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`ds-filter-btn${filter === f.key ? " ds-filter-btn--active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className="ds-filter-count">
                {f.key === "all" ? items.length : items.filter((p) => p.cat === f.key).length}
              </span>
            </button>
          ))}
        </div>

        <div className="ds-masonry">
          {filtered.map((item, i) => (
            <DesignCard key={`${filter}-${i}`} item={item} delay={i * 0.07} onOpen={setLightboxItem} />
          ))}
        </div>
      </section>

      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

    </ConsultingLayout>
  );
}
