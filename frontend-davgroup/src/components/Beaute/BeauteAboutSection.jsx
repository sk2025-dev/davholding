import { useClientAuth } from "../../context/ClientAuthContext";
import "../../styles/BeauteAbout.css";

const CHAPTERS = [
  {
    id: "histoire",
    eyebrow: "Notre histoire",
    title: "Née d'une passion, grandie par la confiance",
    body: "Dav'Beauté est née d'un rêve simple : offrir à chaque femme un espace où elle se sent belle, écoutée et valorisée. Fondé avec peu de moyens mais beaucoup de cœur, le salon s'est construit année après année grâce à la fidélité de ses clientes et à l'excellence de ses prestataires.",
    image: "/images/madame k.webp",
    reverse: false,
  },
  {
    id: "vision",
    eyebrow: "Notre vision",
    title: "La beauté accessible, sans compromis sur la qualité",
    body: "Nous croyons que le luxe n'est pas réservé à quelques-unes. Chez Dav'Beauté, chaque service est pensé pour allier qualité des produits, expertise du geste et chaleur de l'accueil. Notre ambition : que chaque cliente reparte transformée, confiante et rayonnante.",
    image: "/images/miriam.webp",
    reverse: true,
  },
  {
    id: "valeurs",
    eyebrow: "Nos valeurs",
    title: "Ce qui nous guide chaque jour",
    values: [
      { icon: "✦", label: "Excellence", text: "Des techniques maîtrisées, des produits sélectionnés avec soin." },
      { icon: "✦", label: "Bienveillance", text: "Un accueil chaleureux, une écoute attentive à chaque visite." },
      { icon: "✦", label: "Authenticité", text: "Nous restons fidèles à nos origines, fières de qui nous sommes." },
      { icon: "✦", label: "Confiance", text: "Une relation durable, bâtie sur la transparence et le respect." },
    ],
  },
];

function BeauteAboutSection() {
  const { openBooking } = useClientAuth();

  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <header className="about-hero">
        <span className="about-hero__eyebrow">Qui sommes-nous</span>
        <h1 className="about-hero__title">
          Une image rouge, noire et dorée<br />
          qui dit <em>luxe, savoir-faire</em> et confiance.
        </h1>
        <div className="about-hero__line" />
      </header>

      {/* ── Chapitres ── */}
      {CHAPTERS.map((ch) => (
        <section key={ch.id} className="about-chapter" id={ch.id}>

          {/* Chapitre photo/texte */}
          {ch.image && (
            <div className={`about-split${ch.reverse ? " about-split--reverse" : ""}`}>
              <div className="about-split__photo">
                <img src={ch.image} alt={ch.eyebrow} loading="lazy" decoding="async" />
              </div>
              <div className="about-split__body">
                <span className="about-eyebrow">{ch.eyebrow}</span>
                <h2 className="about-title">{ch.title}</h2>
                <div className="about-divider" />
                <p className="about-body">{ch.body}</p>
              </div>
            </div>
          )}

          {/* Chapitre valeurs */}
          {ch.values && (
            <div className="about-values">
              <div className="about-values__header">
                <span className="about-eyebrow">{ch.eyebrow}</span>
                <h2 className="about-title">{ch.title}</h2>
                <div className="about-divider" />
              </div>
              <ul className="about-values__grid">
                {ch.values.map((v) => (
                  <li key={v.label} className="about-value">
                    <span className="about-value__icon">{v.icon}</span>
                    <strong className="about-value__label">{v.label}</strong>
                    <p className="about-value__text">{v.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="about-chapter__sep" />
        </section>
      ))}

      {/* ── CTA final ── */}
      <div className="about-cta">
        <p className="about-cta__text">
          Prête à vivre l'expérience Dav'Beauté ?
        </p>
        <button
          className="about-cta__btn"
          onClick={() => openBooking()}
        >
          📅 Prendre rendez-vous
        </button>
      </div>

    </div>
  );
}

export default BeauteAboutSection;
