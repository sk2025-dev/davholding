import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const SECTIONS = [
  { value: "coiffures",  label: "Page Coiffures",  emoji: "✂️" },
  { value: "ongerie",    label: "Page Onglerie",   emoji: "💅" },
  { value: "spa",        label: "Page Spa",         emoji: "🌿" },
  { value: "rendezvous", label: "Services RDV",     emoji: "📅" },
];

const initialForm = {
  section_key:  "coiffures",
  category_key: "twist",
  title:        "",
  subtitle:     "",
  duration:     "",
  price:        "",
  sort_order:   "0",
  image:        null,
};

/* ── Carte visuel ── */
const BeautyCard = ({ item, onToggle, onDelete, onEdit }) => {
  const sec = SECTIONS.find((s) => s.value === item.section_key);
  return (
    <div style={{
      background: "#fff", borderRadius: "16px", overflow: "hidden",
      border: "1px solid rgba(10,10,12,.08)",
      boxShadow: item.is_active ? "0 2px 12px rgba(0,0,0,.05)" : "0 2px 8px rgba(0,0,0,.03)",
      opacity: item.is_active ? 1 : 0.65,
      transition: "transform .2s, box-shadow .2s, opacity .2s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = item.is_active ? "0 2px 12px rgba(0,0,0,.05)" : "0 2px 8px rgba(0,0,0,.03)"; }}
    >
      <div style={{ position: "relative", height: "200px", background: "var(--gold-pale)", overflow: "hidden" }}>
        <img src={item.image_url || "/images/placeholder.png"} alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.style.display = "none"; }} />
        <span style={{
          position: "absolute", top: "10px", left: "10px",
          background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)",
          color: "#fff", fontSize: "10px", fontWeight: "600", padding: "3px 10px", borderRadius: "100px",
        }}>
          {sec?.emoji} {sec?.label || item.section_key}
        </span>
        {!item.is_active && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(10,10,12,.45)",
            display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)",
          }}>
            <span style={{ color: "#fff", fontWeight: "700", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase" }}>Masquée</span>
          </div>
        )}
      </div>

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <div style={{ fontWeight: "600", fontSize: "13px", color: "var(--ink)", lineHeight: 1.3 }}>{item.title}</div>
          {item.section_key === "coiffures" && (
            <div style={{ marginTop: "4px" }}>
              <span style={{
                fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "100px",
                background: item.category_key === "twist" ? "rgba(59,130,246,.1)" :
                            item.category_key === "natte" ? "rgba(134,60,168,.1)" :
                            item.category_key === "autre" ? "rgba(46,170,94,.1)" : "rgba(224,48,48,.12)",
                color:      item.category_key === "twist" ? "#1d4ed8" :
                            item.category_key === "natte" ? "#7e22ce" :
                            item.category_key === "autre" ? "#1a7a3e" : "#c41420",
              }}>
                {item.category_key === "twist" ? "✂️ Twist" :
                 item.category_key === "natte" ? "🪢 Natte" :
                 item.category_key === "autre" ? "🌟 Autre" : `⚠️ "${item.category_key}" — à corriger`}
              </span>
            </div>
          )}
          {item.duration && <div style={{ fontSize: "11px", color: "var(--ink-m)", marginTop: "2px" }}>⏱ {item.duration}</div>}
          {item.price    && <div style={{ fontSize: "11px", color: "var(--red)", fontWeight: "600", marginTop: "2px" }}>{item.price}</div>}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => onToggle(item)} style={{
            flex: 1, padding: "6px 0", borderRadius: "8px", border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontWeight: "600", fontSize: "11.5px",
            background: item.is_active ? "rgba(46,170,94,.12)" : "rgba(224,144,32,.12)",
            color: item.is_active ? "#1a7a3e" : "#b07010", transition: "all .2s",
          }}>{item.is_active ? "✓ Visible" : "⊘ Masquée"}</button>
          <button onClick={() => onEdit(item)} style={{
            padding: "6px 12px", borderRadius: "8px", border: "1.5px solid rgba(59,130,246,.25)",
            background: "rgba(59,130,246,.07)", fontSize: "13px", cursor: "pointer", color: "#1d4ed8", transition: "all .2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1d4ed8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,.07)"; e.currentTarget.style.color = "#1d4ed8"; e.currentTarget.style.borderColor = "rgba(59,130,246,.25)"; }}
          >✏️</button>
          <button onClick={() => onDelete(item.id)} style={{
            padding: "6px 12px", borderRadius: "8px", border: "1.5px solid rgba(224,48,48,.2)",
            background: "rgba(224,48,48,.06)", fontSize: "13px", cursor: "pointer", color: "var(--danger)", transition: "all .2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--danger)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(224,48,48,.06)"; e.currentTarget.style.color = "var(--danger)"; }}
          >🗑</button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════ */
