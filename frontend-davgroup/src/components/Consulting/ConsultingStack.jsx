const logos = [
  { src: "/consulting/images/reactjs.png", alt: "React JS" },
  { src: "/consulting/images/figma b.png", alt: "Figma" },
  { src: "/consulting/images/js e.png", alt: "JavaScript" },
  { src: "/consulting/images/flutterre.png", alt: "Flutter" },
  { src: "/consulting/images/mysql d.png", alt: "MySQL" },
  { src: "/consulting/images/py.png", alt: "Python" },
  { src: "/consulting/images/phpa.png", alt: "PHP" },
  { src: "/consulting/images/vue c.png", alt: "Vue.js" },
  { src: "/consulting/images/post.png", alt: "PostgreSQL" },
];

export default function ConsultingStack() {
  return (
    <section className="c-section c-section--alt" id="stack">
      <div className="c-container">
        <div className="c-stack-grid">
          <div>
            <div className="c-section-tag c-reveal-l">Stack technique</div>
            <h2 className="c-section-heading c-reveal-l">
              Nos technologies<br />
              <em style={{ color: "var(--red)", fontStyle: "italic" }}>maîtrisées</em>
            </h2>
            <p className="c-section-desc c-reveal-l">
              Chaque technologie est choisie pour sa robustesse, sa performance et sa pertinence pour vos projets.
            </p>
            <a href="#contact" className="c-btn-primary c-reveal-l" style={{ width: "fit-content", display: "inline-flex" }}>
              Discuter de votre projet
            </a>
          </div>
          <div className="c-stack-logos">
            {logos.map((logo, i) => (
              <div key={i} className="c-stack-logo-item">
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
