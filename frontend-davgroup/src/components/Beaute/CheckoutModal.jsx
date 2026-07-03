import { useState, useEffect } from "react";
import { useClientAuth } from "../../context/ClientAuthContext";
import "../../styles/CheckoutModal.css";

const API_URL   = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const STORAGE_KEY = "dav_client_token";

const STEP = { CHOICE: "choice", DELIVERY: "delivery", ONLINE_FORM: "online_form", PAYING: "paying", SUCCESS: "success" };

/* ── Tarifs livraison par commune ── */
const DELIVERY_FEES = {
  "Plateau":        1000,
  "Treichville":    1000,
  "Marcory":        1500,
  "Koumassi":       2000,
  "Port-Bouët":     2000,
  "Cocody":         2000,
  "Adjamé":         2000,
  "Attécoubé":      2500,
  "Deux-Plateaux":  2500,
  "Riviera":        2500,
  "Yopougon":       2000,
  "Abobo":          2000,
  "Anyama":         2000,
  "Bingerville":    2500,
  "Songon":         2500,
  "Grand-Bassam":   3000,
  "Autre":          3500,
};

const COMMUNES = Object.keys(DELIVERY_FEES);

/* ── Opérateurs Mobile Money ── */
const OPERATORS = [
  { id: "wave-ci",         label: "Wave",         color: "#1B74E4", logo: "/images/wave.jpg"  },
  { id: "orange-money-ci", label: "Orange Money", color: "#FF6900", logo: "/images/om.jpg"    },
  { id: "mtn-ci",          label: "MTN Money",    color: "#FFCC00", logo: "/images/mtn.png"   },
  { id: "moov-ci",         label: "Moov Money",   color: "#004B9B", logo: "/images/moov.jpg"  },
];

/* ── Helpers carte ── */
const formatCardNumber = (v) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})(?=.)/g, "$1 ");

const formatExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
};

/* ── Icônes ── */
function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12l7 7M5 12l7-7" />
    </svg>
  );
}

