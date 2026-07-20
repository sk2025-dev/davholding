import { useEffect } from "react";

export default function OrderSuccessNotice({ orderNumber, onClose }) {
  useEffect(() => {
    if (!orderNumber) return undefined;
    const timer = window.setTimeout(() => onClose?.(), 7000);
    return () => window.clearTimeout(timer);
  }, [orderNumber, onClose]);

  if (!orderNumber) return null;

  return (
    <div className="beauty-order-notice" role="status" aria-live="polite">
      <span className="beauty-order-notice__icon" aria-hidden="true">✓</span>
      <div>
        <strong>Commande enregistrée</strong>
        <p>
          La commande <b>{orderNumber}</b> a bien été validée. Notre équipe vous contactera pour la confirmation.
        </p>
      </div>
      <button type="button" onClick={onClose} aria-label="Fermer la notification">×</button>
    </div>
  );
}
