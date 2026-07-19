import { useEffect, useState, useMemo } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const EMPTY_FORM = { code: "", type: "percent", value: "", start: "", end: "", limit: "", description: "", image: null, _imagePreview: null, productIds: [] };
const FIXED_CATS = ["Tous", "Cosmétiques", "Soins Capillaires", "Onglerie", "Spa"];

/* ── Sélecteur de produits ── */
function ProductPicker({ products, selected, onChange, takenIds = [] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = useMemo(() => {
    const fromProducts = [...new Set(products.map(p => p.category).filter(Boolean))];
    const extra = fromProducts.filter(c => !FIXED_CATS.includes(c));
    return [...FIXED_CATS, ...extra];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === "Tous" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, search, activeCategory]);

  const toggle = (id) => {
    onChange(selected.includes(id)
      ? selected.filter(x => x !== id)
      : [...selected, id]
    );
  };

  const toggleAll = () => {
    onChange(selected.length === products.length ? [] : products.map(p => p.id));
  };

  return (
    <div style={{ border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>

      {/* Onglets catégories */}
      <div style={{ display: "flex", gap: 0, overflowX: "auto", borderBottom: "1px solid var(--border)", background: "rgba(10,10,12,.02)", scrollbarWidth: "none" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "7px 14px", border: "none", borderBottom: activeCategory === cat ? "2px solid #c41420" : "2px solid transparent",
              background: "none", fontSize: 11, fontWeight: activeCategory === cat ? 700 : 500,
              color: activeCategory === cat ? "#c41420" : "var(--ink-m)",
              cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif",
              transition: "color .15s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Barre de recherche */}
      <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--border)", background: "rgba(10,10,12,.02)" }}>
        <input
          type="text"
          placeholder="Rechercher un produit…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box", border: "1px solid var(--border)",
            borderRadius: 7, padding: "6px 10px", fontSize: 12,
            fontFamily: "'Inter', sans-serif", outline: "none", background: "#fff",
          }}
        />
      </div>

      {/* Option "Tous les produits" */}
      <div
        onClick={toggleAll}
        style={{
          padding: "9px 12px", display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer", fontSize: 12, fontWeight: 600,
          borderBottom: "1px solid var(--border)",
          background: selected.length === 0 ? "rgba(196,20,32,.05)" : "#fff",
          color: selected.length === 0 ? "var(--red)" : "var(--ink-s)",
        }}
      >
        <span style={{
          width: 16, height: 16, borderRadius: 4, border: `2px solid ${selected.length === 0 ? "var(--red)" : "var(--border)"}`,
          background: selected.length === 0 ? "var(--red)" : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {selected.length === 0 && (
            <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
              <polyline points="1 4 4 7 9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        Tous les produits
        <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-m)" }}>
          {selected.length === 0 ? "Sélectionné" : ""}
        </span>
      </div>

      {/* Liste des produits */}
      <div style={{ maxHeight: 200, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "12px", textAlign: "center", color: "var(--ink-m)", fontSize: 12 }}>
            Aucun produit trouvé
          </div>
        ) : (
          filtered.map(p => {
            const checked = selected.includes(p.id);
            const taken   = takenIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => !taken && toggle(p.id)}
                style={{
                  padding: "8px 12px", display: "flex", alignItems: "center", gap: 10,
                  cursor: taken ? "not-allowed" : "pointer", fontSize: 12,
                  background: taken ? "rgba(10,10,12,.03)" : checked ? "rgba(196,20,32,.04)" : "#fff",
                  borderBottom: "1px solid rgba(10,10,12,.04)",
                  opacity: taken ? 0.6 : 1,
                  transition: "background .15s",
                }}
              >
                <span style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  border: `2px solid ${taken ? "var(--border)" : checked ? "var(--red)" : "var(--border)"}`,
                  background: checked && !taken ? "var(--red)" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {checked && !taken && (
                    <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                      <polyline points="1 4 4 7 9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                {p.image && (
                  <img
                    src={p.image.startsWith("http") ? p.image : `${API.replace("/api", "")}/storage/${p.image}`}
                    alt={p.name}
                    style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                )}
                <span style={{ flex: 1, color: taken ? "var(--ink-m)" : "var(--ink)" }}>{p.name}</span>
                {taken ? (
                  <span style={{ fontSize: 10, background: "rgba(196,20,32,.1)", color: "var(--red)", padding: "2px 7px", borderRadius: 100, fontWeight: 600, whiteSpace: "nowrap" }}>
                    Promo active
                  </span>
                ) : (
                  <span style={{ color: "var(--ink-m)", fontSize: 11 }}>
                    {Number(p.price).toLocaleString("fr-FR")} F
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {selected.length > 0 && (
        <div style={{ padding: "6px 12px", background: "rgba(196,20,32,.04)", borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--red)", fontWeight: 600 }}>
          {selected.length} produit(s) sélectionné(s)
        </div>
      )}
    </div>
  );
}

/* ── Modal formulaire ── */
function PromoFormModal({ products, activePromos, onClose, onCreated, showToast }) {
  /* IDs de produits déjà couverts par une promo active */
  const takenIds = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return activePromos
      .filter(p => p.is_active && p.end_date >= today)
      .flatMap(p => (p.products || []).map(pr => pr.id));
  }, [activePromos]);
  const [form, setForm]     = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm(f => ({ ...f, image: file, _imagePreview: URL.createObjectURL(file) }));
  };

  const handleSubmit = async () => {
    if (!form.code || !form.value || !form.start || !form.end) {
      showToast("⚠ Remplissez tous les champs obligatoires", 3000);
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("code",          form.code.toUpperCase());
      fd.append("discount_type", form.type);
      fd.append("value",         parseFloat(form.value));
      fd.append("start_date",    form.start);
      fd.append("end_date",      form.end);
      fd.append("is_active",     "1");
      if (form.description) fd.append("description", form.description);
      if (form.limit)       fd.append("usage_limit", parseInt(form.limit));
      form.productIds.forEach(id => fd.append("product_ids[]", id));
      if (form.image)       fd.append("image", form.image);

      const res = await adminApi.createPromo(fd);
      onCreated(res.data);
      showToast("✓ Code promo créé");
      onClose();
    } catch (err) {
      showToast(err?.message || "⚠ Erreur création", 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-head">
          <div className="modal-head-title">Nouveau code promo</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          <div className="admin-field">
            <label className="admin-label">Code promo *</label>
            <input
              type="text" className="admin-inp"
              value={form.code}
              onChange={e => set("code", e.target.value.toUpperCase())}
              placeholder="ex: DAVBEAUTE"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">
              Image de la promo
              <span style={{ fontWeight: 400, fontSize: 11, color: "var(--ink-m)", marginLeft: 6 }}>
                — visible sur le site dans "Offres du moment"
              </span>
            </label>
            <input type="file" className="admin-inp" accept="image/*" onChange={handleImage} />
            {form._imagePreview && (
              <img
                src={form._imagePreview}
                alt="Aperçu"
                style={{ marginTop: 8, width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }}
              />
            )}
          </div>

          <div className="admin-field">
            <label className="admin-label">
              Description <span style={{ fontWeight: 400, fontSize: 11, color: "var(--ink-m)" }}>(optionnel)</span>
            </label>
            <input
              type="text" className="admin-inp"
              value={form.description}
              onChange={e => set("description", e.target.value)}
              placeholder="ex: -20% sur tous les soins capillaires"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="admin-field">
              <label className="admin-label">Type de réduction</label>
              <select className="admin-sel" value={form.type} onChange={e => set("type", e.target.value)}>
                <option value="percent">Pourcentage (%)</option>
                <option value="amount">Montant fixe (FCFA)</option>
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label">Valeur *</label>
              <input
                type="number" className="admin-inp"
                value={form.value}
                onChange={e => set("value", e.target.value)}
                placeholder={form.type === "percent" ? "15" : "5000"}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="admin-field">
              <label className="admin-label">Date début *</label>
              <input type="date" className="admin-inp" value={form.start} onChange={e => set("start", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Date fin *</label>
              <input type="date" className="admin-inp" value={form.end} onChange={e => set("end", e.target.value)} />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">
              Limite d'utilisation <span style={{ fontWeight: 400, fontSize: 11, color: "var(--ink-m)" }}>(optionnel)</span>
            </label>
            <input
              type="number" className="admin-inp"
              value={form.limit}
              onChange={e => set("limit", e.target.value)}
              placeholder="ex: 100" min="1"
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" style={{ marginBottom: 8, display: "block" }}>
              Produits concernés
              <span style={{ fontWeight: 400, fontSize: 11, color: "var(--ink-m)", marginLeft: 6 }}>
                — laissez "Tous" pour une promo globale
              </span>
            </label>
            <ProductPicker
              products={products}
              selected={form.productIds}
              onChange={v => set("productIds", v)}
              takenIds={takenIds}
            />
          </div>

          <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
            <button
              className="action-btn ab-primary"
              style={{ flex: 1 }}
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? "Enregistrement…" : "Créer le code"}
            </button>
            <button className="action-btn ab-view" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
const Promos = () => {
  const { showToast } = useAdmin();

  const [promoBar, setPromoBar] = useState("✦ Livraison offerte à partir de 25 000 FCFA d'achat ✦ Code : DAVBEAUTE");
  const [promos, setPromos]     = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`${API}/promos/bar`)
      .then(r => r.json())
      .then(d => { if (d.text) setPromoBar(d.text); })
      .catch(() => {});

    adminApi.getPromos()
      .then(d => setPromos(d?.data || []))
      .catch(() => {})
      .finally(() => setIsLoading(false));

    fetch(`${API}/products`)
      .then(r => r.json())
      .then(d => setProducts(d?.data || d || []))
      .catch(() => {});
  }, []);

  const handleSavePromoBar = async () => {
    try {
      await adminApi.savePromoBar(promoBar);
      showToast("✓ Barre de promo enregistrée");
    } catch {
      showToast("⚠ Erreur lors de l'enregistrement", 3000);
    }
  };

  const handleToggle = async (promo) => {
    try {
      const res = await adminApi.updatePromo(promo.id, { is_active: !promo.is_active });
      setPromos(prev => prev.map(p => p.id === promo.id ? res.data : p));
      showToast("✓ Statut mis à jour");
    } catch {
      showToast("⚠ Erreur", 3000);
    }
  };

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
        <button className="action-btn ab-primary" onClick={() => setShowForm(true)} style={{ padding: "8px 20px", fontSize: 13 }}>
          + Nouveau code
        </button>
      </div>

      {/* Barre de promo */}
      <div className="promobar-editor" style={{ marginBottom: 24 }}>
        <div className="promo-card-title">Barre de promotion (haut du site)</div>
        <div className="admin-field">
          <label className="admin-label">Texte de la barre</label>
          <input
            type="text" className="admin-inp"
            value={promoBar}
            onChange={e => setPromoBar(e.target.value)}
            placeholder="Entrez le texte de promotion..."
          />
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="action-btn ab-primary" onClick={handleSavePromoBar}>Enregistrer</button>
          <span style={{ fontSize: 12, color: "var(--ink-m)" }}>Aperçu :</span>
        </div>
        <div className="promobar-preview">{promoBar}</div>
      </div>

      {/* Liste codes */}
      <div className="promo-card-title" style={{ marginBottom: 14 }}>Codes promo</div>
      <div className="promo-list-card">
        {isLoading ? (
          <div className="empty-row">Chargement…</div>
        ) : promos.length === 0 ? (
          <div className="empty-row">Aucun code promo — cliquez sur « + Nouveau code » pour en créer un</div>
        ) : (
          promos.map(p => {
            const today         = new Date().toISOString().slice(0, 10);
            const expired       = p.end_date < today;
            const inactive      = !p.is_active || expired;
            const promoProducts = p.products || [];
            const discountLabel = p.discount_type === "percent"
              ? `-${parseFloat(p.value)}%`
              : `-${Number(p.value).toLocaleString("fr-FR")} F`;

            return (
              <div key={p.id} style={{
                display: "flex", alignItems: "stretch",
                borderBottom: "1px solid var(--border)",
                opacity: inactive ? 0.6 : 1,
                transition: "opacity .2s",
              }}>
                {/* Bloc réduction à gauche */}
                <div style={{
                  width: 90, flexShrink: 0,
                  background: inactive
                    ? "rgba(10,10,12,.04)"
                    : "linear-gradient(160deg, #c41420, #7a0b12)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: "18px 8px", gap: 2,
                }}>
                  <div style={{
                    fontSize: p.discount_type === "percent" ? 22 : 16,
                    fontWeight: 800,
                    color: inactive ? "var(--ink-m)" : "#fff",
                    fontFamily: "'Fraunces', serif",
                    lineHeight: 1,
                    textAlign: "center",
                  }}>
                    {discountLabel}
                  </div>
                  <div style={{ fontSize: 9, color: inactive ? "var(--ink-m)" : "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                    réduction
                  </div>
                </div>

                {/* Séparateur pointillé */}
                <div style={{
                  width: 1,
                  background: "repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 6px, transparent 6px, transparent 12px)",
                  flexShrink: 0, margin: "10px 0",
                }} />

                {/* Contenu principal */}
                <div style={{ flex: 1, padding: "16px 20px", display: "flex", gap: 16, alignItems: "center", minWidth: 0 }}>

                  {/* Code + infos */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 15, fontWeight: 700,
                        color: "var(--ink)",
                        background: "var(--bg)",
                        padding: "3px 12px", borderRadius: 8,
                        border: "1px solid var(--border)",
                        letterSpacing: ".04em",
                      }}>
                        {p.code}
                      </span>

                      {expired ? (
                        <span style={{ fontSize: 10, background: "rgba(224,48,48,.1)", color: "#c41420", padding: "3px 10px", borderRadius: 100, fontWeight: 700 }}>
                          Expiré
                        </span>
                      ) : p.is_active ? (
                        <span style={{ fontSize: 10, background: "rgba(34,197,94,.12)", color: "#1a7a3e", padding: "3px 10px", borderRadius: 100, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a7a3e", display: "inline-block" }} />
                          Actif
                        </span>
                      ) : (
                        <span style={{ fontSize: 10, background: "rgba(180,83,9,.1)", color: "#b45309", padding: "3px 10px", borderRadius: 100, fontWeight: 700 }}>
                          Inactif
                        </span>
                      )}

                      {promoProducts.length > 0 ? (
                        <span style={{ fontSize: 10, background: "rgba(26,74,204,.08)", color: "#1a4acc", padding: "3px 10px", borderRadius: 100, fontWeight: 600 }}>
                          {promoProducts.length} produit(s)
                        </span>
                      ) : (
                        <span style={{ fontSize: 10, background: "rgba(10,10,12,.06)", color: "var(--ink-m)", padding: "3px 10px", borderRadius: 100, fontWeight: 600 }}>
                          Tous les produits
                        </span>
                      )}
                    </div>

                    {/* Dates */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-m)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {fmtDate(p.start_date)} → {fmtDate(p.end_date)}
                      {p.usage_limit && (
                        <span style={{ marginLeft: 6, padding: "1px 8px", borderRadius: 100, background: "rgba(10,10,12,.05)", fontSize: 11 }}>
                          {p.used_count}/{p.usage_limit} utilisations
                        </span>
                      )}
                    </div>

                    {/* Produits ciblés */}
                    {promoProducts.length > 0 && (
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
                        {promoProducts.slice(0, 5).map(pr => (
                          <span key={pr.id} style={{ fontSize: 10, background: "rgba(10,10,12,.05)", padding: "2px 8px", borderRadius: 100, color: "var(--ink-s)", border: "1px solid var(--border)" }}>
                            {pr.name}
                          </span>
                        ))}
                        {promoProducts.length > 5 && (
                          <span style={{ fontSize: 10, color: "var(--ink-m)", padding: "2px 6px" }}>+{promoProducts.length - 5} autres</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0, alignItems: "flex-end" }}>
                    <button
                      onClick={() => handleToggle(p)}
                      style={{
                        padding: "6px 16px", borderRadius: 8, border: "none",
                        fontSize: 12, fontWeight: 600, cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        background: p.is_active ? "rgba(34,197,94,.12)" : "rgba(10,10,12,.07)",
                        color: p.is_active ? "#1a7a3e" : "var(--ink-m)",
                        transition: "all .2s",
                      }}
                    >
                      {p.is_active ? "✓ Activer" : "⊘ Désactiver"}
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{
                        padding: "6px 14px", borderRadius: 8,
                        border: "1px solid rgba(224,48,48,.2)",
                        background: "rgba(224,48,48,.05)",
                        fontSize: 12, fontWeight: 600, cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        color: "#c41420", display: "flex", alignItems: "center", gap: 5,
                        transition: "all .2s",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showForm && (
        <PromoFormModal
          products={products}
          activePromos={promos}
          onClose={() => setShowForm(false)}
          onCreated={newPromo => setPromos(prev => [newPromo, ...prev])}
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default Promos;
