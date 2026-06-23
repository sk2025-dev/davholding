const WAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.537 4.09 1.475 5.829L.022 23.978l6.304-1.428A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.791 0-3.497-.472-4.988-1.303l-.357-.214-3.713.84.883-3.587-.234-.373A9.797 9.797 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
  </svg>
);
const ArrowBtn = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ConsultingCTA() {
  return (
    <section className="c-cta" id="contact">
      <div className="c-container">
        <div className="c-cta__inner">
          <img
            className="c-cta__bg-img"
            src="/consulting/images/callcenter.png"
            alt=""
            aria-hidden="true"
          />
          <div className="c-cta__bg-overlay" aria-hidden="true" />
          <div className="c-cta__glow" aria-hidden="true" />
          <p className="c-cta__tag">Vous avez un projet ?</p>
          <h2 className="c-cta__heading">
            Parlons-en<br /><em>maintenant.</em>
          </h2>
          <p className="c-cta__sub">
            Partagez votre vision — nous la transformons en réalité digitale avec les bons outils et la bonne équipe.
          </p>
          <div className="c-cta__actions">
            <a
              href="https://wa.me/2250757249390?text=Bonjour%20DAV%20Consulting%2C%20j%27ai%20un%20projet%20%C3%A0%20vous%20soumettre."
              target="_blank"
              rel="noopener noreferrer"
              className="c-btn-wa"
            >
              <WAIcon /> WhatsApp
            </a>
            <a href="mailto:contact@davconsulting.ci" className="c-btn-email">
              Envoyer un email <ArrowBtn />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
