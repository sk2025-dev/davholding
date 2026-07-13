import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const DEFAULT_PROJECTS = [
  {
    emoji: "🖼️",
    img: "/consulting/images/rea.png",
    tag: "Branding",
    link: "/consulting/realisations/branding",
    alt: "Projet Branding",
    category: "branding",
  },
  {
    emoji: "🌐",
    img: "/consulting/images/saas.png",
    tag: "Développement mobile · web",
    link: "/consulting/realisations/developpement",
    alt: "Plateforme SaaS en React",
    category: "developpement",
  },
  {
    emoji: "🔒",
    img: "/consulting/images/enneu.png",
    tag: "Hébergement de site & sécurité",
    link: "/consulting/secure",
    alt: "Hébergement de site et sécurité",
    category: "secure",
  },
];

export default function ConsultingRealisations() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/consulting-realisations`)
      .then((res) => res.json())
      .then((json) => {
        const data = json?.data || [];
        setProjects((prev) => prev.map((p) => {
          const first = data
            .filter((r) => r.category === p.category)
            .sort((a, b) => a.sort_order - b.sort_order)[0];
          return first?.image_url ? { ...p, img: first.image_url } : p;
        }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".c-real-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("visible"), i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="c-section" id="realisations">
      <div className="c-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 32 }}>
          <div>
            <div className="c-section-tag c-reveal">Réalisations</div>
            <h2 className="c-section-heading c-reveal">
              Notre expertise<br />dans chaque{" "}
              <em style={{ color: "var(--red)", fontStyle: "italic" }}>projet réalisé</em>
            </h2>
          </div>
          <a href="#contact" className="c-btn-ghost c-reveal-r" style={{ flexShrink: 0 }}>
            Démarrer un projet →
          </a>
        </div>

        <div ref={gridRef} className="c-reals__grid">
          {projects.map((p, i) => (
            <div key={i} className="c-real-card">
              <div className="c-real-card__emo">{p.emoji}</div>
              <img
                src={p.img}
                alt={p.alt}
                className="c-real-card__img"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="c-real-card__overlay" />
              <div className="c-real-card__content">
                <span className="c-real-card__tag">{p.tag}</span>
                {p.link.startsWith("/") ? (
                  <Link to={p.link} className="c-real-card__btn">Voir →</Link>
                ) : (
                  <a href={p.link} className="c-real-card__btn">Voir →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
