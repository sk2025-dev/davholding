import { useEffect, useState } from "react";
import "../../styles/BeautePromoSection.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function BeautePromoSection() {
  const [promos, setPromos] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    Promise.allSettled([
      fetch(`${API_URL}/promo-slides`).then((r) => {
        if (!r.ok) throw new Error("Publicités indisponibles");
        return r.json();
      }),
      fetch(`${API_URL}/promos/active`).then((r) => {
        if (!r.ok) throw new Error("Promotions indisponibles");
        return r.json();
      }),
    ])
      .then(([slidesResult, promosResult]) => {
        const slides = slidesResult.status === "fulfilled"
          ? (slidesResult.value?.data || [])
              .filter((slide) => slide.image_url)
              .map((slide) => ({
                ...slide,
                id: `advert-${slide.id}`,
                kind: "Publicité",
                label: slide.title,
                description: slide.subtitle || slide.description,
              }))
          : [];

        const activePromos = promosResult.status === "fulfilled"
          ? (promosResult.value?.data || [])
              .filter((promo) => promo.image_url)
              .map((promo) => ({
                ...promo,
                id: `promo-${promo.id}`,
                kind: "Promotion",
              }))
          : [];

        setPromos([...slides, ...activePromos]);
      })
      .catch(() => {});
  }, []);

  /* Relance le timer à chaque changement de slide — chaque image reste 5s */
  useEffect(() => {
    if (promos.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % promos.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current, promos.length]);

  const goTo = (i) => setCurrent(i);
  const prev = () => setCurrent((c) => (c - 1 + promos.length) % promos.length);
  const next = () => setCurrent((c) => (c + 1) % promos.length);

  if (promos.length === 0) return null;

  return (
    <section className="bpromo-section" aria-label="Promotions et nouveautés">
      <div className="bpromo-banner">
        {promos.map((p, i) => (
          <div
            key={p.id}
            className={`bpromo-slide${i === current ? " bpromo-slide--active" : ""}`}
            aria-hidden={i !== current}
          >
            <img
              className="bpromo-slide__bg"
              src={p.image_url}
              alt={p.label || p.title || "Offre Dav'Beauté"}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="bpromo-slide__overlay" />
            <div className="bpromo-slide__content">
              <span className="bpromo-tag">{p.kind}</span>
              <p className="bpromo-discount">{p.label}</p>
              {p.description && <p className="bpromo-desc">{p.description}</p>}
              {p.code && (
                <span className="bpromo-code">
                  Code : <strong>{p.code}</strong>
                </span>
              )}
              {p.link_url && (
                <a className="bpromo-cta" href={p.link_url}>
                  {p.link_label || "Découvrir l’offre"}
                </a>
              )}
            </div>
          </div>
        ))}

        {promos.length > 1 && (
          <>
            <button className="bpromo-arrow bpromo-arrow--prev" onClick={prev} aria-label="Précédent">‹</button>
            <button className="bpromo-arrow bpromo-arrow--next" onClick={next} aria-label="Suivant">›</button>
            <div className="bpromo-dots">
              {promos.map((_, i) => (
                <button
                  key={i}
                  className={`bpromo-dot${i === current ? " bpromo-dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Offre ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default BeautePromoSection;
