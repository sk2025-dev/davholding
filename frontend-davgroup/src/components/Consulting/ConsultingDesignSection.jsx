import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const DEFAULT_IMAGE = "/consulting/images/graphiste.png";

export default function ConsultingDesignSection() {
  const [image, setImage] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/consulting-section-images`)
      .then((res) => res.json())
      .then((json) => setImage(json?.data?.design || DEFAULT_IMAGE))
      .catch(() => setImage(DEFAULT_IMAGE));
  }, []);

  return (
    <section className="c-section" id="design">
      <div className="c-container">
        <div className="c-what-grid">
          <div>
            <img
              src={image}
              alt="Conception graphique"
              className="c-what-img c-reveal-l"
            />
          </div>
          <div>
            <div className="c-section-tag c-reveal-l">Ce que nous faisons</div>
            <h2 className="c-section-heading c-reveal-l" style={{ marginBottom: 18 }}>
              Conception graphique
            </h2>
            <p className="c-section-desc c-reveal-l" style={{ marginBottom: 26 }}>
              Que vous ayez besoin d'un tout nouveau site web, d'une campagne de rebranding ou d'une optimisation des performances de votre plateforme actuelle, nous sommes là pour vous.
            </p>
            <div className="c-what-list">
              <details open>
                <summary>Branding & Identité visuelle</summary>
                <p>Identité visuelle, logos, chartes graphiques et supports imprimés adaptés à votre marque.</p>
              </details>
              <details>
                <summary>Création de logo</summary>
                <p>Un bon logo ne se contente pas d'être joli, il raconte votre histoire et marque les esprits. Nous concevons des logos uniques, modernes et intemporels.</p>
              </details>
              <details>
                <summary>Supports de communication</summary>
                <p>Que ce soit pour un événement, la promotion d'un service ou votre communication au quotidien, nous créons des supports visuels percutants qui captivent votre audience.</p>
              </details>
              <details>
                <summary>Création de templates personnalisés</summary>
                <p>Vous souhaitez être autonome dans votre communication tout en gardant un rendu professionnel ? Nous créons des modèles sur-mesure et réutilisables sur Canva ou Figma.</p>
              </details>
              <details>
                <summary>Charte graphique complète</summary>
                <p>Pour que votre marque soit reconnue partout et par tous, nous réalisons un document de référence complet qui définit toutes les règles d'utilisation de votre identité visuelle.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
