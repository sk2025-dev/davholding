import { useEffect, useState } from "react";
import BeauteLayout from "../components/Beaute/BeauteLayout";
import { useClientAuth } from "../context/ClientAuthContext";
import "../styles/BeauteSpa.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const SPA_IMAGES = {
  "Entretien de mariée": "/images/marrier.webp",
};

const FALLBACK = [
  {
    id: "f1",
    title: "Soin de visage",
    subtitle: "Soin purifiant & éclat",
    price: "25 000 FCFA",
    duration: "1H00",
    image_url: "/images/madame k.webp",
    description: "Un soin visage sur-mesure pour purifier, hydrater et révéler l'éclat naturel de votre peau. Diagnostic personnalisé inclus.",
  },
  {
    id: "f2",
    title: "Massage relaxant",
    subtitle: "Corps & bien-être",
    price: "30 000 FCFA",
    duration: "1H30",
    image_url: "/images/spa4.jpeg",
    description: "Un voyage sensoriel pour relâcher les tensions et retrouver un équilibre profond. Huiles essentielles naturelles, ambiance tamisée.",
  },
  {
    id: "f3",
    title: "Entretien de mariée",
    subtitle: "Soin & mise en beauté",
    price: "Sur devis",
    duration: "3H00",
    image_url: "/images/marrier.webp",
    description: "Un accompagnement beauté complet pour les futures mariées : soin du visage, coiffure et mise en beauté pour un jour inoubliable.",
  },
];

function BeauteSpaPage() {
  const { openBooking } = useClientAuth();
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/beauty-services?section_key=spa`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        const items = (data?.data || []).filter((i) => i.is_active).map((i) => ({
          ...i,
          image_url: i.image_url || SPA_IMAGES[i.title] || null,
        }));
        setServices(items.length > 0 ? items : FALLBACK);
      })
      .catch(() => setServices(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = (service) => {
    openBooking({ title: service.title, subtitle: service.subtitle || service.title });
  };

  return (
    <BeauteLayout>
      <div className="spa3-page">

        {/* ── En-tête ── */}
        <header className="spa3-header">
          <span className="spa3-header__eyebrow">Spa &amp; Soins</span>
          <h1 className="spa3-header__title">
            L'art du <em>bien-être</em>
          </h1>
          <div className="spa3-header__line" />
        </header>

        {/* ── Timeline ── */}
        {loading ? (
          <div className="spa3-loading">
            <div className="spa3-spinner" />
          </div>
        ) : (
          <ol className="spa3-list">
            {services.map((s, idx) => (
              <li className="spa3-item" key={s.id}>

                {/* Photo ronde */}
                <div className="spa3-item__circle">
                  <img
                    src={s.image_url || "/images/placeholder.svg"}
                    alt={s.title}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>

                {/* Point sur la ligne */}
                <div className="spa3-item__dot" />

                {/* Numéro */}
                <span className="spa3-item__num">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Texte */}
                <div className="spa3-item__content">
                  {s.subtitle && (
                    <p className="spa3-item__eyebrow">{s.subtitle}</p>
                  )}
                  <h2 className="spa3-item__title">{s.title}</h2>
                  {s.description && (
                    <p className="spa3-item__desc">{s.description}</p>
                  )}
                  <div className="spa3-item__meta">
                    {s.duration && (
                      <span className="spa3-item__tag">⏱ {s.duration}</span>
                    )}
                    {s.price && (
                      <span className="spa3-item__tag spa3-item__tag--price">
                        {s.price}
                      </span>
                    )}
                  </div>
                  <button className="spa3-item__btn" onClick={() => handleBook(s)}>
                    Réserver ce soin →
                  </button>
                </div>

              </li>
            ))}
          </ol>
        )}

      </div>
    </BeauteLayout>
  );
}

export default BeauteSpaPage;
