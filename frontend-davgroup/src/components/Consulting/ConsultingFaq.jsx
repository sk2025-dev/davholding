const questions = [
  {
    question: "Dav'Consulting est-il une société indépendante ?",
    answer:
      "Non. Dav'Consulting est le pôle technologique de Dav'Holding Group SARL, aux côtés de Dav'Beauté et Dav'Market.",
  },
  {
    question: "Quels services propose Dav'Consulting ?",
    answer:
      "Nous concevons des sites, applications web et mobiles, identités visuelles, interfaces UI/UX, infrastructures IT et solutions de sécurité adaptées aux besoins métier.",
  },
  {
    question: "Quel budget prévoir pour démarrer un projet ?",
    answer:
      "Les offres commencent à 400 000 FCFA pour une présence digitale, 1 500 000 FCFA pour une application métier et 2 800 000 FCFA pour une solution métier avec une composante IA. Le budget final dépend du périmètre validé.",
  },
  {
    question: "Travaillez-vous avec les PME et les institutions ?",
    answer:
      "Oui. Notre expérience couvre les PME, l'immobilier, les projets institutionnels, la géomatique, REDD+, le MINEF et l'Agence Emploi Jeune.",
  },
  {
    question: "Comment démarre un accompagnement ?",
    answer:
      "Nous commençons par analyser le besoin, puis nous formalisons le cahier des charges, réalisons la solution par étapes et accompagnons sa mise en production.",
  },
];

export default function ConsultingFaq() {
  return (
    <section className="c-section c-faq" id="faq" aria-labelledby="faq-title">
      <div className="c-container c-faq__layout">
        <div className="c-faq__head">
          <div className="c-section-tag c-reveal-l">Questions fréquentes</div>
          <h2 className="c-section-heading c-reveal-l" id="faq-title">
            L'essentiel avant de <span>nous confier votre projet</span>
          </h2>
          <p className="c-section-desc c-reveal-l">
            Des réponses directes pour comprendre notre structure, nos services et notre méthode.
          </p>
        </div>
        <div className="c-faq__list">
          {questions.map(({ question, answer }, index) => (
            <details className="c-faq__item c-reveal-r" key={question} open={index === 0}>
              <summary>
                <span>{question}</span>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