const BeautyServices = () => {
  const { showToast } = useAdmin();
  const [items, setItems]               = useState([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [filterSection, setFilterSection] = useState("all");
  const [search, setSearch]             = useState("");
  const [addOpen, setAddOpen]           = useState(false);
  const [editItem, setEditItem]         = useState(null);
  const [form, setForm]                 = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [page, setPage]                 = useState(1);
  const PER_PAGE = 10;

  const loadItems = async () => {
    setIsLoading(true);
    try {
      /* Charger toutes les sections en parallèle */
      const results = await Promise.all(
        SECTIONS.map((s) => adminApi.getBeautyServices(s.value, true).then((r) => r?.data || []).catch(() => []))
      );
      setItems(results.flat());
    } catch (err) {
      showToast(err.message || "Impossible de charger les visuels", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, []);

  const filtered = useMemo(() => {
    let r = filterSection === "all" ? items : items.filter((i) => i.section_key === filterSection);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((i) => i.title.toLowerCase().includes(q) || (i.section_key || "").toLowerCase().includes(q));
    }
    return r;
  }, [items, filterSection, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const resetPage  = (fn) => { fn(); setPage(1); };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") { setImagePreview(files?.[0] ? URL.createObjectURL(files[0]) : null); }
    if (name === "section_key") {
      setForm((cur) => ({ ...cur, section_key: value, category_key: value === "coiffures" ? "twist" : "coiffure" }));
      return;
    }
    setForm((cur) => ({ ...cur, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async () => {
    if (!form.title || (!editItem && !form.image)) {
      showToast("⚠ Le titre et la photo sont obligatoires", 3000);
      return;
    }
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null && v !== "") fd.append(k, v); });
    try {
      if (editItem) {
        fd.append("_method", "PUT");
        await adminApi.updateBeautyService(editItem.id, fd);
        showToast("✓ Visuel modifié");
      } else {
        await adminApi.createBeautyService(fd);
        showToast("✓ Visuel ajouté");
      }
      closeModal();
      await loadItems();
    } catch (err) {
      showToast(err.message || "Erreur lors de l'enregistrement", 3000);
    }
  };

  const closeModal = () => { setAddOpen(false); setEditItem(null); setForm(initialForm); setImagePreview(null); };

  const handleEdit = (item) => {
    setEditItem(item);
    const defaultCat = item.section_key === "coiffures" ? "twist" : "coiffure";
    setForm({
      section_key:  item.section_key  || "coiffures",
      category_key: item.category_key || defaultCat,
      title:        item.title        || "",
      subtitle:     item.subtitle     || "",
      duration:     item.duration     || "",
      price:        item.price        || "",
      sort_order:   String(item.sort_order ?? 0),
      image:        null,
    });
    setImagePreview(item.image_url || null);
    setAddOpen(true);
  };

  const handleToggle = async (item) => {
    const fd = new FormData();
    fd.append("_method", "PUT");
    fd.append("is_active",    item.is_active ? "0" : "1");
    fd.append("section_key",  item.section_key);
    fd.append("category_key", item.category_key);
    fd.append("title",        item.title);
    fd.append("sort_order",   item.sort_order ?? 0);
    try {
      await adminApi.updateBeautyService(item.id, fd);
      await loadItems();
      showToast("✓ Visibilité mise à jour");
    } catch (err) { showToast(err.message || "Erreur", 3000); }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteBeautyService(id);
      setItems((cur) => cur.filter((i) => i.id !== id));
      showToast("✓ Visuel supprimé");
    } catch (err) { showToast(err.message || "Erreur suppression", 3000); }
  };

  const visible  = items.filter((i) => i.is_active).length;
  const masquees = items.filter((i) => !i.is_active).length;

  return (
    <div className="panel active">

      {/* ── Header ── */}
      <div className="section-head">
        <div>
          <div className="section-head-title">Beauté & Photos</div>
          <div className="section-head-sub">{items.length} visuel(s) au total</div>
        </div>
        <button className="action-btn ab-primary"
          style={{ padding: "10px 22px", fontSize: "13px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => setAddOpen(true)}>
          <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span> Ajouter un visuel
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total",    value: items.length, color: "#c41420" },
          { label: "Visibles", value: visible,      color: "#1a7a3e" },
          { label: "Masquées", value: masquees,     color: "#b07010", urgent: masquees > 0 },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: "14px", padding: "18px 20px",
            border: `1px solid ${s.urgent ? "rgba(224,144,32,.35)" : "rgba(10,10,12,.07)"}`,
            boxShadow: s.urgent ? "0 0 0 3px rgba(224,144,32,.1)" : "none",
          }}>
            <div style={{ fontSize: "30px", fontWeight: "700", color: s.color, fontFamily: "'Fraunces', serif" }}>{s.value}</div>
            <div style={{ fontSize: "11.5px", color: "rgba(10,10,12,.45)", marginTop: "4px", fontWeight: "500" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Recherche ── */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: search ? "var(--red)" : "var(--ink-m)", pointerEvents: "none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Rechercher par titre ou section…" value={search}
          onChange={(e) => resetPage(() => setSearch(e.target.value))}
          style={{
            width: "100%", boxSizing: "border-box", padding: "11px 44px 11px 46px",
            border: `1.5px solid ${search ? "var(--red)" : "var(--border)"}`,
            borderRadius: "14px", fontSize: "13px", fontFamily: "'Inter', sans-serif",
            color: "var(--ink)", background: "#fff", outline: "none",
            boxShadow: search ? "0 0 0 3px rgba(196,20,32,.08)" : "none", transition: "border-color .2s, box-shadow .2s",
          }} />
        {search && (
          <button onClick={() => setSearch("")} style={{
            position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
            border: "none", background: "rgba(10,10,12,.08)", borderRadius: "50%",
            width: "22px", height: "22px", cursor: "pointer", fontSize: "12px", color: "var(--ink-s)",
            display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif",
          }}>✕</button>
        )}
      </div>

      {/* ── Filtres sections ── */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
        <button onClick={() => resetPage(() => setFilterSection("all"))} style={{
          padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
          cursor: "pointer", fontFamily: "'Inter', sans-serif", border: "1.5px solid",
          borderColor: filterSection === "all" ? "var(--red)" : "var(--border)",
          background:  filterSection === "all" ? "var(--red)" : "transparent",
          color:       filterSection === "all" ? "#fff" : "var(--ink-s)",
        }}>
          Toutes
          <span style={{ marginLeft: "6px", background: filterSection === "all" ? "rgba(255,255,255,.25)" : "rgba(10,10,12,.08)", color: filterSection === "all" ? "#fff" : "var(--ink-m)", borderRadius: "100px", fontSize: "10px", fontWeight: "700", padding: "1px 6px" }}>
            {items.length}
          </span>
        </button>
        {SECTIONS.map((s) => {
          const count  = items.filter((i) => i.section_key === s.value).length;
          const active = filterSection === s.value;
          return (
            <button key={s.value} onClick={() => resetPage(() => setFilterSection(s.value))} style={{
              padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
              cursor: "pointer", fontFamily: "'Inter', sans-serif", border: "1.5px solid",
              borderColor: active ? "var(--red)" : "var(--border)",
              background:  active ? "var(--red)" : "transparent",
              color:       active ? "#fff" : "var(--ink-s)",
              display: "inline-flex", alignItems: "center", gap: "6px",
            }}>
              {s.emoji} {s.label}
              <span style={{ background: active ? "rgba(255,255,255,.25)" : "rgba(10,10,12,.08)", color: active ? "#fff" : "var(--ink-m)", borderRadius: "100px", fontSize: "10px", fontWeight: "700", padding: "1px 6px" }}>
                {count}
              </span>
            </button>
          );
        })}
        {search && (
          <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--ink-m)" }}>
            <strong style={{ color: "var(--red)" }}>{filtered.length}</strong> résultat(s) pour «&nbsp;{search}&nbsp;»
          </span>
        )}
      </div>

      {/* ── Grille ── */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--ink-m)" }}>Chargement...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--ink-m)" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🖼️</div>
          <div style={{ fontWeight: "600", marginBottom: "8px" }}>Aucun visuel trouvé</div>
          <button className="action-btn ab-primary" onClick={() => setAddOpen(true)}>+ Ajouter un visuel</button>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "16px" }}>
            {paged.map((item) => (
              <BeautyCard key={item.id} item={item} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "28px", flexWrap: "wrap" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                style={{ padding: "7px 14px", borderRadius: "8px", border: "1.5px solid var(--border)", background: "#fff", cursor: safePage === 1 ? "not-allowed" : "pointer", opacity: safePage === 1 ? 0.4 : 1, fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-s)" }}
              >‹</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} style={{
                  padding: "7px 13px", borderRadius: "8px", border: "1.5px solid",
                  borderColor: n === safePage ? "var(--red)" : "var(--border)",
                  background:  n === safePage ? "var(--red)" : "#fff",
                  color:       n === safePage ? "#fff" : "var(--ink-s)",
                  fontWeight: n === safePage ? "700" : "500",
                  fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer",
                }}>{n}</button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                style={{ padding: "7px 14px", borderRadius: "8px", border: "1.5px solid var(--border)", background: "#fff", cursor: safePage === totalPages ? "not-allowed" : "pointer", opacity: safePage === totalPages ? 0.4 : 1, fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-s)" }}
              >›</button>

              <span style={{ marginLeft: "8px", fontSize: "12px", color: "var(--ink-m)" }}>
                {filtered.length} visuel(s) — page {safePage}/{totalPages}
              </span>
            </div>
          )}
        </>
      )}

      {/* ── Modal AJOUT / ÉDITION ── */}
      {addOpen && (
        <div className="modal-overlay open" onClick={closeModal}>
          <div className="modal-box" style={{ maxWidth: "480px", maxHeight: "92vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-head-title">{editItem ? "Modifier le visuel" : "Nouveau visuel"}</div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                <div className="admin-field">
                  <label className="admin-label">Section (page de destination)</label>
                  <select name="section_key" className="admin-sel" value={form.section_key} onChange={handleChange}>
                    {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>)}
                  </select>
                </div>

                {form.section_key === "coiffures" && (
                  <div className="admin-field">
                    <label className="admin-label">Sous-catégorie</label>
                    <select name="category_key" className="admin-sel" value={form.category_key} onChange={handleChange}>
                      <option value="twist">✂️ Twist</option>
                      <option value="natte">🪢 Natte</option>
                      <option value="autre">🌟 Autre</option>
                    </select>
                  </div>
                )}

                <div className="admin-field">
                  <label className="admin-label">Titre</label>
                  <input name="title" className="admin-inp" value={form.title} onChange={handleChange}
                    placeholder="Ex : Pose gel French nude" />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Description courte <span style={{ fontWeight: 400, color: "var(--ink-m)", fontSize: "11px" }}>(optionnel)</span></label>
                  <input name="subtitle" className="admin-inp" value={form.subtitle} onChange={handleChange}
                    placeholder="Ex : Tressage, twist, soin…" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="admin-field">
                    <label className="admin-label">Durée <span style={{ fontWeight: 400, color: "var(--ink-m)", fontSize: "11px" }}>(opt.)</span></label>
                    <input name="duration" className="admin-inp" value={form.duration} onChange={handleChange} placeholder="Ex : 1H30" />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Prix <span style={{ fontWeight: 400, color: "var(--ink-m)", fontSize: "11px" }}>(opt.)</span></label>
                    <input name="price" className="admin-inp" value={form.price} onChange={handleChange} placeholder="Ex : 24 000 FCFA" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: "12px" }}>
                  <div className="admin-field">
                    <label className="admin-label">
                      Photo
                      {editItem && <span style={{ fontWeight: 400, color: "var(--ink-m)", fontSize: "11px", marginLeft: 6 }}>(laisser vide pour garder l'actuelle)</span>}
                    </label>
                    <input name="image" type="file" accept="image/*" className="admin-inp" onChange={handleChange} />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Ordre</label>
                    <input name="sort_order" type="number" className="admin-inp" value={form.sort_order} onChange={handleChange} min="0" />
                  </div>
                </div>

                {imagePreview && (
                  <div style={{ height: "180px", borderRadius: "14px", overflow: "hidden", background: "rgba(0,0,0,.06)" }}>
                    <img src={imagePreview} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                  <button className="action-btn ab-primary" style={{ flex: 1, padding: "10px" }} onClick={handleSubmit}>
                    {editItem ? "✏️ Enregistrer" : "➕ Ajouter"}
                  </button>
                  <button className="action-btn" style={{ flex: 1, padding: "10px", background: "rgba(10,10,12,.05)", color: "var(--ink-s)" }} onClick={closeModal}>
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyServices;
