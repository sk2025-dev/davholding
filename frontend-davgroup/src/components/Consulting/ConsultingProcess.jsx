const steps = [
  {
    img: "/consulting/images/audit.png",
    alt: "Audit & équipe",
    title: "Analyse minutieuse de votre projet",
    desc: "Nous étudions en profondeur vos besoins, vos objectifs et les contraintes techniques afin de proposer une solution adaptée, performante et évolutive.",
  },
  {
    img: "/consulting/images/deu.png",
    alt: "Atelier & design",
    title: "Rédaction du cahier des charges",
    desc: "Nous rédigeons un cahier des charges détaillé définissant les fonctionnalités, les besoins métier, les parcours utilisateurs ainsi que les spécifications techniques du projet.",
  },
  {
    img: "/consulting/images/pilot.png",
    alt: "Choix technologique",
    title: "Construction de la maquette & validation UX/UI",
    desc: "Nous concevons une maquette moderne et intuitive permettant de visualiser l'architecture, le design et l'expérience utilisateur avant le développement final.",
  },
  {
    img: "/consulting/images/woman.png",
    alt: "Cahier des charges",
    title: "Développement & suivi en méthode Agile",
    desc: "Le projet est développé étape par étape avec une approche Agile, permettant des validations régulières, des ajustements continus et une livraison progressive des fonctionnalités.",
  },
];

export default function ConsultingProcess() {
  return (
    <section className="c-section c-process-section" id="dev-process">
      <div className="c-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, gap: 20 }}>
          <div>
            <div className="c-section-tag c-reveal-l">Processus d'accompagnement</div>
            <h2 className="c-section-heading c-reveal-l" style={{ marginBottom: 6 }}>
              Conseil & accompagnement digital
            </h2>
            <p className="c-section-desc c-reveal-l">
              Nos prestations structurées pour transformer une idée en produit digital performant.
            </p>
          </div>
        </div>

        <div className="c-process-grid">
          {steps.map((step, i) => (
            <article key={i} className="c-process-card c-reveal-l">
              <img src={step.img} alt={step.alt} />
              <div className="c-process-card__overlay" />
              <div className="c-process-card__content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
