import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const SESSION_KEY = "dav_assistant_session";

const QUICK_QUESTIONS = [
  "Que propose Dav'Consulting ?",
  "Quels sont vos tarifs ?",
  "Comment prendre rendez-vous chez Dav'Beauté ?",
  "Je souhaite parler à un conseiller",
];

const KNOWLEDGE = [
  {
    terms: ["consulting", "site", "application", "mobile", "digital", "informatique", "it", "logiciel"],
    answer:
      "Dav'Consulting est le pôle technologique de Dav'Holding Group SARL. Il réalise des sites web, applications web et mobiles, identités visuelles, infrastructures IT, solutions de sécurité et applications métier.",
    actions: [{ label: "Découvrir Dav'Consulting", href: "/davconsulting" }],
  },
  {
    terms: ["tarif", "prix", "cout", "budget", "pack", "devis"],
    answer:
      "Les offres Dav'Consulting commencent à 400 000 FCFA pour une présence digitale, 1 500 000 FCFA pour une application métier et 2 800 000 FCFA pour une solution avec IA. Un cadrage confirme ensuite le budget définitif.",
    actions: [{ label: "Voir les offres", href: "/davconsulting#offres" }],
  },
  {
    terms: ["beaute", "coiffure", "spa", "ongle", "onglerie", "rendez", "rdv", "reservation"],
    answer:
      "Dav'Beauté propose notamment coiffure, soins capillaires, spa, onglerie et cosmétiques. Vous pouvez consulter les prestations et réserver directement en ligne.",
    actions: [{ label: "Prendre rendez-vous", href: "/davbeaute?rdv=1" }],
  },
  {
    terms: ["holding", "groupe", "dav", "structure", "entreprise"],
    answer:
      "Dav'Holding Group SARL est la structure juridique du groupe. Elle réunit notamment Dav'Consulting, le pôle technologique, Dav'Beauté et Dav'Market.",
  },
  {
    terms: ["contact", "conseiller", "humain", "appeler", "telephone", "email", "projet"],
    answer:
      "Je peux vous orienter. Pour échanger avec l'équipe, utilisez le formulaire de contact ou appelez le +225 07 58 86 37 65.",
    contact: true,
  },
];

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s']/gu, " ");
}

function localAnswer(question) {
  const normalized = normalize(question);
  let best = null;
  let bestScore = 0;

  KNOWLEDGE.forEach((entry) => {
    const score = entry.terms.reduce(
      (total, term) => total + (normalized.includes(normalize(term)) ? 1 : 0),
      0,
    );
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  });

  if (bestScore > 0) return { ...best, understood: true };
  return {
    answer:
      "Je n'ai pas encore une réponse suffisamment précise à cette préoccupation. Je l'ai enregistrée pour améliorer mes prochaines réponses. Vous pouvez aussi demander à être contacté par notre équipe.",
    understood: false,
    contact: true,
  };
}

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function DavAssistant({ onContactClick }) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Akwaba 👋 Je suis l'assistant DAV. Posez-moi une question sur nos activités, nos offres ou la prise de rendez-vous.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const messageSequence = useRef(0);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  async function ask(question) {
    const text = question.trim();
    if (!text || typing) return;
    messageSequence.current += 1;
    const userMessage = { id: `user-${messageSequence.current}`, role: "user", text };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    let reply = localAnswer(text);
    if (API_URL) {
      try {
        const response = await fetch(`${API_URL}/chatbot/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ message: text, session_id: getSessionId(), page: window.location.pathname }),
        });
        if (response.ok) reply = await response.json();
      } catch {
        // La base locale garantit une réponse même lorsque l'API est indisponible.
      }
    }

    setMessages((current) => [
      ...current,
      {
        id: reply.message_id || `assistant-${messageSequence.current}`,
        role: "assistant",
        text: reply.answer,
        actions: reply.actions,
        contact: reply.contact,
        feedback: reply.message_id ? null : undefined,
      },
    ]);
    setTyping(false);
  }

  async function sendFeedback(messageId, helpful) {
    setMessages((current) =>
      current.map((message) => (message.id === messageId ? { ...message, feedback: helpful } : message)),
    );
    if (!API_URL) return;
    try {
      await fetch(`${API_URL}/chatbot/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message_id: messageId, helpful }),
      });
    } catch {
      // Le retour visuel reste enregistré pour la session.
    }
  }

  return (
    <aside className={`dav-assistant${open ? " is-open" : ""}`} aria-label="Assistant virtuel DAV">
      {open && (
        <div className="dav-assistant__panel">
          <header className="dav-assistant__header">
            <div className="dav-assistant__avatar" aria-hidden="true">D</div>
            <div>
              <strong>Assistant DAV</strong>
              <span><i /> En ligne</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer l'assistant">×</button>
          </header>

          <div className="dav-assistant__messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`dav-assistant__message is-${message.role}`} key={message.id}>
                <p>{message.text}</p>
                {message.actions?.map((action) => (
                  <a href={action.href} key={action.href}>{action.label} →</a>
                ))}
                {message.contact && (
                  <button className="dav-assistant__contact" type="button" onClick={onContactClick}>
                    Ouvrir le formulaire de contact
                  </button>
                )}
                {message.feedback === null && (
                  <div className="dav-assistant__feedback">
                    <span>Réponse utile ?</span>
                    <button type="button" onClick={() => sendFeedback(message.id, true)}>Oui</button>
                    <button type="button" onClick={() => sendFeedback(message.id, false)}>Non</button>
                  </div>
                )}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="dav-assistant__suggestions">
                {QUICK_QUESTIONS.map((question) => (
                  <button type="button" key={question} onClick={() => ask(question)}>{question}</button>
                ))}
              </div>
            )}
            {typing && <div className="dav-assistant__typing"><i /><i /><i /></div>}
            <div ref={endRef} />
          </div>

          <form className="dav-assistant__composer" onSubmit={(event) => { event.preventDefault(); ask(input); }}>
            <label className="sr-only" htmlFor="dav-assistant-input">Votre question</label>
            <input
              id="dav-assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Écrivez votre préoccupation…"
              maxLength="800"
            />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Envoyer">→</button>
          </form>
          <p className="dav-assistant__privacy">Vos questions servent à améliorer les réponses de l'assistant.</p>
        </div>
      )}

      <button
        className="dav-assistant__launcher"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Fermer l'assistant DAV" : "Ouvrir l'assistant DAV"}
      >
        {open ? "×" : <><span aria-hidden="true">✦</span><b>Besoin d'aide ?</b></>}
      </button>
    </aside>
  );
}
