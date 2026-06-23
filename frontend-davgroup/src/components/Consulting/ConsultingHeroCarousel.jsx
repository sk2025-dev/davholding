import { useState, useEffect, useRef } from "react";

const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowBtn = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TABS = ["Présentation", "Développement", "Design", "IT & Infra"];
const TOTAL = 4;

export default function ConsultingHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const timerRef = useRef(null);
  const touchXRef = useRef(0);

  function startTimer(from) {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % TOTAL;
        setExiting(c);
        setTimeout(() => setExiting(null), 700);
        return next;
      });
    }, 6000);
  }

  useEffect(() => {
    startTimer(0);
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(idx) {
    const next = ((idx % TOTAL) + TOTAL) % TOTAL;
    if (next === current) return;
    setExiting(current);
    setTimeout(() => setExiting(null), 700);
    setCurrent(next);
    startTimer(next);
  }

  const cls = (i) =>
    `c-hc__slide${i === current ? " c-hc__slide--active" : ""}${i === exiting ? " c-hc__slide--exit" : ""}`;

  return (
    <section
      className="c-hc"
      id="heroCarousel"
      onTouchStart={(e) => { touchXRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchXRef.current;
        if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
      }}
    >
      <div className="c-hero__glow" aria-hidden="true" />

      {/* ── Slide 1 : Présentation ── */}
      <div className={cls(0)}>
        <div className="c-hc__glow" />
        <div className="c-container c-hc__inner">
          <div className="c-hero__content">
            <div className="c-hero__badge">
              <span className="c-hero__badge-dot" />
              Agence digitale · Abidjan, CI
            </div>
            <h1 className="c-hero__headline">
              Construisons<br />le digital de<br /><em>demain.</em>
            </h1>
            <p className="c-hero__sub">
              Solutions web, mobile et design sur-mesure pour les entreprises qui veulent avancer. Laravel, Flutter, React — livré avec précision.
            </p>
            <div className="c-hero__actions">
              <a href="#contact" className="c-btn-primary">
                Démarrer un projet <ArrowBtn />
              </a>
              <a href="#realisations" className="c-btn-ghost">Voir nos réalisations</a>
            </div>
          </div>
          <div className="c-hc__visual">
            <div className="c-hero__red-glow" aria-hidden="true" />
            <img src="/consulting/images/femmedev.png" alt="Développeuse DAV Consulting" className="c-hero__img" />
          </div>
        </div>
      </div>

      {/* ── Slide 2 : Développement ── */}
      <div className={cls(1)}>
        <div className="c-hc__glow" />
        <div className="c-container c-hc__inner">
          <div className="c-hero__content">
            <div className="c-hc__tag">Développement</div>
            <h1 className="c-hero__headline" style={{ fontSize: "clamp(40px, 6vw, 82px)" }}>
              Du code qui fait<br />la <em>différence.</em>
            </h1>
            <p className="c-hero__sub">
              Sites web, applications mobiles et systèmes sur-mesure. Nous transformons vos idées en solutions digitales robustes — Laravel, Flutter, React, Vue.
            </p>
            <ul className="c-hc__list">
              <li>Développement web &amp; mobile</li>
              <li>Conseil &amp; accompagnement digital</li>
              <li>Formalisation des besoins &amp; cahiers des charges</li>
              <li>Intégration de systèmes &amp; APIs</li>
            </ul>
            <div className="c-hero__actions">
              <a href="#contact" className="c-btn-primary">
                Démarrer un projet <ArrowBtn />
              </a>
              <a href="#services" className="c-btn-ghost">Nos services</a>
            </div>
          </div>
          <div className="c-hc__visual">
            <div className="c-hero__red-glow" aria-hidden="true" />
            <img src="/consulting/images/faveur.png" alt="Développement web mobile" className="c-hero__img" />
          </div>
        </div>
      </div>

      {/* ── Slide 3 : Design ── */}
      <div className={cls(2)}>
        <div className="c-hc__glow" />
        <div className="c-container c-hc__inner">
          <div className="c-hero__content">
            <div className="c-hc__tag">Branding &amp; Design</div>
            <h1 className="c-hero__headline">
              Votre identité,<br /><em>magnifiée.</em>
            </h1>
            <p className="c-hero__sub">
              Création de logo, charte graphique, flyers, templates Canva/Figma
            </p>
            <ul className="c-hc__list">
              <li>Création de logo &amp; charte graphique</li>
              <li>Flyers, affiches, roll-ups, brochures</li>
              <li>Templates Canva &amp; Figma</li>
              <li>Communication digitale &amp; shooting photo</li>
            </ul>
            <div className="c-hero__actions">
              <a href="#contact" className="c-btn-primary">
                Démarrer un projet <ArrowBtn />
              </a>
              <a href="#services" className="c-btn-ghost">Nos services</a>
            </div>
          </div>
          <div className="c-hc__visual">
            <div className="c-hero__red-glow" aria-hidden="true" />
            <img src="/consulting/images/design.png" alt="Design & Branding" className="c-hero__img" />
          </div>
        </div>
      </div>

      {/* ── Slide 4 : IT & Infra ── */}
      <div className={cls(3)}>
        <div className="c-hc__glow" />
        <div className="c-container c-hc__inner">
          <div className="c-hero__content">
            <div className="c-hc__tag">IT &amp; Infrastructure</div>
            <h1 className="c-hero__headline" style={{ fontSize: "clamp(40px, 6vw, 82px)" }}>
              Sécurisez votre<br /><em>infrastructure.</em>
            </h1>
            <p className="c-hero__sub">
              Vidéosurveillance, hébergement serveur, sécurisation des données — nous protégeons et optimisons votre système IT de bout en bout.
            </p>
            <ul className="c-hc__list">
              <li>Vidéosurveillance &amp; caméras IP</li>
              <li>Location &amp; hébergement de serveurs</li>
              <li>Sécurisation des données</li>
              <li>Supervision à distance</li>
            </ul>
            <div className="c-hero__actions">
              <a href="#contact" className="c-btn-primary">
                Démarrer un projet <ArrowBtn />
              </a>
              <a href="#services" className="c-btn-ghost">Nos services</a>
            </div>
          </div>
          <div className="c-hc__visual">
            <div className="c-hero__red-glow" aria-hidden="true" />
            <img src="/consulting/images/enneu.png" alt="IT & Surveillance" className="c-hero__img" />
          </div>
        </div>
      </div>

      {/* Flèches */}
      <button className="c-hc__arrow c-hc__arrow--prev" onClick={() => goTo(current - 1)} aria-label="Slide précédent">
        <ArrowLeft />
      </button>
      <button className="c-hc__arrow c-hc__arrow--next" onClick={() => goTo(current + 1)} aria-label="Slide suivant">
        <ArrowRight />
      </button>

      {/* Onglets */}
      <div className="c-hc__tabs" role="tablist">
        {TABS.map((label, i) => (
          <button
            key={i}
            className={`c-hc__tab${i === current ? " c-hc__tab--active" : ""}`}
            onClick={() => goTo(i)}
            role="tab"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
