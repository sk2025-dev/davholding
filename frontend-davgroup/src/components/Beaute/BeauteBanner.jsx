import { Link } from "react-router-dom";
import { useClientAuth } from "../../context/ClientAuthContext";

function BeauteBanner() {
  const { requireAuth, openBooking } = useClientAuth();

  return (
    <section className="beauty-banner" id="univers">
      <div className="beauty-banner-content">
        <p className="beauty-eyebrow">Cosmétique · Beauté · Excellence</p>
        <h1>
          Révélez votre
          <span>beauté naturelle</span>
        </h1>
        <p className="beauty-lead">
          Des soins d'exception, un univers premium et une équipe attentive pour
          sublimer chaque rendez-vous.
        </p>
        <div className="beauty-actions">
          <button
            type="button"
            className="beauty-btn beauty-btn--primary"
            onClick={() => requireAuth(() => openBooking())}
          >
            Prendre rendez-vous
          </button>
          <Link
            className="beauty-btn beauty-btn--ghost"
            to="/beaute/realisations"
          >
            Voir nos réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BeauteBanner;
