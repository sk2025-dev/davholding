import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const DEFAULT_IMAGE = "/consulting/images/coding.png";

export default function ConsultingMobileSection() {
  const [image, setImage] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/consulting-section-images`)
      .then((res) => res.json())
      .then((json) => setImage(json?.data?.mobile || DEFAULT_IMAGE))
      .catch(() => setImage(DEFAULT_IMAGE));
  }, []);

  return (
    <section className="c-section c-app-mobile-section dark" id="services">
      <div className="c-container">
        <div className="c-app-mobile-grid">
          <div>
            <div className="c-section-tag c-reveal-l">Développement Mobile</div>
            <h2 className="c-section-heading c-reveal-l" style={{ marginBottom: 18 }}>
              Applications web & mobile
            </h2>
            <p className="c-section-desc c-reveal-l" style={{ marginBottom: 26 }}>
              Nous concevons des applications modernes, rapides et fiables pour le web et le mobile. De l'idée au déploiement, chaque détail est pensé pour offrir une expérience fluide et cohérente.
            </p>
            <div className="c-app-list">
              <details open>
                <summary>Conception produit</summary>
                <p>Nous transformons vos besoins en parcours clairs, en écrans utiles et en interfaces élégantes qui servent réellement vos utilisateurs.</p>
              </details>
              <details>
                <summary>Développement mobile</summary>
                <p>Applications iOS et Android avec une base de code robuste, pensée pour la performance, la maintenance et l'évolution.</p>
              </details>
              <details>
                <summary>Applications web</summary>
                <p>Plateformes web réactives, tableaux de bord et outils métier construits avec une architecture propre et durable.</p>
              </details>
              <details>
                <summary>Intégration API</summary>
                <p>Connexion aux services existants, synchronisation des données et intégration de solutions tierces en toute cohérence.</p>
              </details>
            </div>
          </div>
          <div className="c-app-mobile-visual">
            <img src={image} alt="Développement mobile et web" />
          </div>
        </div>
      </div>
    </section>
  );
}
