import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/CookieConsent.css";

const STORAGE_KEY = "dav_cookie_consent";

export default function CookieConsent() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setVisible(!stored);
  }, []);

  if (location.pathname.startsWith("/admin")) return null;
  if (!visible) return null;

  const respond = (choice) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, date: new Date().toISOString() }),
    );
    setVisible(false);
  };

  return (
    <div className="cookie-consent" role="dialog" aria-label="Consentement aux cookies">
      <p className="cookie-consent__text">
        Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience.
        Consultez notre{" "}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>{" "}
        et nos{" "}
        <Link to="/conditions-utilisation">conditions d'utilisation</Link>.
      </p>
      <div className="cookie-consent__actions">
        <button type="button" className="cookie-consent__btn cookie-consent__btn--reject" onClick={() => respond("rejected")}>
          Refuser
        </button>
        <button type="button" className="cookie-consent__btn cookie-consent__btn--accept" onClick={() => respond("accepted")}>
          Accepter
        </button>
      </div>
    </div>
  );
}
