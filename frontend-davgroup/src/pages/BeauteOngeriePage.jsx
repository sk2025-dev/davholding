import { useEffect, useState } from "react";
import BeauteLayout from "../components/Beaute/BeauteLayout";
import BeautySectionHeader from "../components/Beaute/BeautySectionHeader";
import { useClientAuth } from "../context/ClientAuthContext";
import "../styles/BeauteCoiffures.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const FALLBACK = [
  { id: "f1", title: "Pose gel simple",    image_url: "/images/rougebordauongle.jpg" },
  { id: "f2", title: "Nail art French",    image_url: "/images/onglet blanccourt.jpg" },
  { id: "f3", title: "Pose gel longue",    image_url: "/images/ongletlong.jpg" },
  { id: "f4", title: "Résine élégante",    image_url: "/images/elegant.jpg" },
  { id: "f5", title: "Nail art mignon",    image_url: "/images/mignon.jpg" },
  { id: "f6", title: "Design marron",      image_url: "/images/designmarron.jpg" },
];

function BeauteOngeriePage() {
  const { requireAuth, openBooking } = useClientAuth();
  const [photos, setPhotos]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/beauty-services?section_key=ongerie`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        const items = (data?.data || []).filter((i) => i.is_active);
        setPhotos(items.length > 0 ? items : FALLBACK);
      })
      .catch(() => setPhotos(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const handleChoose = (photo) => {
    requireAuth(() => openBooking({ title: photo.title, subtitle: photo.title }));
  };

  return (
    <BeauteLayout>
      <section className="beauty-section beauty-coiffures" id="ongerie">
        <BeautySectionHeader
          eyebrow="Onglerie"
          title=""
          className="beauty-coiffures__header"
        />

        <div className="beauty-section-heading beauty-real-section-header">
          <div>
            <p>Nos poses & nail art</p>
            <h2>
              Gel · Résine · <span>Nail art</span> · French
            </h2>
            <span className="beauty-section-subtitle">
              Pose soignée, couleur, forme et finition raffinée.
            </span>
          </div>
          <button
            className="beauty-btn beauty-btn--primary"
            onClick={() => requireAuth(() => openBooking())}
          >
            📅 Prendre un rendez-vous
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 }}>
            Chargement…
          </div>
        ) : (
          <div className="beauty-real-grid beauty-coiffures-grid">
            {photos.map((photo) => (
              <div className="coif-card" key={photo.id}>
                {photo.image_url && (
                  <img
                    className="coif-card__img"
                    src={photo.image_url}
                    alt={photo.title}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className="coif-card__placeholder">
                  <span>💅</span>
                  <p>{photo.title || "Photo"}</p>
                </div>
                <div className="coif-card__overlay">
                  <p className="coif-card__name">{photo.title}</p>
                  <button
                    className="coif-card__btn"
                    onClick={() => handleChoose(photo)}
                  >
                    Choisir cette pose
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </BeauteLayout>
  );
}

export default BeauteOngeriePage;
