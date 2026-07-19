const achievements = [
  "Plateforme Dav'Beauté",
  "Application de gestion Métho",
  "Application de présence PRE",
  "Site de l'Agence Emploi Jeunes",
];

const expertise = [
  "Développement web & mobile",
  "Systèmes d'information géographique",
  "Architecture de données & serveurs",
  "Pilotage de projets institutionnels",
];

export default function ConsultingAbout() {
  return (
    <section className="c-section c-about" id="about">
      <div className="c-container">
        <div className="c-about__intro">
          <div>
            <div className="c-section-tag c-reveal-l">À propos de Dav'Consulting</div>
            <h2 className="c-section-heading c-reveal-l">
              Le pôle technologique de <span>Dav'Holding Group SARL</span>
            </h2>
          </div>
          <div className="c-about__intro-copy c-reveal-r">
            <p>
              Dav'Consulting est la division opérationnelle tech de Dav'Holding Group SARL, aux
              côtés de Dav'Beauté et Dav'Market.
            </p>
            <p>
              Depuis son lancement en 2026, le pôle s'appuie déjà sur des projets concrets réalisés :
              une base solide pour accompagner les entreprises, les institutions et les
              organisations internationales.
            </p>
          </div>
        </div>

        <div className="c-about__ecosystem c-reveal">
          <span>Dav'Holding Group SARL</span>
          <i aria-hidden="true" />
          <strong>Dav'Consulting</strong>
          <i aria-hidden="true" />
          <span>Dav'Beauté</span>
          <i aria-hidden="true" />
          <span>Dav'Market</span>
        </div>

        <div className="c-about__grid">
          <article className="c-about-card c-about-card--track c-reveal-l">
            <span className="c-about-card__eyebrow">Un track record immédiat</span>
            <h3>Quatre projets livrés dès le premier jour officiel</h3>
            <ul className="c-about__achievements">
              {achievements.map((achievement, index) => (
                <li key={achievement}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </article>

          <article className="c-about-card c-about-card--founder c-reveal-r">
            <div className="c-about-founder__head">
              <div className="c-about-founder__monogram" aria-hidden="true">SK</div>
              <div>
                <span className="c-about-card__eyebrow">Gérant & expert technique</span>
                <h3>Serge-Olivier Kouakou Kassi</h3>
                <p>Ingénieur informaticien · Génie logiciel · Bac+5</p>
              </div>
            </div>
            <p className="c-about-founder__bio">
              Diplômé en 2012, il cumule plus de dix ans d'expérience en développement, systèmes
              d'information et géomatique appliquée à des secteurs variés, notamment l'immobilier
              et l'environnement. En tant qu'expert sur des projets financés par la Banque mondiale,
              le PNUD et la FAO, il a piloté plusieurs projets à fort enjeu métier et territorial.
            </p>
            <div className="c-about__expertise">
              {expertise.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        </div>

        <div className="c-about__institutional c-reveal">
          <div>
            <span className="c-about-card__eyebrow">Expérience institutionnelle</span>
            <h3>Des plateformes à fort enjeu métier et territorial</h3>
          </div>
          <p>
            Projet PRE (REDD+), amélioration du Géoportail du Secrétariat Permanent REDD+,
            plateforme du MINEF pour ACTUM DEV et suivi des bénéficiaires PJEDEC pour
            l'Agence Emploi Jeune.
          </p>
        </div>
      </div>
    </section>
  );
}
