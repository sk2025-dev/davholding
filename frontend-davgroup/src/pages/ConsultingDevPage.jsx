import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConsultingLayout from "../components/Consulting/ConsultingLayout";
import "../styles/Consulting.css";
import "../styles/ConsultingDev.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const FILTERS = [
  { key: "all",    label: "Tous" },
  { key: "web",    label: "Applications Web" },
  { key: "mobile", label: "Applications Mobiles" },
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
    <div className="dv-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="dv-lightbox-close" onClick={onClose} aria-label="Fermer">✕</button>
      <div className="dv-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={item.img} alt={item.title} />
        <div className="dv-lightbox-info">
          <div className="dv-lightbox-title">{item.title}</div>
          <div className="dv-lightbox-cat">{item.cat}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Carte ── */
function DevCard({ item, delay, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("dv-visible"); observer.unobserve(el); }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="dv-card"
      style={{ transitionDelay: `${delay}s` }}
      onClick={() => onOpen(item)}
    >
      <img src={item.img} alt={item.title} loading="lazy" />
      <div className="dv-card-overlay">
        <div className="dv-card-overlay-content">
          <div className="dv-card-cat">{item.cat}</div>
          <div className="dv-card-title">{item.title}</div>
          <div className="dv-card-tags">
            {item.tags.map((t) => <span key={t} className="dv-card-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════ */
export default function ConsultingDevPage() {
  const [items, setItems] = useState([]);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [filter, setFilter] = useState("all");
  const heroRef = useRef(null);

  const filtered = filter === "all" ? items : items.filter((p) => p.cat === filter);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("dv-hero-in"), 50);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/consulting-realisations?category=developpement`)
      .then((res) => res.json())
      .then((json) => {
        const mapped = (json?.data || []).map((r) => ({ img: r.image_url, title: r.title, cat: r.tag, tags: r.tags || [] }));
        setItems(mapped);
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <ConsultingLayout hideNav>

      {/* ── Hero ── */}
      <section className="dv-hero">
        <img className="dv-hero-bg" src="/consulting/images/saas.png" alt="" />
        <div className="dv-hero-overlay" />

        <Link to="/consulting" className="dv-logo">
          <img src="/consulting/images/code.png" alt="DAV Consulting" />
        </Link>

        <Link to="/consulting" className="dv-back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Retour
        </Link>

        <div className="dv-hero-content" ref={heroRef}>
          <h1 className="dv-hero-title">Développement web &amp; mobile</h1>
          <p className="dv-hero-sub">Sites, applications et plateformes conçus sur-mesure avec les meilleures technologies.</p>
        </div>
      </section>

      {/* ── Grille projets ── */}
      <section className="dv-section">
        <div className="dv-section-header">
          <div className="dv-section-title">Nos projets</div>
          <div className="dv-section-bar" />
        </div>

        {/* Filtres */}
        <div className="dv-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`dv-filter-btn${filter === f.key ? " dv-filter-btn--active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className="dv-filter-count">
                {f.key === "all" ? items.length : items.filter((p) => p.cat === f.key).length}
              </span>
            </button>
          ))}
        </div>

        <div className="dv-masonry">
          {filtered.map((item, i) => (
            <DevCard key={`${filter}-${i}`} item={item} delay={i * 0.07} onOpen={setLightboxItem} />
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

    </ConsultingLayout>
  );
}
