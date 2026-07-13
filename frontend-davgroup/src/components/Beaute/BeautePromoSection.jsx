import { useEffect, useState } from "react";
import "../../styles/BeautePromoSection.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function BeautePromoSection() {
  const [promos, setPromos] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/promos/active`)
      .then((r) => r.json())
      .then((d) => {
        const withImage = (d?.data || []).filter((p) => p.image_url);
        setPromos(withImage);
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

  const promo = promos[current];

  return (
    <div className="bpromo-banner">
      {promos.map((p, i) => (
        <div
          key={p.id}
          className={`bpromo-slide${i === current ? " bpromo-slide--active" : ""}`}
          aria-hidden={i !== current}
        >
          <img className="bpromo-slide__bg" src={p.image_url} alt={p.code} />
          <div className="bpromo-slide__overlay" />
          <div className="bpromo-slide__content">
            <span className="bpromo-tag">Promotion</span>
            <p className="bpromo-discount">{p.label}</p>
            {p.description && <p className="bpromo-desc">{p.description}</p>}
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
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BeautePromoSection;
