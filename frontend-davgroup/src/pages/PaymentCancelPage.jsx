import { useNavigate } from "react-router-dom";
import BeauteLayout from "../components/Beaute/BeauteLayout";

export default function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <BeauteLayout>
      <div className="payment-result">
        <div className="payment-result__icon">😔</div>
        <h1 className="payment-result__title">Paiement annulé</h1>
        <p className="payment-result__sub">
          Votre panier a été conservé. Vous pouvez réessayer quand vous le souhaitez.
        </p>
        <button
          type="button"
          className="payment-result__btn"
          onClick={() => navigate(-1)}
        >
          Retour
        </button>
      </div>
    </BeauteLayout>
  );
}
