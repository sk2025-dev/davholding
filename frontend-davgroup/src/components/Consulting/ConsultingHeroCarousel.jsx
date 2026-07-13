import { useState, useEffect, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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

export default function ConsultingHeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const timerRef = useRef(null);
  const touchXRef = useRef(0);
  const total = slides.length;

  useEffect(() => {
    fetch(`${API_URL}/consulting-hero-slides`)
      .then((res) => res.json())
      .then((json) => setSlides(json?.data || []))
      .catch(() => setSlides([]));
  }, []);

  function startTimer(from) {
    clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % total;
        setExiting(c);
        setTimeout(() => setExiting(null), 700);
        return next;
      });
    }, 6000);
  }

  useEffect(() => {
    startTimer(0);
    return () => clearInterval(timerRef.current);
  }, [total]);

  function goTo(idx) {
    if (total === 0) return;
    const next = ((idx % total) + total) % total;
    if (next === current) return;
    setExiting(current);
    setTimeout(() => setExiting(null), 700);
    setCurrent(next);
    startTimer(next);
  }

  const cls = (i) =>
    `c-hc__slide${i === current ? " c-hc__slide--active" : ""}${i === exiting ? " c-hc__slide--exit" : ""}`;

  if (total === 0) return null;

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

      {slides.map((slide, i) => (
        <div key={slide.id} className={cls(i)}>
          <div className="c-hc__glow" />
          <div className="c-container c-hc__inner">
            <div className="c-hero__content">
              {slide.tag && <div className="c-hc__tag">{slide.tag}</div>}
              <h1 className="c-hero__headline">
                {slide.headline.split("\n").map((line, li) => (
                  <span key={li}>
                    {line}
                    <br />
                  </span>
                ))}
                {slide.headline_highlight && <em>{slide.headline_highlight}</em>}
              </h1>
              {slide.subtitle && <p className="c-hero__sub">{slide.subtitle}</p>}
              {slide.bullets?.length > 0 && (
                <ul className="c-hc__list">
                  {slide.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              )}
              {i === 0 && (
                <div className="c-hero__actions">
                  <a href={slide.cta_primary_link || "#contact"} className="c-btn-primary">
                    {slide.cta_primary_label || "Démarrer un projet"} <ArrowBtn />
                  </a>
                  {slide.cta_secondary_label && (
                    <a href={slide.cta_secondary_link || "#services"} className="c-btn-ghost">
                      {slide.cta_secondary_label}
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="c-hc__visual">
              <div className="c-hero__red-glow" aria-hidden="true" />
              {slide.image_url && <img src={slide.image_url} alt={slide.tab_label} className="c-hero__img" />}
            </div>
          </div>
        </div>
      ))}

      {total > 1 && (
        <>
          <button className="c-hc__arrow c-hc__arrow--prev" onClick={() => goTo(current - 1)} aria-label="Slide précédent">
            <ArrowLeft />
          </button>
          <button className="c-hc__arrow c-hc__arrow--next" onClick={() => goTo(current + 1)} aria-label="Slide suivant">
            <ArrowRight />
          </button>
        </>
      )}
    </section>
  );
}
