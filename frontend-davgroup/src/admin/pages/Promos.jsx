import { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const Promos = () => {
  const { showToast } = useAdmin();

  const [promoBar, setPromoBar] = useState("✦ Livraison offerte à partir de 25 000 FCFA d'achat ✦ Code : DAVBEAUTE");
  const [promos, setPromos]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formCode,  setFormCode]  = useState("");
  const [formType,  setFormType]  = useState("percent");
  const [formValue, setFormValue] = useState("");
  const [formStart, setFormStart] = useState("");
  const [formEnd,   setFormEnd]   = useState("");
  const [formLimit, setFormLimit] = useState("");

  // ── Chargement initial ──
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
    // texte barre (public)
    fetch(`${API}/promos/bar`)
      .then(r => r.json())
      .then(d => { if (d.text) setPromoBar(d.text); })
      .catch(() => {});

    // liste (admin)
    adminApi.getPromos()
      .then(d => setPromos(d?.data || []))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  // ── Sauvegarder la barre ──
  const handleSavePromoBar = async () => {
    try {
      await adminApi.savePromoBar(promoBar);
      showToast("✓ Barre de promo enregistrée");
    } catch {
      showToast("⚠ Erreur lors de l'enregistrement", 3000);
    }
  };

  // ── Ajouter un code ──
  const handleAddPromo = async () => {
    if (!formCode || !formValue || !formStart || !formEnd) {
      showToast("⚠ Remplissez tous les champs obligatoires", 3000);
      return;
    }
    try {
      const data = {
        code: formCode.toUpperCase(),
        discount_type: formType,
        value: parseFloat(formValue),
        start_date: formStart,
        end_date: formEnd,
        is_active: true,
        ...(formLimit ? { usage_limit: parseInt(formLimit) } : {}),
      };
      const res = await adminApi.createPromo(data);
      setPromos(prev => [res.data, ...prev]);
      setFormCode(""); setFormValue(""); setFormStart(""); setFormEnd(""); setFormLimit("");
      showToast("✓ Code promo créé");
    } catch (err) {
      showToast(err?.message || "⚠ Erreur création", 3000);
    }
  };

  // ── Toggle actif/inactif ──
  const handleToggle = async (promo) => {
    try {
      const res = await adminApi.updatePromo(promo.id, { is_active: !promo.is_active });
      setPromos(prev => prev.map(p => p.id === promo.id ? res.data : p));
      showToast("✓ Statut mis à jour");
    } catch {
      showToast("⚠ Erreur", 3000);
    }
  };

  // ── Supprimer ──
  const handleDelete = async (id) => {
    try {
      await adminApi.deletePromo(id);
      setPromos(prev => prev.filter(p => p.id !== id));
      showToast("✓ Code promo supprimé");
    } catch {
      showToast("⚠ Erreur suppression", 3000);
    }
  };

  const activeCount = promos.filter(p => p.is_active).length;

  return (
    <div className="panel active">
      <div className="section-head">
        <div>
          <div className="section-head-title">Promotions &amp; Codes promo</div>
          <div className="section-head-sub">{activeCount} code(s) actif(s)</div>
        </div>
      </div>

      {/* ── Barre de promo ── */}
      <div className="promobar-editor" style={{ marginBottom: "24px" }}>
        <div className="promo-card-title">Barre de promotion (haut du site)</div>
        <div className="admin-field">
          <label className="admin-label">Texte de la barre</label>
          <input
            type="text"
            className="admin-inp"
            value={promoBar}
            onChange={(e) => setPromoBar(e.target.value)}
            placeholder="Entrez le texte de promotion..."
          />
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="action-btn ab-primary" onClick={handleSavePromoBar}>
            💾 Enregistrer
          </button>
          <span style={{ fontSize: "12px", color: "var(--ink-m)" }}>Aperçu :</span>
        </div>
        <div className="promobar-preview">{promoBar}</div>
      </div>

      <div className="promos-layout">

        {/* ── Formulaire ── */}
        <div className="promo-form-card">
          <div className="promo-card-title">Créer un code promo</div>

          <div className="admin-field">
            <label className="admin-label">Code promo *</label>
            <input type="text" className="admin-inp" value={formCode}
              onChange={e => setFormCode(e.target.value)} placeholder="ex: DAVBEAUTE" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="admin-field">
              <label className="admin-label">Type de réduction</label>
              <select className="admin-sel" value={formType} onChange={e => setFormType(e.target.value)}>
                <option value="percent">Pourcentage (%)</option>
                <option value="amount">Montant fixe (FCFA)</option>
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label">Valeur *</label>
              <input type="number" className="admin-inp" value={formValue}
                onChange={e => setFormValue(e.target.value)}
                placeholder={formType === "percent" ? "15" : "5000"} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="admin-field">
              <label className="admin-label">Date début *</label>
              <input type="date" className="admin-inp" value={formStart} onChange={e => setFormStart(e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Date fin *</label>
              <input type="date" className="admin-inp" value={formEnd} onChange={e => setFormEnd(e.target.value)} />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">
              Limite d'utilisation <span style={{ fontWeight: 400, fontSize: "11px", color: "var(--ink-m)" }}>(optionnel)</span>
            </label>
            <input type="number" className="admin-inp" value={formLimit}
              onChange={e => setFormLimit(e.target.value)} placeholder="ex: 100" min="1" />
          </div>

          <button className="action-btn ab-primary" style={{ width: "100%", marginTop: "12px" }} onClick={handleAddPromo}>
            ➕ Ajouter le code
          </button>
        </div>

        {/* ── Liste ── */}
        <div>
          <div className="promo-card-title" style={{ marginBottom: "14px" }}>Codes promo</div>
          <div className="promo-list-card">
            {isLoading ? (
              <div className="empty-row">Chargement…</div>
            ) : promos.length === 0 ? (
              <div className="empty-row">Aucun code promo</div>
            ) : (
              promos.map((p) => {
                const label = p.discount_type === "percent"
                  ? `${p.value}% de réduction`
                  : `${Number(p.value).toLocaleString("fr-FR")} FCFA de réduction`;
                const today = new Date().toISOString().slice(0, 10);
                const expired = p.end_date < today;
                return (
                  <div key={p.id} className={`promo-item ${!p.is_active || expired ? "promo-inactive" : ""}`}>
                    <div className="promo-item-main">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div className="promo-item-code">{p.code}</div>
                        {expired && (
                          <span style={{ fontSize: "10px", background: "rgba(224,48,48,.1)", color: "var(--danger)", padding: "2px 8px", borderRadius: "100px", fontWeight: 600 }}>
                            Expiré
                          </span>
                        )}
                      </div>
                      <div className="promo-item-detail">{label}</div>
                      <div className="promo-item-dates">
                        {fmtDate(p.start_date)} → {fmtDate(p.end_date)}
                        {p.usage_limit && (
                          <span style={{ marginLeft: "8px", color: "var(--ink-m)" }}>
                            · {p.used_count}/{p.usage_limit} utilisations
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        className="action-btn ab-confirm"
                        onClick={() => handleToggle(p)}
                        style={p.is_active
                          ? { background: "rgba(34,197,94,.15)", color: "var(--success)" }
                          : { background: "rgba(255,178,0,.15)", color: "var(--warn)" }}
                      >
                        {p.is_active ? "✓ Actif" : "⊘ Inactif"}
                      </button>
                      <button className="action-btn ab-cancel" onClick={() => handleDelete(p.id)}>🗑</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promos;
