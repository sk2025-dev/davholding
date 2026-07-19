const services = [
  {
    number: "01",
    title: "Développement Web & Mobile",
    description: "Solutions métiers, plateformes digitales et applications sur mesure, pensées pour évoluer avec votre entreprise.",
    href: "#services",
  },
  {
    number: "02",
    title: "Design & Identité Visuelle",
    description: "Logos, chartes graphiques, interfaces UI/UX et supports qui rendent votre marque claire et mémorable.",
    href: "#design",
  },
  {
    number: "03",
    title: "IT, Réseaux & Sécurité",
    description: "Vidéosurveillance, hébergement, serveurs, protection des données et supervision de votre infrastructure.",
    href: "#it",
  },
];

export default function ConsultingServicesOverview() {
  return (
    <section className="c-section c-services-overview" id="service-overview">
      <div className="c-container">
        <div className="c-services-overview__head">
          <div className="c-section-tag c-reveal">Notre expertise</div>
          <h2 className="c-section-heading c-reveal">Une vision claire de nos services</h2>
          <p className="c-section-desc c-reveal">
            Identifiez immédiatement l'expertise dont votre projet a besoin, puis découvrez notre approche en détail.
          </p>
        </div>
        <div className="c-services-overview__grid">
          {services.map((service) => (
            <article className="c-service-overview-card c-reveal" key={service.number}>
              <span className="c-service-overview-card__number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.href}>
                En savoir plus <span aria-hidden="true">↓</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
