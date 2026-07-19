const WHATSAPP_NUMBER = "2250757249390";

const offers = [
  {
    name: "Présence digitale",
    price: "400 000",
    description: "Une porte d'entrée rapide pour rendre votre activité visible et commencer à générer des contacts.",
    features: [
      "Site vitrine professionnel",
      "Logo et identité visuelle de base",
      "Charte graphique simplifiée",
      "Formulaire de contact et mise en ligne",
    ],
  },
  {
    name: "Application métier",
    qualifier: "Offre cœur",
    price: "1 500 000",
    featured: true,
    description: "Le savoir-faire central de Dav'Consulting pour digitaliser un processus métier avec une solution sur mesure.",
    features: [
      "Application web ou mobile sur mesure",
      "Cahier des charges formalisé",
      "Conception UX/UI",
      "Développement et suivi en méthode Agile",
    ],
  },
  {
    name: "Solution complète + IA",
    qualifier: "Différenciateur",
    price: "2 800 000",
    description: "Une application métier enrichie d'une brique d'intelligence artificielle adaptée à votre usage.",
    features: [
      "Tout le contenu du pack Application métier",
      "Chatbot WhatsApp ou assistant intelligent",
      "Automatisation d'une tâche répétitive",
      "Matching, recommandation ou aide à la décision",
    ],
  },
];

function whatsappLink(offerName) {
  const message = `Bonjour Dav Consulting, je souhaite échanger au sujet du pack « ${offerName} ».`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ConsultingLaunchOffers() {
  return (
    <section className="c-section c-launch-offers" id="offres">
      <div className="c-container">
        <div className="c-launch-offers__head">
          <div>
            <div className="c-section-tag c-reveal-l">Offre de lancement</div>
            <h2 className="c-section-heading c-reveal-l">Trois packs pour démarrer clairement</h2>
          </div>
          <p className="c-section-desc c-reveal-r">
            Des périmètres lisibles et un prix de départ affiché pour vous aider à identifier rapidement
            la formule adaptée à votre projet.
          </p>
        </div>

        <div className="c-launch-offers__grid">
          {offers.map((offer) => (
            <article
              className={`c-offer-card c-reveal${offer.featured ? " c-offer-card--featured" : ""}`}
              key={offer.name}
            >
              {offer.qualifier && <span className="c-offer-card__qualifier">{offer.qualifier}</span>}
              <h3>{offer.name}</h3>
              <p className="c-offer-card__description">{offer.description}</p>
              <div className="c-offer-card__price">
                <span>À partir de</span>
                <strong>{offer.price}</strong>
                <small>FCFA</small>
              </div>
              <ul>
                {offer.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(offer.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={offer.featured ? "c-btn-primary" : "c-btn-ghost"}
              >
                Choisir ce pack <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
        <p className="c-launch-offers__note">
          Prix indicatifs hors besoins spécifiques, hébergement, licences et services tiers. Un cadrage
          confirme le périmètre et le budget définitif avant démarrage.
        </p>
      </div>
    </section>
  );
}
