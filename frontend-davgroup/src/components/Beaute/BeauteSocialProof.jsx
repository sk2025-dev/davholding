import { Link } from "react-router-dom";
import "../../styles/BeauteSocialProof.css";

const proofs = [
  {
    value: "Portfolio réel",
    title: "Des prestations visibles",
    text: "Coiffures, onglerie et soins réalisés par notre équipe sont présentés sans visuels génériques.",
  },
  {
    value: "Cocody Angré",
    title: "Un salon proche de vous",
    text: "Retrouvez Dav’Beauté à la 8e tranche, à Abidjan, avec prise de rendez-vous en ligne.",
  },
  {
    value: "4 univers",
    title: "Une expérience complète",
    text: "Coiffure, onglerie, spa et soins capillaires réunis dans un même espace.",
  },
];

export default function BeauteSocialProof() {
  return (
    <section className="beauty-proof" aria-labelledby="beauty-proof-title">
      <div className="beauty-proof__intro">
        <span>Pourquoi Dav’Beauté ?</span>
        <h2 id="beauty-proof-title">La confiance se construit par des preuves.</h2>
        <p>Découvrez notre travail, notre adresse et nos spécialités avant de réserver.</p>
      </div>
      <div className="beauty-proof__grid">
        {proofs.map((proof) => (
          <article className="beauty-proof__card" key={proof.value}>
            <strong>{proof.value}</strong>
            <h3>{proof.title}</h3>
            <p>{proof.text}</p>
          </article>
        ))}
      </div>
      <div className="beauty-proof__links">
        <Link to="/beaute/realisations">Voir les réalisations</Link>
        <a href="https://www.facebook.com/Davi225" target="_blank" rel="noopener noreferrer">Suivre sur Facebook</a>
        <a href="https://www.instagram.com/davbeaute/" target="_blank" rel="noopener noreferrer">Suivre sur Instagram</a>
        <a href="https://www.tiktok.com/@dav_beaute" target="_blank" rel="noopener noreferrer">Voir sur TikTok</a>
      </div>
    </section>
  );
}
