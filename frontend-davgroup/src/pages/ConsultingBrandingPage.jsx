import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConsultingLayout from "../components/Consulting/ConsultingLayout";
import "../styles/Consulting.css";
import "../styles/ConsultingBranding.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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
    <div className="br-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="br-lightbox-close" onClick={onClose} aria-label="Fermer">✕</button>
      <div className="br-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <div className="br-lightbox-info">
          <div className="br-lightbox-title">{item.title}</div>
          <div className="br-lightbox-cat">{item.cat}</div>
          {item.tags?.length > 0 && (
            <div className="br-lightbox-stack">
              {item.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          )}
          {item.description && <p className="br-lightbox-desc">{item.description}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Carte masonry ── */
function DesignCard({ item, delay, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("br-visible"); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="br-design-card"
      style={{ transitionDelay: `${delay}s` }}
      onClick={() => onOpen(item)}
    >
      <img src={item.src} alt={item.title} loading="lazy" />
      <div className="br-design-overlay">
        <div className="br-design-overlay-content">
          <div className="br-design-cat">{item.cat}</div>
          <div className="br-design-title">{item.title}</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function ConsultingBrandingPage() {
  const [items, setItems] = useState([]);
  const [lightboxItem, setLightboxItem] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("br-hero-in"), 50);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/consulting-realisations?category=branding`)
      .then((res) => res.json())
      .then((json) => {
        const mapped = (json?.data || []).map((r) => ({ src: r.image_url, title: r.title, cat: r.tag, tags: r.tags || [], description: r.description }));
        setItems(mapped);
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <ConsultingLayout hideNav>

      {/* ── Hero ── */}
      <section className="br-hero">
        <img className="br-hero-bg" src="/consulting/images/rea.png" alt="" />
        <div className="br-hero-overlay" />
        <Link to="/davconsulting" className="br-logo">
          <img src="/consulting/images/code.png" alt="DAV Consulting" />
        </Link>
        <Link to="/davconsulting" className="br-back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Retour
        </Link>
        <div className="br-hero-content" ref={heroRef}>
          <h1 className="br-hero-title">Nos réalisations</h1>
          <p className="br-hero-sub">Découvrez une sélection de projets conçus avec passion et expertise.</p>
        </div>
      </section>

      {/* ── Design et créations ── */}
      <section className="br-section br-section-gray">
        <div className="br-section-header">
          <div className="br-section-title">Design et créations</div>
          <div className="br-section-bar" />
        </div>

        <div className="br-masonry">
          {items.map((item, i) => (
            <DesignCard key={i} item={item} delay={i * 0.07} onOpen={setLightboxItem} />
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
