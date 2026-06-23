import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BeauteLayout from "../components/Beaute/BeauteLayout";

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = params.get("order");

  useEffect(() => {
    const timer = setTimeout(() => navigate("/beaute/cosmetiques"), 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <BeauteLayout>
      <div className="payment-result">
        <div className="payment-result__icon">🎉</div>
        <h1 className="payment-result__title">Paiement réussi !</h1>
        {orderNumber && (
          <p className="payment-result__order">
            Commande <strong>{orderNumber}</strong> enregistrée.
          </p>
        )}
        <p className="payment-result__sub">
          Vous recevrez une confirmation par email. Redirection dans quelques secondes…
        </p>
        <button
          type="button"
          className="payment-result__btn"
          onClick={() => navigate("/beaute/cosmetiques")}
        >
          Retour à la boutique
        </button>
      </div>
    </BeauteLayout>
  );
}
