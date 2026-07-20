import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const DEFAULT_IMAGE = "/consulting/images/it.png";

export default function ConsultingITSection() {
  const [image, setImage] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/consulting-section-images`)
      .then((res) => res.json())
      .then((json) => setImage(json?.data?.it || DEFAULT_IMAGE))
      .catch(() => setImage(DEFAULT_IMAGE));
  }, []);

  return (
    <section className="c-section c-app-mobile-section" id="it">
      <div className="c-container">
        <div className="c-app-mobile-grid">
          <div>
            <div className="c-section-tag c-reveal-l">IT et Surveillance</div>
            <h2 className="c-section-heading c-reveal-l" style={{ marginBottom: 18 }}>
              Installation & configuration de système de sécurité
            </h2>
            <p className="c-section-desc c-reveal-l" style={{ marginBottom: 26 }}>
              Nous installons des systèmes de vidéosurveillance intelligents permettant de surveiller vos locaux en temps réel, où que vous soyez.
            </p>
            <div className="c-app-list">
              <details open>
                <summary>Vidéosurveillance & caméras IP</summary>
                <p>
                  Installation de caméras IP haute définition<br />
                  Visualisation en direct depuis téléphone ou ordinateur<br />
                  Enregistrement sécurisé des vidéos<br />
                  Détection de mouvements et alertes automatiques<br />
                  Surveillance intérieure et extérieure
                </p>
              </details>
              <details>
                <summary>Location & hébergement de serveurs</summary>
                <p>
                  Serveurs dédiés ou virtualisés<br />
                  Hébergement cloud ou local<br />
                  Sauvegardes automatiques<br />
                  Maintenance et monitoring serveur<br />
                  Configuration des accès utilisateurs
                </p>
              </details>
              <details>
                <summary>Sécurisation des données</summary>
                <p>
                  Sauvegarde automatique des données<br />
                  Chiffrement des informations sensibles<br />
                  Gestion des accès et permissions<br />
                  Protection antivirus et pare-feu<br />
                  Audit et recommandations de sécurité
                </p>
              </details>
              <details>
                <summary>Supervision à distance</summary>
                <p>
                  Surveillance des serveurs et équipements réseau<br />
                  Monitoring des performances système<br />
                  Alertes automatiques en cas de panne<br />
                  Assistance et maintenance à distance<br />
                  Rapports de supervision réguliers
                </p>
              </details>
            </div>
          </div>
          <div className="c-app-mobile-visual">
            <img src={image} alt="IT & Surveillance" />
            <button
              type="button"
              className="c-btn-primary c-section-quote-cta c-reveal-r"
              onClick={() => window.dispatchEvent(new CustomEvent("consulting:open-quote", {
                detail: {
                  message: "Bonjour Dav'Consulting, je souhaite demander un devis pour une solution IT et surveillance.",
                },
              }))}
            >
              Demander un devis
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
