import { useEffect, useState } from "react";
import BeauteLayout from "../components/Beaute/BeauteLayout";
import BeautySectionHeader from "../components/Beaute/BeautySectionHeader";
import { realisationCategories } from "../components/Beaute/beauteData";
import { useClientAuth } from "../context/ClientAuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const fallbackImages = (realisationCategories[1]?.images ?? []).map((img, i) => ({
  id: `fallback-${i}`,
  title: img.alt,
  image_url: img.src,
}));

function BeauteCoiffuresPage() {
  const { requireAuth, openBooking } = useClientAuth();
  const [photos, setPhotos]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/beauty-services?section_key=coiffures`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        const coiffures = (data?.data || []).filter((i) => i.is_active);
        setPhotos(coiffures.length > 0 ? coiffures : fallbackImages);
      })
      .catch(() => setPhotos(fallbackImages))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BeauteLayout>
      <section className="beauty-section beauty-coiffures" id="coiffures">
        <BeautySectionHeader
          eyebrow="Nos coiffures"
          title=""
          className="beauty-coiffures__header"
        />

        <div className="beauty-section-heading beauty-real-section-header">
          <div>
            <p>Coiffures phares</p>
            <h2>
              Nattes, <span>twists</span> et coiffures protectrices
            </h2>
            <span className="beauty-section-subtitle">
              Des styles propres, durables et adaptés à la texture du cheveu.
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
              <div className="beauty-real-card" key={photo.id}>
                {photo.image_url && (
                  <img
                    className="beauty-real-img"
                    src={photo.image_url}
                    alt={photo.title}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className="beauty-real-placeholder">
                  <span>📸</span>
                  <p>{photo.title || "Photo"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </BeauteLayout>
  );
}

export default BeauteCoiffuresPage;
