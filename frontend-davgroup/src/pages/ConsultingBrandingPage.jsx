import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConsultingLayout from "../components/Consulting/ConsultingLayout";
import "../styles/Consulting.css";
import "../styles/ConsultingBranding.css";

const ITEMS = [
  {
    src: "https://i.pinimg.com/736x/3f/1b/93/3f1b93539250e243cbeee6004a67b3e4.jpg",
    title: "Cartes de visite",
    cat: "Print",
  },
  {
    src: "https://i.pinimg.com/736x/da/7b/ac/da7bac0340ae7acd5b7f2b5346d252c9.jpg",
    title: "Flyers et Tracts",
    cat: "Print",
  },
  {
    src: "/consulting/images/dac.png",
    title: "Identité visuelle DAC",
    cat: "Branding",
  },
  {
    src: "https://i.pinimg.com/1200x/06/5c/b0/065cb0ec950d3ef9d886df28ce7680e4.jpg",
    title: "Brochures et Revues",
    cat: "Édition",
  },
  {
    src: "/consulting/images/ticket.jpeg",
    title: "Ticket d'entrée",
    cat: "Print",
  },
  {
    src: "https://i.pinimg.com/1200x/ff/7e/71/ff7e71602d8bd17a4bb102d926428805.jpg",
    title: "Étiquettes et Autocollants",
    cat: "Print",
  },
  {
    src: "https://i.pinimg.com/webp/1200x/f4/a5/ef/f4a5ef1819c8e2741cb20b2a9056eb97.webp",
    title: "Panneaux, Affiches",
    cat: "Signalétique",
  },
  {
    src: "https://i.pinimg.com/1200x/a9/85/2b/a9852b73cf86318c7b4b4b4631c78056.jpg",
    title: "Bâches publicitaires",
    cat: "Signalétique",
  },
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
    <div className="br-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="br-lightbox-close" onClick={onClose} aria-label="Fermer">✕</button>
      <div className="br-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <div className="br-lightbox-info">
          <div className="br-lightbox-title">{item.title}</div>
          <div className="br-lightbox-cat">{item.cat}</div>
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
  const [lightboxItem, setLightboxItem] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("br-hero-in"), 50);
  }, []);

  return (
    <ConsultingLayout hideNav>

      {/* ── Hero ── */}
      <section className="br-hero">
        <img className="br-hero-bg" src="/consulting/images/rea.png" alt="" />
        <div className="br-hero-overlay" />
        <Link to="/consulting" className="br-logo">
          <img src="/consulting/images/code.png" alt="DAV Consulting" />
        </Link>
        <Link to="/consulting" className="br-back-btn">
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
          {ITEMS.map((item, i) => (
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
