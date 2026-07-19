import { useState } from "react";
import { useClientAuth } from "../../context/ClientAuthContext";
import { BEAUTY_FAQ } from "./beauteFaqData";
import "../../styles/BeauteFaq.css";

export default function BeauteFaq() {
  const { openBooking } = useClientAuth();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="beauty-faq" aria-labelledby="beauty-faq-title">
      <div className="beauty-faq__intro">
        <span>Questions fréquentes</span>
        <h2 id="beauty-faq-title">Tout savoir avant votre visite.</h2>
        <p>Adresse, réservation, prestations et commandes : retrouvez les réponses essentielles.</p>
        <button type="button" onClick={() => openBooking()}>Prendre rendez-vous</button>
      </div>
      <div className="beauty-faq__list">
        {BEAUTY_FAQ.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `beauty-faq-panel-${index}`;
          return (
            <article className={`beauty-faq__item${isOpen ? " is-open" : ""}`} key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              <div className="beauty-faq__answer" id={panelId} hidden={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
