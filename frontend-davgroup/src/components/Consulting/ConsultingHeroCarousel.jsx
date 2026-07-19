import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const DEFAULT_IMAGE = "/consulting/images/femmedev.png";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ConsultingHeroCarousel() {
  const [image, setImage] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/consulting-hero-slides`)
      .then((res) => res.json())
      .then((json) => {
        const firstImage = json?.data?.find((slide) => slide.image_url)?.image_url;
        if (firstImage) setImage(firstImage);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="c-hc c-hero-static" id="hero" aria-labelledby="consulting-hero-title">
      <div className="c-hero__glow" aria-hidden="true" />
      <div className="c-hc__glow" aria-hidden="true" />
      <div className="c-container c-hc__inner">
        <div className="c-hero__content">
          <div className="c-hc__tag">Agence digitale · Abidjan</div>
          <h1 className="c-hero__headline" id="consulting-hero-title">
            L'agence technologique qui propulse la croissance de votre entreprise.
          </h1>
          <p className="c-hero__sub">
            Nous concevons des solutions web, mobiles, créatives et IT qui transforment vos idées en résultats concrets.
          </p>
          <div className="c-hero__actions">
            <a href="#contact" className="c-btn-primary">
              Démarrer un projet <ArrowIcon />
            </a>
            <a href="#service-overview" className="c-btn-ghost">
              Découvrir nos services
            </a>
          </div>
        </div>
        <div className="c-hc__visual">
          <div className="c-hero__red-glow" aria-hidden="true" />
          <img
            src={image}
            alt="Experte DAV Consulting présentant une solution digitale"
            className="c-hero__img"
            onError={(event) => {
              event.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </div>
      </div>
    </section>
  );
}
