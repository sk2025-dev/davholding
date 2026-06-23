import { useEffect, useState } from "react";
import BeauteLayout from "../components/Beaute/BeauteLayout";
import BeautySectionHeader from "../components/Beaute/BeautySectionHeader";
import { realisationCategories } from "../components/Beaute/beauteData";
import { useClientAuth } from "../context/ClientAuthContext";
import "../styles/BeauteCoiffures.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const fallbackImages = (realisationCategories[1]?.images ?? []).map((img, i) => ({
  id: `fallback-${i}`,
  title: img.alt,
  image_url: img.src,
}));

const PER_PAGE = 12;

function BeauteCoiffuresPage() {
  const { requireAuth, openBooking } = useClientAuth();
  const [photos, setPhotos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(photos.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paged      = photos.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleChoose = (photo) => {
    requireAuth(() => openBooking({ title: photo.title, subtitle: photo.title }));
  };

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
          <>
            <div className="beauty-real-grid beauty-coiffures-grid">
              {paged.map((photo) => (
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
                    <span>📸</span>
                    <p>{photo.title || "Photo"}</p>
                  </div>
                  <div className="coif-card__overlay">
                    <p className="coif-card__name">{photo.title}</p>
                    <button className="coif-card__btn" onClick={() => handleChoose(photo)}>
                      Choisir cette coiffure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="coif-pagination">
                <button
                  className="coif-pag-btn"
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={safePage === 1}
                >‹</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`coif-pag-btn${n === safePage ? " coif-pag-btn--active" : ""}`}
                    onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >{n}</button>
                ))}

                <button
                  className="coif-pag-btn"
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={safePage === totalPages}
                >›</button>

                <span className="coif-pag-info">
                  {photos.length} coiffure{photos.length > 1 ? "s" : ""} — page {safePage}/{totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </section>
    </BeauteLayout>
  );
}

export default BeauteCoiffuresPage;
