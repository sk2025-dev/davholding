import { useClientAuth } from "../../context/ClientAuthContext";

export default function BeauteHomeHero() {
  const { openBooking } = useClientAuth();

  return (
    <>
      <section className="beauty-hero" id="beaute-accueil" aria-labelledby="beaute-home-title">
        <div>
          <div className="beauty-eyebrow">Salon de beauté · Cocody Angré</div>
          <h1 id="beaute-home-title">
            Votre beauté,<br /><span>notre savoir-faire.</span>
          </h1>
          <p className="beauty-lead">
            Coiffures protectrices, soins capillaires, onglerie, spa et cosmétiques :
            une expérience complète pensée pour révéler votre beauté et votre bien-être.
          </p>
          <div className="beauty-actions">
            <button className="beauty-btn beauty-btn--primary" type="button" onClick={() => openBooking()}>
              Prendre rendez-vous
            </button>
            <a className="beauty-btn beauty-btn--ghost" href="#realisations">
              Voir nos réalisations
            </a>
          </div>
          <ul className="beauty-highlights" aria-label="Nos spécialités">
            <li>Coiffure</li>
            <li>Onglerie</li>
            <li>Spa</li>
            <li>Soins capillaires</li>
          </ul>
        </div>
        <div className="beauty-hero-media">
          <div className="beauty-hero-card">
            <img
              src="/images/beaue2.webp"
              alt="Prestation beauté réalisée par Dav'Beauté à Cocody Angré"
              fetchPriority="high"
              decoding="async"
            />
            <div className="beauty-hero-badge">
              <span>DAV</span>
              Beauté · Abidjan
            </div>
          </div>
        </div>
      </section>
      <div className="beauty-intro-strip" aria-label="Accès rapide aux services">
        <div>
          <strong>01</strong>
          <span>Conseil personnalisé</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Prestations sur rendez-vous</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Produits sélectionnés</span>
        </div>
      </div>
    </>
  );
}