/* ── Récap total ── */
function TotalBreakdown({ cartTotal, deliveryFee, commune }) {
  const total = cartTotal + (deliveryFee || 0);
  return (
    <div className="co-breakdown">
      <div className="co-breakdown-row">
        <span>Produits</span>
        <span>{cartTotal.toLocaleString("fr-FR")} FCFA</span>
      </div>
      {commune ? (
        <div className="co-breakdown-row co-breakdown-delivery">
          <span>Livraison ({commune})</span>
          <span>+ {deliveryFee.toLocaleString("fr-FR")} FCFA</span>
        </div>
      ) : (
        <div className="co-breakdown-row co-breakdown-hint">
          <span>Livraison</span>
          <span>— choisir commune</span>
        </div>
      )}
      <div className="co-breakdown-total">
        <span>Total</span>
        <strong>{total.toLocaleString("fr-FR")} FCFA</strong>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function CheckoutModal({ isOpen, onClose, cartItems, cartTotal, onSuccess, onAddToCart }) {
  const { user } = useClientAuth();

  const [step, setStep]               = useState(STEP.CHOICE);
  const [commune, setCommune]         = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [form, setForm]               = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [coSuggestions, setCoSuggestions] = useState([]);

  /* Paiement en ligne */
  const [payChannel, setPayChannel]         = useState(""); // "mobile" | "card"
  const [mobileOperator, setMobileOperator] = useState("");
  const [cardForm, setCardForm]             = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [payingMode, setPayingMode]         = useState(""); // "mobile" | "card"

  /* Snapshot totaux pour écran succès */
  const [snapshot, setSnapshot] = useState({ products: 0, delivery: 0, commune: "" });

  useEffect(() => {
    if (isOpen) {
      setStep(STEP.CHOICE);
      setCommune("");
      setDeliveryFee(0);
      setPayChannel("");
      setMobileOperator("");
      setCardForm({ number: "", expiry: "", cvv: "", name: "" });
      setPayingMode("");
      setForm({ name: user?.name || "", phone: "", address: "" });
      setError("");
      setOrderNumber("");
      setLoading(false);
    }
  }, [isOpen, user]);

  useEffect(() => {
    setDeliveryFee(commune ? (DELIVERY_FEES[commune] ?? 3500) : 0);
  }, [commune]);

  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_URL}/products`, { headers: { Accept: "application/json" } })
      .then((r) => r.json())
      .then((d) => setCoSuggestions((d?.data || []).filter((p) => p.quantity > 0)))
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const token      = localStorage.getItem(STORAGE_KEY);
  const firstName  = user?.name?.split(" ")[0] || "vous";
  const grandTotal = cartTotal + deliveryFee;

  /* ── Livraison ── */
  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/orders/delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items:            cartItems,
          client_name:      form.name.trim(),
          client_phone:     form.phone.trim(),
          shipping_address: `${form.address.trim()}, ${commune}`,
          commune,
          delivery_fee:     deliveryFee,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur lors de l'enregistrement.");
      setOrderNumber(data.order_number);
      setSnapshot({ products: cartTotal, delivery: deliveryFee, commune });
      setStep(STEP.SUCCESS);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ── Mobile Money (SoftPay) ── */
  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (!mobileOperator) { setError("Veuillez choisir votre opérateur mobile."); return; }
    if (!form.phone.trim()) { setError("Veuillez renseigner votre numéro de téléphone."); return; }
    if (!form.name.trim()) { setError("Veuillez renseigner votre nom complet."); return; }
    setPayingMode("mobile");
    setStep(STEP.PAYING);
    setError("");
    try {
      const res = await fetch(`${API_URL}/payment/mobile-initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items:            cartItems,
          commune,
          delivery_fee:     deliveryFee,
          client_name:      form.name.trim(),
          client_phone:     form.phone.trim(),
          shipping_address: form.address.trim() ? `${form.address.trim()}, ${commune}` : commune,
          network:          mobileOperator,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur lors de l'initiation du paiement.");
      /* Si SoftPay indisponible (sandbox), PayDunya renvoie une invoice_url de fallback */
      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        setOrderNumber(data.order_number || "");
        /* Mode SoftPay : le client reçoit un push sur son téléphone */
      }
    } catch (err) {
      setError(err.message);
      setStep(STEP.ONLINE_FORM);
      setPayingMode("");
    }
  };

  /* ── Carte bancaire (redirection PayDunya card page) ── */
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    const cleanNumber = cardForm.number.replace(/\s/g, "");
    if (cleanNumber.length < 13) { setError("Numéro de carte invalide."); return; }
    if (!cardForm.expiry || cardForm.expiry.length < 5) { setError("Date d'expiration invalide (MM/AA)."); return; }
    if (!cardForm.cvv || cardForm.cvv.length < 3) { setError("CVV invalide."); return; }
    if (!cardForm.name.trim()) { setError("Veuillez renseigner le nom sur la carte."); return; }
    if (!form.phone.trim()) { setError("Veuillez renseigner votre téléphone."); return; }
    setPayingMode("card");
    setStep(STEP.PAYING);
    setError("");
    try {
      const res = await fetch(`${API_URL}/payment/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items:            cartItems,
          commune,
          delivery_fee:     deliveryFee,
          client_name:      cardForm.name.trim(),
          client_phone:     form.phone.trim(),
          shipping_address: form.address.trim() ? `${form.address.trim()}, ${commune}` : commune,
          payment_channel:  "card",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur lors de la création du paiement.");
      window.location.href = data.invoice_url;
    } catch (err) {
      setError(err.message);
      setStep(STEP.ONLINE_FORM);
      setPayingMode("");
    }
  };

  const goBack = () => {
    setError("");
    setPayChannel("");
    setMobileOperator("");
    setCardForm({ number: "", expiry: "", cvv: "", name: "" });
    setStep(STEP.CHOICE);
  };

  return (
    <>
      <div
        className="checkout-overlay"
        onClick={[STEP.SUCCESS, STEP.PAYING].includes(step) ? undefined : onClose}
      />
      <div className="checkout-modal" role="dialog" aria-modal="true">

        {/* Fermer */}
        {![STEP.SUCCESS, STEP.PAYING].includes(step) && (
          <button className="checkout-close" type="button" onClick={onClose} aria-label="Fermer">✕</button>
        )}

        {/* Retour */}
        {[STEP.DELIVERY, STEP.ONLINE_FORM].includes(step) && (
          <button type="button" className="checkout-back" onClick={goBack}>
            <BackArrow /><span>Retour</span>
          </button>
        )}

        {/* ════════ ÉTAPE 1 : CHOIX ════════ */}
        {step === STEP.CHOICE && (
          <>
            <div className="checkout-icon">🛍️</div>
            <h2 className="checkout-title">Finaliser ma commande</h2>
            <p className="checkout-subtitle">Bonjour {firstName}, choisissez votre commune de livraison.</p>

            <div className="co-commune-wrap">
              <label className="co-commune-label">📍 Commune de livraison</label>
              <select
                className="co-commune-select"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
              >
                <option value="">— Sélectionner votre commune —</option>
                {COMMUNES.map((c) => (
                  <option key={c} value={c}>
                    {c} — {DELIVERY_FEES[c].toLocaleString("fr-FR")} FCFA
                  </option>
                ))}
              </select>
            </div>

            <TotalBreakdown cartTotal={cartTotal} deliveryFee={deliveryFee} commune={commune} />

            {(() => {
              const visible = coSuggestions
                .filter((s) => !cartItems.find((c) => c.title === s.name))
                .slice(0, 3);
              return visible.length > 0 ? (
                <div className="co-suggestions">
                  <p className="co-sug-title">✨ Vous aimerez aussi</p>
                  {visible.map((s) => (
                    <div key={s.id} className="co-sug-item">
                      <img
                        className="co-sug-img"
                        src={s.image || "/images/placeholder.png"}
                        alt={s.name}
                      />
                      <div className="co-sug-info">
                        <span className="co-sug-name">{s.name}</span>
                        <strong className="co-sug-price">
                          {Number(s.price).toLocaleString("fr-FR")} FCFA
                        </strong>
                      </div>
                      <button
                        type="button"
                        className="co-sug-btn"
                        onClick={() =>
                          onAddToCart?.({
                            title: s.name,
                            price: `${Number(s.price).toLocaleString("fr-FR")} FCFA`,
                          }, 1)
                        }
                      >
                        + Ajouter
                      </button>
                    </div>
                  ))}
                </div>
              ) : null;
            })()}

            {error && <p className="checkout-error">{error}</p>}

            <div className="checkout-method-grid">
              <button
                type="button"
                className={`checkout-method-card${!commune ? " checkout-method-card--disabled" : ""}`}
                disabled={!commune}
                onClick={() => commune && setStep(STEP.DELIVERY)}
              >
                <span className="checkout-method-icon"><TruckIcon /></span>
                <strong>Livraison</strong>
                <span>Payer à la réception</span>
              </button>

              <button
                type="button"
                className={`checkout-method-card checkout-method-card--online${!commune ? " checkout-method-card--disabled" : ""}`}
                disabled={!commune}
                onClick={() => commune && setStep(STEP.ONLINE_FORM)}
              >
                <span className="checkout-method-icon"><CardIcon /></span>
                <strong>Payer en ligne</strong>
                <span>Mobile Money · Carte</span>
              </button>
            </div>

            <p className="checkout-note">Paiement sécurisé · PayDunya</p>
          </>
        )}

        {/* ════════ ÉTAPE 2a : FORMULAIRE LIVRAISON ════════ */}
        {step === STEP.DELIVERY && (
          <>
            <h2 className="checkout-title" style={{ marginTop: "44px" }}>Adresse de livraison</h2>
            <p className="checkout-subtitle">Renseignez vos coordonnées.</p>

            <TotalBreakdown cartTotal={cartTotal} deliveryFee={deliveryFee} commune={commune} />

            {error && <p className="checkout-error">{error}</p>}

            <form className="checkout-form" onSubmit={handleDeliverySubmit} noValidate>
              <div className="checkout-field">
                <label>Commune</label>
                <input type="text" value={commune} readOnly className="co-readonly" />
              </div>
              <div className="checkout-field">
                <label htmlFor="co-name">Nom complet *</label>
                <input id="co-name" type="text" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Votre nom complet" autoComplete="name" />
              </div>
              <div className="checkout-field">
                <label htmlFor="co-phone">Téléphone *</label>
                <input id="co-phone" type="tel" value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+225 07 XX XX XX XX" autoComplete="tel" />
              </div>
              <div className="checkout-field">
                <label htmlFor="co-address">Adresse précise *</label>
                <input id="co-address" type="text" value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Quartier, rue, point de repère…" />
              </div>

              <button type="submit" className="checkout-btn checkout-btn--pay" disabled={loading}>
                {loading ? "Enregistrement…" : `Confirmer — ${grandTotal.toLocaleString("fr-FR")} FCFA`}
              </button>
            </form>
          </>
        )}

        {/* ════════ ÉTAPE 2b : PAIEMENT EN LIGNE ════════ */}
        {step === STEP.ONLINE_FORM && (
          <>
            <h2 className="checkout-title" style={{ marginTop: "44px" }}>Paiement en ligne</h2>
            <p className="checkout-subtitle">Choisissez votre moyen de paiement.</p>

            <TotalBreakdown cartTotal={cartTotal} deliveryFee={deliveryFee} commune={commune} />

            {error && <p className="checkout-error">{error}</p>}

            {/* ── Sélecteur canal ── */}
            <div className="co-channel-label">Moyen de paiement *</div>
            <div className="co-channel-grid">
              <button
                type="button"
                className={`co-channel-card${payChannel === "mobile" ? " co-channel-card--active" : ""}`}
                onClick={() => { setPayChannel("mobile"); setMobileOperator(""); }}
              >
                <span className="co-channel-icon">📱</span>
                <strong>Mobile Money</strong>
                <span>Orange · MTN · Wave · Moov</span>
              </button>
              <button
                type="button"
                className={`co-channel-card${payChannel === "card" ? " co-channel-card--active" : ""}`}
                onClick={() => { setPayChannel("card"); setMobileOperator(""); }}
              >
                <span className="co-channel-icon">💳</span>
                <strong>Carte bancaire</strong>
                <span>Visa · Mastercard</span>
              </button>
            </div>

            {/* ──────── FORMULAIRE MOBILE MONEY ──────── */}
            {payChannel === "mobile" && (
              <form className="checkout-form" onSubmit={handleMobileSubmit} noValidate>
                <div className="co-operator-label">Votre opérateur *</div>
                <div className="co-operator-grid">
                  {OPERATORS.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      className={`co-operator-card${mobileOperator === op.id ? " co-operator-card--active" : ""}`}
                      style={{ "--op-color": op.color }}
                      onClick={() => setMobileOperator(op.id)}
                    >
                      <img className="co-operator-logo" src={op.logo} alt={op.label} />
                      <span className="co-operator-name">{op.label}</span>
                    </button>
                  ))}
                </div>

                <div className="checkout-field">
                  <label htmlFor="co-mob-phone">
                    Numéro {mobileOperator ? OPERATORS.find((o) => o.id === mobileOperator)?.label : "Mobile Money"} *
                  </label>
                  <input
                    id="co-mob-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+225 07 XX XX XX XX"
                    autoComplete="tel"
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="co-mob-name">Nom complet *</label>
                  <input
                    id="co-mob-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Votre nom complet"
                    autoComplete="name"
                  />
                </div>

                <button
                  type="submit"
                  className="checkout-btn checkout-btn--pay"
                  disabled={loading || !mobileOperator}
                >
                  {loading ? "Envoi en cours…" : `📱 Payer ${grandTotal.toLocaleString("fr-FR")} FCFA`}
                </button>
                <p className="checkout-note">
                  Vous recevrez une demande de confirmation sur votre téléphone.
                </p>
              </form>
            )}

            {/* ──────── FORMULAIRE CARTE BANCAIRE ──────── */}
            {payChannel === "card" && (
              <form className="checkout-form" onSubmit={handleCardSubmit} noValidate>

                {/* Visuel carte */}
                <div className="co-card-preview">
                  <div className="co-card-chip">▣</div>
                  <div className="co-card-num">
                    {cardForm.number || "•••• •••• •••• ••••"}
                  </div>
                  <div className="co-card-bottom">
                    <span>{cardForm.name || "NOM PRÉNOM"}</span>
                    <span>{cardForm.expiry || "MM/AA"}</span>
                  </div>
                </div>

                <div className="checkout-field">
                  <label htmlFor="co-card-num">Numéro de carte *</label>
                  <input
                    id="co-card-num"
                    type="text"
                    inputMode="numeric"
                    value={cardForm.number}
                    onChange={(e) => setCardForm((f) => ({ ...f, number: formatCardNumber(e.target.value) }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="co-card-number-input"
                    autoComplete="cc-number"
                  />
                </div>

                <div className="co-card-row">
                  <div className="checkout-field">
                    <label htmlFor="co-card-exp">Expiration *</label>
                    <input
                      id="co-card-exp"
                      type="text"
                      inputMode="numeric"
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                      placeholder="MM/AA"
                      maxLength={5}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="co-card-cvv">CVV *</label>
                    <input
                      id="co-card-cvv"
                      type="text"
                      inputMode="numeric"
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                      placeholder="123"
                      maxLength={4}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>

                <div className="checkout-field">
                  <label htmlFor="co-card-name">Nom sur la carte *</label>
                  <input
                    id="co-card-name"
                    type="text"
                    value={cardForm.name}
                    onChange={(e) => setCardForm((f) => ({ ...f, name: e.target.value.toUpperCase() }))}
                    placeholder="NOM PRÉNOM"
                    autoComplete="cc-name"
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="co-card-phone">Téléphone *</label>
                  <input
                    id="co-card-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+225 07 XX XX XX XX"
                    autoComplete="tel"
                  />
                </div>

                <button
                  type="submit"
                  className="checkout-btn checkout-btn--pay"
                  disabled={loading}
                >
                  {loading ? "Traitement…" : `💳 Payer ${grandTotal.toLocaleString("fr-FR")} FCFA`}
                </button>
                <p className="checkout-note">🔒 Paiement sécurisé — PayDunya (Visa · Mastercard)</p>
              </form>
            )}
          </>
        )}

        {/* ════════ ÉTAPE 3 : ATTENTE PAIEMENT ════════ */}
        {step === STEP.PAYING && (
          <div className="checkout-online-loading">
            <div className="checkout-spinner" />
            {payingMode === "mobile" ? (
              <>
                <p>En attente de votre confirmation…</p>
                <span>
                  Vérifiez votre téléphone et validez la demande de paiement{" "}
                  {mobileOperator ? OPERATORS.find((o) => o.id === mobileOperator)?.label : ""}.
                </span>
              </>
            ) : (
              <>
                <p>Redirection vers le paiement sécurisé…</p>
                <span>Ne fermez pas cette fenêtre.</span>
              </>
            )}
          </div>
        )}

        {/* ════════ ÉTAPE 4 : SUCCÈS ════════ */}
        {step === STEP.SUCCESS && (
          <div className="checkout-success">
            <div className="checkout-success-icon">✅</div>
            <h2 className="checkout-title">Commande confirmée !</h2>
            <p className="checkout-subtitle">
              Votre commande <strong>{orderNumber}</strong> a bien été enregistrée.
            </p>
            <div className="co-breakdown" style={{ marginBottom: "20px" }}>
              <div className="co-breakdown-row">
                <span>Produits</span>
                <span>{snapshot.products.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="co-breakdown-row co-breakdown-delivery">
                <span>Livraison ({snapshot.commune})</span>
                <span>{snapshot.delivery.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="co-breakdown-total">
                <span>Total à payer à la livraison</span>
                <strong>{(snapshot.products + snapshot.delivery).toLocaleString("fr-FR")} FCFA</strong>
              </div>
            </div>
            <p className="checkout-note" style={{ marginTop: 0, marginBottom: "24px" }}>
              Nous vous contacterons au <strong>{form.phone}</strong> pour confirmer.
            </p>
            <button type="button" className="checkout-btn checkout-btn--pay" onClick={onClose}>
              Parfait, merci !
            </button>
          </div>
        )}

      </div>
    </>
  );
}
