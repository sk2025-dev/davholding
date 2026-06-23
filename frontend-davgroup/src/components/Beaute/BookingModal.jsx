import { useEffect, useRef, useState, useCallback } from "react";
import { useClientAuth } from "../../context/ClientAuthContext";
import "../../styles/BookingModal.css";

const API_URL   = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const ALL_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
const SAT_SLOTS = ["09:00", "10:30", "12:00", "14:00"];
const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DAYS_SHORT= ["Lu","Ma","Me","Je","Ve","Sa","Di"];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function MiniCalendar({ value, onChange }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [cal, setCal] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const first  = new Date(cal.year, cal.month, 1);
  const last   = new Date(cal.year, cal.month + 1, 0);
  const blanks = Array(((first.getDay() + 6) % 7)).fill(null);
  const days   = Array.from({ length: last.getDate() }, (_, i) => new Date(cal.year, cal.month, i + 1));
  const isPrevDisabled = new Date(cal.year, cal.month, 1) <= new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="bm-cal">
      <div className="bm-cal-head">
        <button type="button" className="bm-cal-nav" disabled={isPrevDisabled}
          onClick={() => { const d = new Date(cal.year, cal.month - 1, 1); setCal({ year: d.getFullYear(), month: d.getMonth() }); }}>‹</button>
        <span className="bm-cal-label">{MONTHS_FR[cal.month]} {cal.year}</span>
        <button type="button" className="bm-cal-nav"
          onClick={() => { const d = new Date(cal.year, cal.month + 1, 1); setCal({ year: d.getFullYear(), month: d.getMonth() }); }}>›</button>
      </div>
      <div className="bm-cal-days-header">{DAYS_SHORT.map((d) => <span key={d}>{d}</span>)}</div>
      <div className="bm-cal-grid">
        {blanks.map((_, i) => <span key={`b${i}`} />)}
        {days.map((day) => {
          const isSun  = day.getDay() === 0;
          const isPast = day < today;
          const isSel  = value && day.toDateString() === value.toDateString();
          const isToday = day.toDateString() === today.toDateString();
          return (
            <button key={day.getDate()} type="button"
              className={`bm-cal-day${isSel?" selected":""}${isToday?" today":""}${isSun||isPast?" disabled":""}`}
              disabled={isSun || isPast}
              onClick={() => !isSun && !isPast && onChange(day)}
            >{day.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
export default function BookingModal({ isOpen, onClose, preService = null }) {
  const { user, login, register, loginWithGoogle } = useClientAuth();

  /* step : "auth" | "date" | "info" | "confirm" | "paying" */
  const [step, setStep]             = useState(user ? "date" : "auth");
  const [authTab, setAuthTab]       = useState("register");
  const [authError, setAuthError]   = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [loginForm, setLoginForm]   = useState({ email: "", password: "" });
  const [regForm,   setRegForm]     = useState({ name: "", email: "", password: "", confirm: "" });

  const [selectedDate, setSelectedDate]   = useState(null);
  const [selectedSlot, setSelectedSlot]   = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading]   = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", notes: "", nbPersons: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError]   = useState("");

  const overlayRef = useRef(null);

  /* Pré-remplir depuis user */
  useEffect(() => {
    if (user?.name) {
      const parts = user.name.split(" ");
      setForm((p) => ({ ...p, firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" }));
    }
  }, [user]);

  /* Avancer après connexion */
  useEffect(() => {
    if (user && step === "auth") setStep("date");
  }, [user, step]);

  /* Reset à la fermeture */
  useEffect(() => {
    if (!isOpen) {
      setStep(user ? "date" : "auth");
      setSelectedDate(null); setSelectedSlot(""); setBookError(""); setAuthError(""); setAvailableSlots([]);
    }
  }, [isOpen, user]);

  /* Scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Charger créneaux */
  useEffect(() => {
    if (!selectedDate) return;
    setSlotsLoading(true); setSelectedSlot("");
    const dateStr = selectedDate.toISOString().split("T")[0];
    fetch(`${API_URL}/rdv/slots?date=${dateStr}`, { headers: { Accept: "application/json" } })
      .then((r) => r.json())
      .then((d) => setAvailableSlots(d?.data || []))
      .catch(() => {
        const day = selectedDate.getDay();
        setAvailableSlots(day === 0 ? [] : day === 6 ? SAT_SLOTS : ALL_SLOTS);
      })
      .finally(() => setSlotsLoading(false));
  }, [selectedDate]);

  const handleClose = useCallback(() => onClose?.(), [onClose]);

  /* ── Auth ── */
  const handleLogin = async (e) => {
    e.preventDefault(); setAuthError(""); setAuthLoading(true);
    try { await login(loginForm.email, loginForm.password); setStep("date"); }
    catch (err) { setAuthError(err.message || "Email ou mot de passe incorrect."); }
    finally { setAuthLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); setAuthError("");
    if (regForm.password !== regForm.confirm) { setAuthError("Les mots de passe ne correspondent pas."); return; }
    setAuthLoading(true);
    try { await register(regForm.name, regForm.email, regForm.password, regForm.confirm); setStep("date"); }
    catch (err) { setAuthError(err.message || "Erreur lors de la création du compte."); }
    finally { setAuthLoading(false); }
  };

  /* Sélection créneau → avancement auto après 400ms */
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setTimeout(() => setStep("info"), 400);
  };

  /* Validation infos → étape récap */
  const handleInfoNext = () => {
    if (!form.firstName || !form.lastName) return setBookError("Renseignez votre prénom et nom.");
    if (!form.phone) return setBookError("Renseignez votre numéro de téléphone.");
    setBookError("");
    setStep("confirm");
  };

  /* Soumission paiement */
  const handleBook = async () => {
    setBookError(""); setSubmitting(true);
    try {
      const token   = localStorage.getItem("dav_client_token");
      const dateStr = selectedDate.toISOString().split("T")[0];
      const service = preService?.subtitle || preService?.title || "Soin beauté";
      const res = await fetch(`${API_URL}/rdv`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ service, date: dateStr, time: selectedSlot, first_name: form.firstName, last_name: form.lastName, phone: form.phone, email: user?.email, notes: form.notes || null, nb_persons: form.nbPersons, payment_method: "mobile" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur lors de la réservation.");
      setStep("paying");
      setTimeout(() => { window.location.href = data.invoice_url; }, 1500);
    } catch (err) { setBookError(err.message); }
    finally { setSubmitting(false); }
  };

  if (!isOpen) return null;

  const serviceLabel = preService?.subtitle || preService?.title || "Votre soin";
  const dateLabel    = selectedDate
    ? selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    : "";

  /* Indicateur étapes */
  const STEP_LABELS = user
    ? ["Date & Heure", "Informations", "Confirmation"]
    : ["Connexion", "Date & Heure", "Informations", "Confirmation"];
  const stepIdxMap  = user
    ? { date: 0, info: 1, confirm: 2, paying: 2 }
    : { auth: 0, date: 1, info: 2, confirm: 3, paying: 3 };
  const stepIdx = stepIdxMap[step] ?? 0;

  return (
    <div className="bm-overlay" ref={overlayRef} onClick={(e) => e.target === overlayRef.current && handleClose()}>
      <div className="bm-card" role="dialog" aria-modal="true">

        <button className="bm-close" onClick={handleClose} aria-label="Fermer">✕</button>

        {/* Header */}
        <div className="bm-header">
          <div className="bm-header-badge">📅</div>
          <div>
            <h2 className="bm-header-title">Réserver ce soin</h2>
            <p className="bm-header-service">{serviceLabel}</p>
          </div>
        </div>

        {/* Étapes */}
        <div className="bm-steps">
          {STEP_LABELS.map((s, i) => (
            <div key={s} className={`bm-step${i === stepIdx ? " bm-step--active" : i < stepIdx ? " bm-step--done" : ""}`}>
              <div className="bm-step-dot">{i < stepIdx ? "✓" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {/* ══ STEP AUTH ══ */}
        {step === "auth" && (
          <div className="bm-body">
            <p className="bm-auth-intro">Connectez-vous pour réserver et payer l'avance de <strong>5 000 FCFA</strong>.</p>
            <button type="button" className="bm-google-btn" onClick={loginWithGoogle}>
              <GoogleIcon /> Continuer avec Google
            </button>
            <div className="bm-divider"><span>ou</span></div>
            <div className="bm-tabs">
              <button type="button" className={`bm-tab${authTab==="register"?" active":""}`} onClick={() => { setAuthTab("register"); setAuthError(""); }}>Nouveau compte</button>
              <button type="button" className={`bm-tab${authTab==="login"?" active":""}`}    onClick={() => { setAuthTab("login");    setAuthError(""); }}>J'ai déjà un compte</button>
            </div>
            {authError && <div className="bm-error">{authError}</div>}
            {authTab === "login" ? (
              <form className="bm-form" onSubmit={handleLogin}>
                <div className="bm-field"><label>Email</label>
                  <input type="email" required placeholder="aya@email.com" value={loginForm.email} onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))} /></div>
                <div className="bm-field"><label>Mot de passe</label>
                  <input type="password" required placeholder="••••••••" value={loginForm.password} onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))} /></div>
                <button type="submit" className="bm-submit" disabled={authLoading}>{authLoading ? "Connexion…" : "Se connecter →"}</button>
              </form>
            ) : (
              <form className="bm-form" onSubmit={handleRegister}>
                <div className="bm-field"><label>Prénom &amp; Nom</label>
                  <input type="text" required placeholder="Aya Kouassi" value={regForm.name} onChange={(e) => setRegForm((p) => ({ ...p, name: e.target.value }))} /></div>
                <div className="bm-field"><label>Email</label>
                  <input type="email" required placeholder="aya@email.com" value={regForm.email} onChange={(e) => setRegForm((p) => ({ ...p, email: e.target.value }))} /></div>
                <div className="bm-row">
                  <div className="bm-field"><label>Mot de passe</label>
                    <input type="password" required minLength={8} placeholder="8 caractères min." value={regForm.password} onChange={(e) => setRegForm((p) => ({ ...p, password: e.target.value }))} /></div>
                  <div className="bm-field"><label>Confirmer</label>
                    <input type="password" required placeholder="••••••••" value={regForm.confirm} onChange={(e) => setRegForm((p) => ({ ...p, confirm: e.target.value }))} /></div>
                </div>
                <button type="submit" className="bm-submit" disabled={authLoading}>{authLoading ? "Création…" : "Créer mon compte →"}</button>
              </form>
            )}
          </div>
        )}

        {/* ══ STEP DATE & CRÉNEAU ══ */}
        {step === "date" && (
          <div className="bm-body">
            <div className="bm-section-label">Choisissez une date</div>
            <MiniCalendar value={selectedDate} onChange={setSelectedDate} />

            {selectedDate && (
              <>
                <div className="bm-section-label" style={{ marginTop: 18 }}>
                  Créneau — <span style={{ fontWeight: 400, color: "var(--ink-m,#666)", textTransform:"none" }}>{dateLabel}</span>
                </div>
                {slotsLoading ? (
                  <div className="bm-slots-loading">Chargement des créneaux…</div>
                ) : availableSlots.length === 0 ? (
                  <div className="bm-slots-empty">Aucun créneau ce jour. Choisissez une autre date.</div>
                ) : (
                  <div className="bm-slots">
                    {availableSlots.map((s) => (
                      <button key={s} type="button"
                        className={`bm-slot${selectedSlot === s ? " bm-slot--active" : ""}`}
                        onClick={() => handleSlotSelect(s)}
                      >{s}</button>
                    ))}
                  </div>
                )}
              </>
            )}
            {!selectedDate && (
              <p className="bm-note" style={{ marginTop: 12 }}>Sélectionnez une date pour voir les créneaux disponibles.</p>
            )}
          </div>
        )}

        {/* ══ STEP INFO ══ */}
        {step === "info" && (
          <div className="bm-body">
            {/* Résumé date choisie */}
            <div className="bm-date-badge">
              <span>📅</span>
              <span>{dateLabel} · {selectedSlot}</span>
              <button className="bm-date-change" onClick={() => setStep("date")}>Modifier</button>
            </div>

            <div className="bm-section-label" style={{ marginTop: 16 }}>Vos coordonnées</div>
            <div className="bm-form">
              <div className="bm-field">
                <label>Nombre de personnes</label>
                <div className="bm-persons-row">
                  <button type="button" className="bm-persons-btn"
                    onClick={() => setForm((p) => ({ ...p, nbPersons: Math.max(1, p.nbPersons - 1) }))}>−</button>
                  <span className="bm-persons-val">{form.nbPersons} personne{form.nbPersons > 1 ? "s" : ""}</span>
                  <button type="button" className="bm-persons-btn"
                    onClick={() => setForm((p) => ({ ...p, nbPersons: Math.min(10, p.nbPersons + 1) }))}>+</button>
                </div>
              </div>
              <div className="bm-row">
                <div className="bm-field"><label>Prénom</label>
                  <input type="text" placeholder="Aya" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} /></div>
                <div className="bm-field"><label>Nom</label>
                  <input type="text" placeholder="Kouassi" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} /></div>
              </div>
              <div className="bm-field"><label>Téléphone</label>
                <input type="tel" placeholder="07 57 24 93 90" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></div>
              <div className="bm-field">
                <label>Note <span style={{ fontWeight:400, fontSize:"11px", color:"rgba(26,15,10,.45)" }}>(optionnel)</span></label>
                <textarea placeholder="Précisions sur votre soin…" rows={2} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
              </div>
            </div>

            {bookError && <div className="bm-error" style={{ marginTop: 12 }}>{bookError}</div>}

            <button type="button" className="bm-submit bm-submit--big" style={{ marginTop: 20 }} onClick={handleInfoNext}>
              Continuer →
            </button>
          </div>
        )}

        {/* ══ STEP CONFIRM ══ */}
        {step === "confirm" && (
          <div className="bm-body">
            <div className="bm-section-label">Récapitulatif</div>

            <div className="bm-recap">
              <div className="bm-recap-row"><span>Soin</span><strong>{serviceLabel}</strong></div>
              <div className="bm-recap-row"><span>Date</span><strong>{dateLabel}</strong></div>
              <div className="bm-recap-row"><span>Heure</span><strong>{selectedSlot}</strong></div>
              <div className="bm-recap-row"><span>Personnes</span><strong>{form.nbPersons} personne{form.nbPersons > 1 ? "s" : ""}</strong></div>
              <div className="bm-recap-row"><span>Client</span><strong>{form.firstName} {form.lastName}</strong></div>
              <div className="bm-recap-row"><span>Téléphone</span><strong>{form.phone}</strong></div>
              {form.notes && <div className="bm-recap-row"><span>Note</span><strong>{form.notes}</strong></div>}
              <div className="bm-recap-row bm-recap-total"><span>Avance à payer</span><strong>5 000 FCFA</strong></div>
            </div>

            <div className="bm-confirm-actions">
              <button type="button" className="bm-back-btn" onClick={() => setStep("info")}>← Modifier</button>
              <button type="button" className="bm-submit bm-submit--big bm-submit--flex"
                onClick={handleBook} disabled={submitting}>
                {submitting ? "Traitement…" : "💳 Payer l'avance"}
              </button>
            </div>

            {bookError && <div className="bm-error" style={{ marginTop: 12 }}>{bookError}</div>}
            <p className="bm-note">Vous serez redirigé vers notre partenaire de paiement sécurisé.</p>
          </div>
        )}

        {/* ══ STEP PAYING ══ */}
        {step === "paying" && (
          <div className="bm-body bm-paying">
            <div className="bm-paying-spinner" />
            <h3>Redirection vers le paiement…</h3>
            <p>Vous allez être redirigé vers notre plateforme de paiement sécurisé pour régler votre avance de <strong>5 000 FCFA</strong>.</p>
          </div>
        )}

      </div>
    </div>
  );
}
