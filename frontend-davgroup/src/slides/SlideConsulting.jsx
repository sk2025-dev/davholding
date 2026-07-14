import { Link } from "react-router-dom";

function SlideConsulting() {
  return (
    <>
      <div className="uni-slide" data-index="2" id="slide2">
        <div
          className="slide-bg"
          id="bg2"
          style={{ backgroundImage: 'url("/images/devequipe.png")' }}
        ></div>
        <div className="slide-overlay slide-overlay--tech"></div>
        <div className="slide-streak" style={{ left: "55%" }}></div>

        <div className="slide-content">
          <div className="slide-glass slide-glass--tech" id="glass2">
            <div className="slide-brand-logo slide-brand-logo--consulting">
              <img src="/images/code.png" alt="DAV Consulting" />
            </div>
            <p className="slide-desc">
              Solutions IT sur-mesure &amp; transformation digitale.
              <br />
              Le conseil stratégique des entreprises d'aujourd'hui.
            </p>
            <div className="slide-features slide-features--tech">
              <span>Développement web &amp; mobile</span>
              <span>Transformation digitale</span>
              <span>Stratégie data &amp; IA</span>
            </div>
            <Link to="/consulting" className="slide-cta slide-cta--tech">
              <span>Découvrir DAV Consulting</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className="slide-ghost-text">CONSULTING</div>
      </div>
    </>
  );
}

export default SlideConsulting;
