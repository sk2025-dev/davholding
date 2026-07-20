import { useEffect, useState } from "react";
import ContactModal from "../ContactModal";

const WAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.537 4.09 1.475 5.829L.022 23.978l6.304-1.428A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.791 0-3.497-.472-4.988-1.303l-.357-.214-3.713.84.883-3.587-.234-.373A9.797 9.797 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
  </svg>
);

const FormIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ConsultingCTA() {
  const [formOpen, setFormOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  useEffect(() => {
    const openQuoteForm = (event) => {
      setInitialMessage(event.detail?.message || "");
      setFormOpen(true);
    };
    window.addEventListener("consulting:open-quote", openQuoteForm);
    return () => window.removeEventListener("consulting:open-quote", openQuoteForm);
  }, []);

  return (
    <>
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
                href="https://wa.me/2250566232575?text=Bonjour%20Dav%20Consulting%2C%20je%20souhaite%20discuter%20d%27un%20projet%20digital"
                target="_blank"
                rel="noopener noreferrer"
                className="c-btn-wa"
              >
                <WAIcon /> WhatsApp
              </a>
              <button
                type="button"
                className="c-btn-email"
                onClick={() => {
                  setInitialMessage("");
                  setFormOpen(true);
                }}
              >
                <FormIcon /> Remplir le formulaire
              </button>
            </div>
          </div>
        </div>
      </section>
      <ContactModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        initialMessage={initialMessage}
        whatsappNumber="2250566232575"
      />
    </>
  );
}
