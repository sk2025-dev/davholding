import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../styles/BeauteRdv.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

/* ── Opérateurs Mobile Money ── */
const OPERATORS = [
  { id: "wave-ci",         label: "Wave",         color: "#1B74E4", logo: "🌊" },
  { id: "orange-money-ci", label: "Orange Money", color: "#FF6900", logo: "🟠" },
  { id: "mtn-ci",          label: "MTN Money",    color: "#FFCC00", logo: "💛" },
  { id: "moov-ci",         label: "Moov Money",   color: "#004B9B", logo: "🔵" },
];

/* ── Helpers carte ── */
const fmtCard   = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})(?=.)/g, "$1 ");
const fmtExpiry = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

const serviceTabs = {
  coiffure: { label: "Coiffure & Tressage", icon: "✂️" },
  ongerie:  { label: "Ongerie",             icon: "💅" },
  spa:      { label: "Spa & Soins",         icon: "🧖" },
  conseil:  { label: "Conseil beauté",      icon: "✨" },
};

const fallbackServices = {
  coiffure: [
    { id: 1, title: "Micro-twist",         duration: "11H30", price: "35 000 FCFA", image: "/images/debut.webp" },
    { id: 2, title: "Tresse enfant",        duration: "3H",    price: "25 000 FCFA", image: "/images/mamouch.webp" },
    { id: 3, title: "Coloration naturelle", duration: "2H30",  price: "42 000 FCFA", image: "/images/elegant.jpg" },
  ],
  ongerie: [
    { id: 1, title: "Pose gel simple",    duration: "1H30", price: "24 000 FCFA", image: "/images/designmarron.jpg" },
    { id: 2, title: "Nail art complet",   duration: "2H",   price: "30 000 FCFA", image: "/images/ongletflachir.jpg" },
    { id: 3, title: "Manucure classique", duration: "1H",   price: "18 000 FCFA", image: "/images/elegant.jpg" },
  ],
  spa: [
    { id: 1, title: "Massage relaxant", duration: "1H30", price: "38 000 FCFA", image: "/images/spa4.jpeg" },
    { id: 2, title: "Soin du visage",   duration: "1H",   price: "29 000 FCFA", image: "/images/spa2.jpeg" },
    { id: 3, title: "Gommage complet",  duration: "1H30", price: "34 000 FCFA", image: "/images/spa7.jpeg" },
  ],
  conseil: [
    { id: 1, title: "Conseil beauté",               duration: "1H",   price: "20 000 FCFA", image: "/images/mere.webp" },
    { id: 2, title: "Conseil entretien capillaire", duration: "45mn", price: "12 000 FCFA", image: "/images/afro.webp" },
  ],
};

const fallbackImagesByTitle = Object.values(fallbackServices).flat()
  .reduce((acc, item) => { acc[item.title] = item.image; return acc; }, {});


function BeauteRdvSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const didPreselect = useRef(false);

  /* ── Succès paiement avance ── */
  const [rdvSuccess, setRdvSuccess] = useState(false);
  const [rdvDetails, setRdvDetails] = useState(null);

  const [activeService, setActiveService]     = useState("ongerie");
  const [serviceGroups, setServiceGroups]     = useState(fallbackServices);
  const [currentStep, setCurrentStep]         = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate]       = useState(null);
  const [selectedSlot, setSelectedSlot]       = useState("");
  const [formValues, setFormValues] = useState({ firstName: "", lastName: "", phone: "", email: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]           = useState(null);

  /* ── Paiement avance ── */
  const [payChannel, setPayChannel]         = useState("");
  const [mobileOperator, setMobileOperator] = useState("");
  const [cardForm, setCardForm]             = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [rdvWaiting, setRdvWaiting]         = useState(false);
  const [calMonth, setCalMonth]             = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });

  /* ── Créneaux (chargés depuis l'API) ── */
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots]       = useState([]);
  const [slotsLoading, setSlotsLoading]     = useState(false);

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res  = await fetch(`${API_URL}/beauty-services?section_key=rendezvous`, { headers: { Accept: "application/json" } });
        const data = await res.json();
        const items = data?.data || [];
        if (!mounted || items.length === 0) return;
        const grouped = { coiffure: [], ongerie: [], spa: [], conseil: [] };
        items.forEach((item) => {
          const key = item.category_key || "coiffure";
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push({
            id: item.id, title: item.title, duration: item.duration || "—",
            price: item.price || "—",
            image: item.image_url || fallbackImagesByTitle[item.title] || fallbackServices[key]?.[0]?.image || "/images/logo.png",
          });
        });
        // Pour chaque catégorie vide dans l'API, on garde le fallback
        Object.keys(fallbackServices).forEach((key) => {
          if (!grouped[key] || grouped[key].length === 0) {
            grouped[key] = fallbackServices[key];
          }
        });
        setServiceGroups(grouped);
      } catch { /* keep fallback */ }
    };
    load();
    return () => { mounted = false; };
  }, []);

  /* Détection succès paiement avance (?rdv=succes&id=X) */
  useEffect(() => {
    if (searchParams.get("rdv") !== "succes") return;
    setRdvSuccess(true);
    const rdvId = searchParams.get("id");
    if (!rdvId) return;
    const token = localStorage.getItem("dav_client_token");
    fetch(`${API_URL}/rdv/booking/${rdvId}`, {
      headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
      .then((r) => r.json())
      .then((d) => { if (d?.data) setRdvDetails(d.data); })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const closeRdvSuccess = () => {
    setRdvSuccess(false);
    setRdvDetails(null);
    setSearchParams({});
  };

  /* Pré-sélection depuis les params URL (?service=...&category=...) */
  useEffect(() => {
    if (didPreselect.current) return;
    const serviceParam  = searchParams.get("service");
    const categoryParam = searchParams.get("category");
    if (!serviceParam) return;

    const category = categoryParam && serviceGroups[categoryParam] ? categoryParam : null;
    const groups   = category ? { [category]: serviceGroups[category] } : serviceGroups;

    let found = null;
    for (const [key, items] of Object.entries(groups)) {
      const match = items.find(
        (i) => i.title.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        found = { item: match, key };
        break;
      }
    }
    /* Correspondance partielle si aucun match exact */
    if (!found) {
      for (const [key, items] of Object.entries(groups)) {
        const match = items.find(
          (i) =>
            i.title.toLowerCase().includes(serviceParam.toLowerCase()) ||
            serviceParam.toLowerCase().includes(i.title.toLowerCase())
        );
        if (match) { found = { item: match, key }; break; }
      }
    }

    if (found) {
      didPreselect.current = true;
      setActiveService(found.key);
      setSelectedService(found.item);
      setCurrentStep(2);
      /* Scrolle vers la section RDV si on arrive depuis les réalisations */
      setTimeout(() => {
        document.getElementById("rendezvous")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [serviceGroups, searchParams]);

  const monthLabel = useMemo(() =>
    new Date(calMonth.year, calMonth.month, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    [calMonth]);

  const daysOfMonth = useMemo(() => {
    const { year: y, month: m } = calMonth;
    const first = new Date(y, m, 1), last = new Date(y, m + 1, 0);
    const blanks = Array(((first.getDay() + 6) % 7)).fill(null);
    const days = Array.from({ length: last.getDate() }, (_, i) => new Date(y, m, i + 1));
    return [...blanks, ...days];
  }, [calMonth]);

  const goToPrevMonth = () => {
    const d = new Date(calMonth.year, calMonth.month - 1, 1);
    const todayFirst = new Date(today.getFullYear(), today.getMonth(), 1);
    if (d >= todayFirst) setCalMonth({ year: d.getFullYear(), month: d.getMonth() });
  };

  const goToNextMonth = () => {
    const d = new Date(calMonth.year, calMonth.month + 1, 1);
    setCalMonth({ year: d.getFullYear(), month: d.getMonth() });
  };

  const isPrevDisabled = useMemo(() => {
    const todayFirst = new Date(today.getFullYear(), today.getMonth(), 1);
    return new Date(calMonth.year, calMonth.month, 1) <= todayFirst;
  }, [calMonth, today]);

  /* Charge les créneaux disponibles depuis l'API dès qu'une date est sélectionnée */
  useEffect(() => {
    if (!selectedDate || selectedDate.getDay() === 0) {
      setAvailableSlots([]);
      setBookedSlots([]);
      return;
    }
    const dateStr = selectedDate.toISOString().split("T")[0];
    setSlotsLoading(true);
    fetch(`${API_URL}/rdv/slots?date=${dateStr}`, { headers: { Accept: "application/json" } })
      .then((r) => r.json())
      .then((d) => {
        setAvailableSlots(d.data   || []);
        setBookedSlots(d.booked    || []);
      })
      .catch(() => {
        /* fallback local si l'API échoue */
        const all = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
        setAvailableSlots(selectedDate.getDay() === 6 ? all.slice(0, 4) : all);
        setBookedSlots([]);
      })
      .finally(() => setSlotsLoading(false));
  }, [selectedDate]);

  const selectedDateLabel = useMemo(() => {
    if (!selectedDate) return "Aucune date sélectionnée";
    return selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  }, [selectedDate]);

  const isBeforeToday = (day) => {
    if (!day) return false;
    const n = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return n < t;
  };

  const onChooseService = (item) => { setSelectedService(item); setSelectedDate(null); setSelectedSlot(""); setCurrentStep(2); };
  const handleInputChange = (key, val) => setFormValues((p) => ({ ...p, [key]: val }));
  const handleConfirm = async () => {
    if (!formValues.firstName || !formValues.lastName || !formValues.phone) {
      showToast("Merci de remplir votre prénom, nom et téléphone.");
      return;
    }
    if (!formValues.email) {
      showToast("Merci de renseigner votre email pour recevoir la confirmation.");
      return;
    }
    if (!selectedDate || !selectedSlot) {
      showToast("Merci de choisir une date et un créneau.");
      return;
    }
    if (!payChannel) {
      showToast("Merci de choisir un moyen de paiement pour l'avance.");
      return;
    }
    if (payChannel === "mobile" && !mobileOperator) {
      showToast("Merci de choisir votre opérateur Mobile Money.");
      return;
    }
    if (payChannel === "card") {
      if (cardForm.number.replace(/\s/g, "").length < 13) { showToast("Numéro de carte invalide."); return; }
      if (cardForm.expiry.length < 5) { showToast("Date d'expiration invalide (MM/AA)."); return; }
      if (cardForm.cvv.length < 3)    { showToast("CVV invalide."); return; }
      if (!cardForm.name.trim())      { showToast("Merci de renseigner le nom sur la carte."); return; }
    }

    setSubmitting(true);
    try {
      const token   = localStorage.getItem("dav_client_token");
      const dateStr = selectedDate.toISOString().split("T")[0];

      const res = await fetch(`${API_URL}/rdv`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          service:         selectedService.title,
          category:        activeService,
          date:            dateStr,
          time:            selectedSlot,
          first_name:      formValues.firstName,
          last_name:       formValues.lastName,
          phone:           formValues.phone,
          email:           formValues.email,
          notes:           formValues.notes || null,
          advance_channel: payChannel,
          network:         payChannel === "mobile" ? mobileOperator : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur lors de la réservation.");

      if (data.mode === "softpay") {
        /* SoftPay réussi — afficher l'écran d'attente */
        setRdvWaiting(true);
      } else {
        /* Redirection PayDunya (carte ou fallback mobile) */
        window.location.href = data.invoice_url;
      }
    } catch (err) {
      showToast(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const STEPS = [
    { n: 1, label: "Votre soin" },
    { n: 2, label: "Date & Heure" },
    { n: 3, label: "Confirmation" },
  ];

  return (
    <>
      <section className="beauty-rdv-section">
      <div className="rdv-section">

        {/* Hero */}
        <div className="rdv-section-hero">
          <div className="rdv-hero-label">Salon Dav'Beauté</div>
          <h1 className="rdv-hero-title">
            Réservez votre <em>rendez-vous</em>
          </h1>
          <p className="rdv-hero-sub">
            Choisissez votre soin, votre créneau et confirmez en quelques secondes.<br />
            Notre équipe vous accueille à Cocody Angré, 8è tranche.
          </p>
        </div>

        {/* Steps bar */}
        <div className="rdv-steps-bar">
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
              <div
                className={`rdv-step ${currentStep === s.n ? "rdv-active" : ""} ${currentStep > s.n ? "rdv-done" : ""}`}
                onClick={() => currentStep > s.n && setCurrentStep(s.n)}
                style={{ cursor: currentStep > s.n ? "pointer" : "default" }}
              >
                <div className="rdv-step-dot">
                  {currentStep > s.n ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : s.n}
                </div>
                <span>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`rdv-step-connector ${currentStep > s.n ? "done" : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* ÉTAPE 1 — Choisir un soin */}
        <div className={`rdv-panel ${currentStep === 1 ? "rdv-active" : ""}`}>
          <div className="rdv-cats">
            {Object.entries(serviceTabs).map(([key, svc]) => (
              <button
                key={key}
                className={`rdv-cat-btn ${activeService === key ? "rdv-cat-active" : ""}`}
                onClick={() => { setActiveService(key); setSelectedService(null); }}
              >
                <span>{svc.icon}</span>
                <span>{svc.label}</span>
              </button>
            ))}
          </div>

          <div className="rdv-services-grid">
            {(serviceGroups[activeService] || []).map((item) => {
              const isSel = selectedService?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`rdv-service-card ${isSel ? "rdv-svc-selected" : ""}`}
                  onClick={() => onChooseService(item)}
                >
                  <div className="rdv-svc-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div className="rdv-svc-img">
                    <img src={item.image} alt={item.title} onError={(e) => { e.target.style.display = "none"; }} />
                  </div>

                  <div className="rdv-svc-body">
                    <div className="rdv-svc-name">{item.title}</div>
                    <div className="rdv-svc-badges">
                      <span className="rdv-badge rdv-badge-dur">⏱ {item.duration}</span>
                    </div>
                    <div className="rdv-svc-footer">
                      <div className="rdv-svc-price">{item.price}</div>
                      <button
                        className="rdv-choose-btn"
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onChooseService(item); }}
                      >
                        {isSel ? "Sélectionné" : "Choisir"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rdv-nav-row" style={{ justifyContent: "flex-end" }}>
            <button className="rdv-btn-main" type="button" disabled={!selectedService} onClick={() => setCurrentStep(2)}>
              Choisir une date →
            </button>
          </div>
        </div>

        {/* ÉTAPE 2 — Date & Heure */}
        <div className={`rdv-panel ${currentStep === 2 ? "rdv-active" : ""}`}>
          <div className="rdv-selected-recap">
            <div className="rdv-recap-img">
              <img src={selectedService?.image || "/images/spa4.jpeg"} alt={selectedService?.title || ""} />
            </div>
            <div>
              <div className="rdv-recap-name">{selectedService?.title || "—"}</div>
              <div className="rdv-recap-meta">Durée : {selectedService?.duration || "—"} · {selectedService?.price || "—"}</div>
            </div>
            <button className="rdv-recap-change" type="button" onClick={() => setCurrentStep(1)}>Changer ›</button>
          </div>

          <div className="rdv-step2-layout">
            {/* Calendrier */}
            <div className="rdv-cal-box">
              <div className="rdv-cal-header">
                <button
                  className="rdv-cal-nav"
                  type="button"
                  onClick={goToPrevMonth}
                  disabled={isPrevDisabled}
                  style={{ opacity: isPrevDisabled ? 0.3 : 1, cursor: isPrevDisabled ? "not-allowed" : "pointer" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <div className="rdv-cal-month">{monthLabel}</div>
                <button className="rdv-cal-nav" type="button" onClick={goToNextMonth}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
              <div className="rdv-cal-grid">
                <div className="rdv-day-names">
                  {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map((d) => (
                    <div key={d} className="rdv-day-name">{d}</div>
                  ))}
                </div>
                <div className="rdv-days">
                  {daysOfMonth.map((day, i) => {
                    if (!day) return <div key={`b${i}`} className="rdv-day rdv-day-empty" />;
                    const isToday  = day.toDateString() === today.toDateString();
                    const isSel    = selectedDate && day.toDateString() === selectedDate.toDateString();
                    const isPast   = isBeforeToday(day);
                    const isClosed = day.getDay() === 0;
                    const isAvail  = !isPast && !isClosed;
                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        className={[
                          "rdv-day",
                          isToday  ? "rdv-day-today"    : "",
                          isSel    ? "rdv-day-selected" : "",
                          isPast   ? "rdv-day-past"     : "",
                          isClosed ? "rdv-day-closed"   : "",
                          isAvail  ? "rdv-day-available": "",
                        ].join(" ")}
                        disabled={isPast || isClosed}
                        onClick={() => { setSelectedDate(day); setSelectedSlot(""); }}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Créneaux */}
            <div className="rdv-slots-box">
              <div className="rdv-slots-title">
                {selectedDate
                  ? selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
                  : "Choisissez d'abord une date"}
              </div>
              {!selectedDate ? (
                <div className="rdv-slots-empty">← Sélectionnez une date dans le calendrier</div>
              ) : slotsLoading ? (
                <div className="rdv-slots-empty" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "16px", height: "16px", border: "2px solid rgba(196,20,32,.2)", borderTopColor: "#c41420", borderRadius: "50%", animation: "rdvs-spin .7s linear infinite" }} />
                  Chargement des créneaux…
                </div>
              ) : selectedDate.getDay() === 0 ? (
                <div className="rdv-slots-empty">Fermé le dimanche — choisissez un autre jour.</div>
              ) : availableSlots.length === 0 && bookedSlots.length === 0 ? (
                <div className="rdv-slots-empty">Aucun créneau pour ce jour.</div>
              ) : (
                <div className="rdv-slots-grid">
                  {/* Créneaux disponibles */}
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`rdv-slot ${selectedSlot === slot ? "rdv-slot-sel" : ""}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                  {/* Créneaux déjà réservés — affichés grisés */}
                  {bookedSlots.map((slot) => (
                    <button
                      key={`booked-${slot}`}
                      type="button"
                      className="rdv-slot rdv-slot-booked"
                      disabled
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
              <div className="rdv-slots-legend">
                <div className="rdv-legend-item">
                  <span className="rdv-legend-dot" style={{ background: "var(--red, #c41420)" }} />
                  Sélectionné
                </div>
                <div className="rdv-legend-item">
                  <span className="rdv-legend-dot" style={{ background: "var(--cream, #faf6f0)", border: "1.5px solid rgba(201,160,96,.3)" }} />
                  Disponible
                </div>
                <div className="rdv-legend-item">
                  <span className="rdv-legend-dot" style={{ background: "rgba(26,15,10,.08)", border: "1.5px solid rgba(26,15,10,.08)" }} />
                  Déjà réservé
                </div>
              </div>
            </div>
          </div>

          <div className="rdv-nav-row">
            <button className="rdv-btn-back" type="button" onClick={() => setCurrentStep(1)}>← Retour</button>
            <button className="rdv-btn-main" type="button" disabled={!selectedSlot} onClick={() => setCurrentStep(3)}>
              Continuer →
            </button>
          </div>
        </div>

        {/* ÉTAPE 3 — Confirmation */}
        <div className={`rdv-panel ${currentStep === 3 ? "rdv-active" : ""}`}>
          <div className="rdv-step3-layout">
            {/* Carte récap */}
            <div className="rdv-booking-card">
              <div className="rdv-bcard-label">Votre rendez-vous</div>
              <div className="rdv-bcard-img">
                <img src={selectedService?.image || "/images/spa4.jpeg"} alt={selectedService?.title || ""} />
              </div>
              <div className="rdv-bcard-name">{selectedService?.title || "—"}</div>
              <div className="rdv-bcard-detail">
                <span className="rdv-bcard-icon">📅</span>
                <span><strong>{selectedDateLabel}</strong></span>
              </div>
              <div className="rdv-bcard-detail">
                <span className="rdv-bcard-icon">🕐</span>
                <span><strong>{selectedSlot || "—"}</strong></span>
              </div>
              <div className="rdv-bcard-detail">
                <span className="rdv-bcard-icon">⏱</span>
                <span>Durée : <strong>{selectedService?.duration || "—"}</strong></span>
              </div>
              <div className="rdv-bcard-detail">
                <span className="rdv-bcard-icon">📍</span>
                <span>Cocody Angré, 8e tranche</span>
              </div>
              <div className="rdv-bcard-detail" style={{ marginTop: 4 }}>
                <span className="rdv-bcard-icon">🏷️</span>
                <span>Avance : <strong>5 000 FCFA</strong></span>
              </div>
              <div className="rdv-bcard-price">
                {selectedService?.price || "—"}
                <span> / séance</span>
              </div>
              <div className="rdv-bcard-note">
                Les frais d'avance (5 000 FCFA) sont déduits du prix final de votre soin.
              </div>
            </div>

            {/* Formulaire */}
            <div className="rdv-form-box">
              <div className="rdv-form-title">Vos coordonnées</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-lbl">Prénom</label>
                  <input type="text" className="form-inp" value={formValues.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} placeholder="Aya" />
                </div>
                <div className="form-group">
                  <label className="form-lbl">Nom</label>
                  <input type="text" className="form-inp" value={formValues.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} placeholder="Kouassi" />
                </div>
              </div>
              <div className="form-row solo">
                <div className="form-group">
                  <label className="form-lbl">Téléphone</label>
                  <input
                    type="tel"
                    className="form-inp"
                    value={formValues.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      handleInputChange("phone", digits);
                    }}
                    placeholder="0757249390"
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="form-row solo">
                <div className="form-group">
                  <label className="form-lbl">Email <span style={{color:"#c41420"}}>*</span> <span style={{fontWeight:400,opacity:.6}}>(pour recevoir votre confirmation)</span></label>
                  <input type="email" className="form-inp" value={formValues.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="aya@email.com" />
                </div>
              </div>
              <div className="form-row solo">
                <div className="form-group">
                  <label className="form-lbl">Notes / Demandes particulières</label>
                  <textarea className="form-inp rdv-note-input" value={formValues.notes} onChange={(e) => handleInputChange("notes", e.target.value)} placeholder="Ex : allergie à certains produits, longueur souhaitée..." />
                </div>
              </div>

              {/* ── Paiement avance 5 000 FCFA ── */}
              <div className="rdv-avance-box">
                <div className="rdv-avance-banner">
                  <div>
                    <div className="rdv-avance-title">Avance obligatoire</div>
                    <div className="rdv-avance-amount">5 000 FCFA</div>
                  </div>
                  <div className="rdv-avance-icon">🔒</div>
                </div>
                <div className="rdv-avance-info">
                  Déduite de votre prestation finale. Requise avant validation du créneau.
                </div>

                {/* Sélecteur canal */}
                <div className="rdv-pay-channel-label">Moyen de paiement *</div>
                <div className="rdv-pay-channel-grid">
                  <button type="button"
                    className={`rdv-pay-channel-card${payChannel === "mobile" ? " rdv-pay-channel-card--active" : ""}`}
                    onClick={() => { setPayChannel("mobile"); setMobileOperator(""); }}
                  >
                    <span className="rdv-pay-channel-icon">📱</span>
                    <strong>Mobile Money</strong>
                    <span>Orange · MTN · Wave · Moov</span>
                  </button>
                  <button type="button"
                    className={`rdv-pay-channel-card${payChannel === "card" ? " rdv-pay-channel-card--active" : ""}`}
                    onClick={() => { setPayChannel("card"); setMobileOperator(""); }}
                  >
                    <span className="rdv-pay-channel-icon">💳</span>
                    <strong>Carte bancaire</strong>
                    <span>Visa · Mastercard</span>
                  </button>
                </div>

                {/* ── Mobile Money : opérateur + téléphone ── */}
                {payChannel === "mobile" && (
                  <div className="rdv-pay-sub">
                    <div className="rdv-pay-op-label">Votre opérateur *</div>
                    <div className="rdv-pay-op-grid">
                      {OPERATORS.map((op) => (
                        <button key={op.id} type="button"
                          className={`rdv-pay-op-card${mobileOperator === op.id ? " rdv-pay-op-card--active" : ""}`}
                          style={{ "--op-color": op.color }}
                          onClick={() => setMobileOperator(op.id)}
                        >
                          <span>{op.logo}</span>
                          <span>{op.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="rdv-pay-field">
                      <label>Numéro {mobileOperator ? OPERATORS.find((o) => o.id === mobileOperator)?.label : "Mobile Money"} *</label>
                      <input type="tel" value={formValues.phone}
                        onChange={(e) => setFormValues((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+225 07 XX XX XX XX" />
                    </div>
                  </div>
                )}

                {/* ── Carte bancaire ── */}
                {payChannel === "card" && (
                  <div className="rdv-pay-sub">
                    {/* Visuel carte */}
                    <div className="rdv-card-preview">
                      <div className="rdv-card-chip">▣</div>
                      <div className="rdv-card-num">{cardForm.number || "•••• •••• •••• ••••"}</div>
                      <div className="rdv-card-bottom">
                        <span>{cardForm.name || "NOM PRÉNOM"}</span>
                        <span>{cardForm.expiry || "MM/AA"}</span>
                      </div>
                    </div>

                    <div className="rdv-pay-field">
                      <label>Numéro de carte *</label>
                      <input type="text" inputMode="numeric" value={cardForm.number}
                        onChange={(e) => setCardForm((f) => ({ ...f, number: fmtCard(e.target.value) }))}
                        placeholder="1234 5678 9012 3456" maxLength={19}
                        style={{ fontFamily: "monospace", letterSpacing: ".08em" }} />
                    </div>
                    <div className="rdv-pay-row">
                      <div className="rdv-pay-field">
                        <label>Expiration *</label>
                        <input type="text" inputMode="numeric" value={cardForm.expiry}
                          onChange={(e) => setCardForm((f) => ({ ...f, expiry: fmtExpiry(e.target.value) }))}
                          placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div className="rdv-pay-field">
                        <label>CVV *</label>
                        <input type="text" inputMode="numeric" value={cardForm.cvv}
                          onChange={(e) => setCardForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                          placeholder="123" maxLength={4} />
                      </div>
                    </div>
                    <div className="rdv-pay-field">
                      <label>Nom sur la carte *</label>
                      <input type="text" value={cardForm.name}
                        onChange={(e) => setCardForm((f) => ({ ...f, name: e.target.value.toUpperCase() }))}
                        placeholder="NOM PRÉNOM" style={{ textTransform: "uppercase" }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="rdv-nav-row">
                <button className="rdv-btn-back" type="button" onClick={() => setCurrentStep(2)}>← Retour</button>
                <button className="rdv-btn-main" type="button" onClick={handleConfirm}
                  disabled={submitting || !payChannel || (payChannel === "mobile" && !mobileOperator)}
                >
                  {submitting
                    ? (payChannel === "mobile" ? "Envoi en cours…" : "Redirection…")
                    : payChannel === "mobile"
                      ? `📱 Payer 5 000 FCFA`
                      : payChannel === "card"
                        ? `💳 Payer 5 000 FCFA`
                        : "Payer 5 000 FCFA & confirmer"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      </section>

      {toast && (
        <div className={`rdv-toast rdv-toast--${toast.type}`} role="alert">
          <span className="rdv-toast-icon">{toast.type === "error" ? "⚠️" : "✅"}</span>
          {toast.msg}
        </div>
      )}

      {/* ════════ OVERLAY ATTENTE SOFTPAY ════════ */}
      {rdvWaiting && (
        <>
          <div className="rdvs-overlay" />
          <div className="rdvs-modal" role="dialog" aria-modal="true">
            <div className="rdvs-icon-wrap">
              <div style={{ fontSize: "56px", animation: "rdvs-pulse 1.5s ease-in-out infinite" }}>📱</div>
            </div>
            <h2 className="rdvs-title">En attente de confirmation</h2>
            <p className="rdvs-subtitle">
              Une demande de paiement a été envoyée sur votre téléphone.<br />
              <strong>
                Vérifiez votre téléphone et validez la demande{" "}
                {mobileOperator ? OPERATORS.find((o) => o.id === mobileOperator)?.label : "Mobile Money"}.
              </strong>
            </p>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
              <div style={{
                width: "48px", height: "48px",
                border: "3px solid rgba(196,20,32,.15)",
                borderTopColor: "#c41420",
                borderRadius: "50%",
                animation: "rdvs-spin 0.8s linear infinite",
              }} />
            </div>
            <div className="rdvs-steps" style={{ marginBottom: "20px" }}>
              <div className="rdvs-step-item"><span className="rdvs-step-dot" /><span>Ouvrez l'application de votre opérateur</span></div>
              <div className="rdvs-step-item"><span className="rdvs-step-dot" /><span>Validez la demande de paiement de 5 000 FCFA</span></div>
              <div className="rdvs-step-item"><span className="rdvs-step-dot" /><span>Votre RDV sera confirmé automatiquement</span></div>
            </div>
          </div>
        </>
      )}

      {/* ════════ MODALE SUCCÈS PAIEMENT AVANCE ════════ */}
      {rdvSuccess && (
        <>
          <div className="rdvs-overlay" onClick={closeRdvSuccess} />
          <div className="rdvs-modal" role="dialog" aria-modal="true">

            {/* Icône animée */}
            <div className="rdvs-icon-wrap">
              <svg className="rdvs-check-svg" viewBox="0 0 52 52" fill="none">
                <circle className="rdvs-check-circle" cx="26" cy="26" r="25" stroke="#22c55e" strokeWidth="2" fill="none" />
                <polyline className="rdvs-check-tick" points="14,27 22,35 38,18" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            <h2 className="rdvs-title">Rendez-vous confirmé !</h2>
            <p className="rdvs-subtitle">
              Votre avance de <strong>5 000 FCFA</strong> a bien été reçue.<br />
              Un email de confirmation vous a été envoyé.
            </p>

            {/* Récap / reçu */}
            <div className="rdvs-recap">
              {rdvDetails ? (
                <>
                  <div className="rdvs-recap-row">
                    <span>💆 Soin</span>
                    <strong>{rdvDetails.service}</strong>
                  </div>
                  {rdvDetails.appointment_date && (
                    <div className="rdvs-recap-row">
                      <span>📅 Date</span>
                      <strong>
                        {new Date(rdvDetails.appointment_date).toLocaleDateString("fr-FR", {
                          weekday: "long", day: "numeric", month: "long", year: "numeric",
                        })}
                      </strong>
                    </div>
                  )}
                  {rdvDetails.appointment_date && (
                    <div className="rdvs-recap-row">
                      <span>🕐 Heure</span>
                      <strong>
                        {typeof rdvDetails.appointment_date === "string"
                          ? rdvDetails.appointment_date.slice(11, 16)
                          : new Date(rdvDetails.appointment_date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </strong>
                    </div>
                  )}
                  <div className="rdvs-recap-row">
                    <span>📍 Lieu</span>
                    <strong>Cocody Angré, 8e tranche</strong>
                  </div>
                  {rdvDetails.id && (
                    <div className="rdvs-recap-row">
                      <span>🔖 Référence</span>
                      <strong style={{ fontFamily: "monospace", letterSpacing: ".04em" }}>
                        #RDV-{String(rdvDetails.id).padStart(5, "0")}
                      </strong>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="rdvs-recap-row">
                    <span>📍 Lieu</span>
                    <strong>Cocody Angré, 8e tranche</strong>
                  </div>
                </>
              )}
              <div className="rdvs-recap-row rdvs-recap-paid">
                <span>✅ Avance payée</span>
                <strong>5 000 FCFA</strong>
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="rdvs-steps">
              <div className="rdvs-step-item">
                <span className="rdvs-step-dot" />
                <span>Votre créneau est réservé et confirmé</span>
              </div>
              <div className="rdvs-step-item">
                <span className="rdvs-step-dot" />
                <span>Un email de confirmation avec votre reçu vous a été envoyé</span>
              </div>
              <div className="rdvs-step-item">
                <span className="rdvs-step-dot" />
                <span>Présentez-vous au salon le jour J — l'avance est déduite</span>
              </div>
            </div>

            <button
              type="button"
              className="rdvs-btn"
              onClick={closeRdvSuccess}
            >
              Parfait, merci !
            </button>
            <p className="rdvs-note">
              Des questions ? Appelez-nous au <strong>+225 07 57 24 93 90</strong>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default BeauteRdvSection;
