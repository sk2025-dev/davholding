import { useCallback, useState, useMemo, useEffect } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { BADGE_OPTIONS } from "../utils/constants";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const initialForm = {
  category_id: "",
  name: "",
  description: "",
  price: "",
  sku: "",
  quantity: "0",
  badge: "",
  image: null,
  image2: null,
};

/* ── Formulaire réutilisable (ajout + modification) ── */
const ProductForm = ({ form, categories, imagePreview, image2Preview, onChange, onSubmit, onCancel, submitLabel }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
    <div className="admin-field">
      <label className="admin-label">Nom du produit</label>
      <input name="name" className="admin-inp" value={form.name} onChange={onChange} placeholder="Ex : Huile Black Plus" />
    </div>

    <div className="admin-field">
      <label className="admin-label">Description</label>
      <textarea name="description" className="admin-inp" value={form.description} onChange={onChange}
        placeholder="Ex : Huile concentrée aux extraits botaniques..." rows={3} style={{ resize: "vertical" }} />
    </div>

    <div className="admin-field">
      <label className="admin-label">Catégorie</label>
      <select name="category_id" className="admin-sel" value={form.category_id} onChange={onChange}>
        <option value="">— Sélectionner —</option>
        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div className="admin-field">
        <label className="admin-label">Prix (FCFA)</label>
        <input name="price" type="number" className="admin-inp" value={form.price} onChange={onChange} placeholder="5000" />
      </div>
      <div className="admin-field">
        <label className="admin-label">Quantité en stock</label>
        <input name="quantity" type="number" className="admin-inp" value={form.quantity} onChange={onChange} min="0" />
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div className="admin-field">
        <label className="admin-label">SKU</label>
        <input name="sku" className="admin-inp" value={form.sku} onChange={onChange} placeholder="Ex : HBP-001" />
      </div>
      <div className="admin-field">
        <label className="admin-label">Badge</label>
        <select name="badge" className="admin-sel" value={form.badge} onChange={onChange}>
          {BADGE_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
      </div>
    </div>

    <div className="admin-field">
      <label className="admin-label">Image principale</label>
      <input name="image" type="file" accept="image/*" className="admin-inp" onChange={onChange} />
      {imagePreview && (
        <div style={{ marginTop: "10px", height: "150px", borderRadius: "14px", overflow: "hidden", background: "rgba(0,0,0,.06)" }}>
          <img src={imagePreview} alt="Aperçu image 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
    </div>

    <div className="admin-field">
      <label className="admin-label">Image 2 <span style={{ fontSize: "11px", color: "var(--ink-m)", fontWeight: 400 }}>(optionnelle — affiché au clic sur la carte)</span></label>
      <input name="image2" type="file" accept="image/*" className="admin-inp" onChange={onChange} />
      {image2Preview && (
        <div style={{ marginTop: "10px", height: "150px", borderRadius: "14px", overflow: "hidden", background: "rgba(0,0,0,.06)" }}>
          <img src={image2Preview} alt="Aperçu image 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
    </div>

    <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
      <button className="action-btn ab-primary" style={{ flex: 1, padding: "10px" }} onClick={onSubmit}>
        {submitLabel}
      </button>
      <button className="action-btn" style={{ flex: 1, padding: "10px", background: "rgba(10,10,12,.05)", color: "var(--ink-s)" }} onClick={onCancel}>
        Annuler
      </button>
    </div>
  </div>
);

/* ── Composant carte produit ── */
const ProductCard = ({ p, onPriceChange, onPriceCommit, onStockToggle, onBadgeChange, onFeaturedToggle, onEdit, onDelete }) => {
  const inStock = p.quantity > 0;
  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid rgba(10,10,12,.08)",
      boxShadow: inStock ? "0 2px 12px rgba(0,0,0,.05)" : "0 2px 12px rgba(224,48,48,.06)",
      transition: "box-shadow .2s, transform .2s",
      display: "flex",
      flexDirection: "column",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = inStock ? "0 2px 12px rgba(0,0,0,.05)" : "0 2px 12px rgba(224,48,48,.06)"; }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "180px", background: "var(--gold-pale)", overflow: "hidden" }}>
        <img
          src={p.image || "/images/placeholder.png"}
          alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />

        {/* Badge produit (nouveau, promo…) */}
        {p.badge && (
          <span style={{
            position: "absolute", top: "10px", left: "10px",
            background: "linear-gradient(135deg, #c41420, #8b0d19)",
            color: "#fff", fontSize: "9.5px", fontWeight: "700",
            padding: "3px 10px", borderRadius: "100px", letterSpacing: ".06em", textTransform: "uppercase",
          }}>
            {BADGE_OPTIONS.find((b) => b.value === p.badge)?.label || p.badge}
          </span>
        )}

        {/* Overlay rupture */}
        {!inStock && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(196,20,32,.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(2px)",
          }}>
            <span style={{ color: "#fff", fontWeight: "700", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase" }}>
              Rupture de stock
            </span>
          </div>
        )}

        {/* Indicateur stock coin */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          width: "10px", height: "10px", borderRadius: "50%",
          background: inStock ? "#2eaa5e" : "#e03030",
          boxShadow: `0 0 0 3px ${inStock ? "rgba(46,170,94,.25)" : "rgba(224,48,48,.25)"}`,
        }} />
      </div>

      {/* Corps */}
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Nom + catégorie */}
        <div>
          <div style={{ fontWeight: "700", fontSize: "14px", color: "var(--ink)", lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ fontSize: "11px", color: "var(--ink-m)", marginTop: "3px", textTransform: "uppercase", letterSpacing: ".06em" }}>{p.category}</div>
        </div>

        {/* Prix éditable */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--bg)", borderRadius: "10px", padding: "6px 12px", border: "1px solid var(--border)" }}>
          <input
            type="text"
            value={p.price}
            onChange={(e) => onPriceChange(p.id, e.target.value)}
            onBlur={(e) => onPriceCommit(p.id, e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", fontWeight: "700", fontSize: "15px", color: "var(--red)", width: "100%", fontFamily: "'Inter', sans-serif" }}
            placeholder="Prix"
          />
          <span style={{ fontSize: "11px", color: "var(--ink-m)", whiteSpace: "nowrap" }}>FCFA</span>
        </div>

        {/* Stock + badge */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => onStockToggle(p)}
            style={{
              flex: 1, padding: "6px 0", borderRadius: "8px", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontWeight: "600", fontSize: "11.5px",
              background: inStock ? "rgba(46,170,94,.12)" : "rgba(224,48,48,.1)",
              color: inStock ? "#1a7a3e" : "var(--danger)",
              transition: "all .2s",
            }}
          >
            {inStock ? "✓ En stock" : "✕ Rupture"}
          </button>
          <select
            value={p.badge || ""}
            onChange={(e) => onBadgeChange(p, e.target.value)}
            style={{
              flex: 1, padding: "6px 8px", borderRadius: "8px", border: "1px solid var(--border)",
              background: "transparent", fontSize: "11.5px", fontFamily: "'Inter', sans-serif",
              color: "var(--ink-s)", cursor: "pointer", outline: "none",
            }}
          >
            {BADGE_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>

        {/* Vedette (popup produit suggéré) */}
        <button
          onClick={() => onFeaturedToggle(p)}
          style={{
            padding: "6px 0", borderRadius: "8px", border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontWeight: "600", fontSize: "11.5px",
            background: p.is_featured ? "rgba(224,144,32,.14)" : "rgba(10,10,12,.05)",
            color: p.is_featured ? "#b07010" : "var(--ink-s)",
            transition: "all .2s",
          }}
        >
          {p.is_featured ? "★ Produit vedette" : "☆ Mettre en vedette"}
        </button>

        {/* Actions */}
        <div style={{ display: "flex", gap: "6px", marginTop: "auto" }}>
          <button
            onClick={() => onEdit(p)}
            style={{
              flex: 1, padding: "7px 0", borderRadius: "8px", border: "1.5px solid var(--border)",
              background: "transparent", fontSize: "12px", fontWeight: "600", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", color: "var(--ink-s)", transition: "all .2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-s)"; }}
          >
            ✎ Modifier
          </button>
          <button
            onClick={() => onDelete(p.id)}
            style={{
              padding: "7px 12px", borderRadius: "8px", border: "1.5px solid rgba(224,48,48,.2)",
              background: "rgba(224,48,48,.06)", fontSize: "13px", cursor: "pointer", color: "var(--danger)",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--danger)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(224,48,48,.06)"; e.currentTarget.style.color = "var(--danger)"; }}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

const PAGE_SIZE = 12;

/* ── Barre de pagination ── */
const Pagination = ({ page, totalPages, total, pageSize, onChange }) => {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end   = Math.min(page * pageSize, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const btnBase = {
    minWidth: "34px", height: "34px", borderRadius: "8px", border: "1.5px solid",
    cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: "600",
    fontSize: "12.5px", transition: "all .15s", display: "inline-flex",
    alignItems: "center", justifyContent: "center", padding: "0 8px",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", flexWrap: "wrap", gap: "10px" }}>
      <div style={{ fontSize: "12px", color: "var(--ink-m)" }}>
        Affichage <strong style={{ color: "var(--ink)" }}>{start}–{end}</strong> sur <strong style={{ color: "var(--ink)" }}>{total}</strong> produit(s)
      </div>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          style={{ ...btnBase, borderColor: page === 1 ? "var(--border)" : "var(--red)", color: page === 1 ? "var(--ink-m)" : "var(--red)", background: "transparent", opacity: page === 1 ? .4 : 1 }}
        >
          ‹ Préc.
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} style={{ color: "var(--ink-m)", fontSize: "13px", padding: "0 4px" }}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              style={{ ...btnBase, borderColor: p === page ? "var(--red)" : "var(--border)", background: p === page ? "var(--red)" : "transparent", color: p === page ? "#fff" : "var(--ink-s)" }}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          style={{ ...btnBase, borderColor: page === totalPages ? "var(--border)" : "var(--red)", color: page === totalPages ? "var(--ink-m)" : "var(--red)", background: "transparent", opacity: page === totalPages ? .4 : 1 }}
        >
          Suiv. ›
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
const Products = () => {
  const { showToast } = useAdmin();
  const [products, setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading]  = useState(true);
  const [filter, setFilter]        = useState("all");
  const [search, setSearch]        = useState("");
  const [page, setPage]            = useState(1);

  const [addOpen, setAddOpen]             = useState(false);
  const [form, setForm]                   = useState(initialForm);
  const [imagePreview, setImagePreview]   = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  const [editProduct, setEditProduct]            = useState(null);
  const [editForm, setEditForm]                  = useState(initialForm);
  const [editImagePreview, setEditImagePreview]   = useState(null);
  const [editImage2Preview, setEditImage2Preview] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const [pr, cr] = await Promise.all([adminApi.getProducts(), adminApi.getCategories()]);
      setProducts(pr?.data || []);
      setCategories(cr?.data || []);
    } catch (err) {
      showToast(err.message || "Impossible de charger les produits", 3000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadData(); }, [loadData]);

  /* ── Filtres ── */
  const filteredProducts = useMemo(() => {
    let r = products || [];
    if (filter === "oos")    r = r.filter((p) => p.quantity <= 0);
    if (filter === "active") r = r.filter((p) => p.quantity > 0);
    if (search) {
      const q = search.toLowerCase();
      const badgeLabel = (val) => BADGE_OPTIONS.find((b) => b.value === val)?.label || "";
      r = r.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category    || "").toLowerCase().includes(q) ||
        (p.sku         || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        badgeLabel(p.badge).toLowerCase().includes(q)
      );
    }
    return r;
  }, [products, filter, search]);

  // Reset page quand les filtres changent
  useEffect(() => { setPage(1); }, [filter, search]);

  const oos        = products.filter((p) => p.quantity <= 0).length;
  const active     = products.filter((p) => p.quantity > 0).length;
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const pagedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Handlers prix / stock / badge ── */
  const handlePriceChange  = (id, v) => setProducts((c) => c.map((p) => p.id === id ? { ...p, price: v } : p));
  const handlePriceCommit  = async (id, v) => { try { const fd = new FormData(); fd.append("price", v); await adminApi.updateProduct(id, fd); showToast("✓ Prix mis à jour"); } catch (e) { showToast(e.message, 3000); } };
  const handleStockToggle  = async (product) => { const q = product.quantity > 0 ? 0 : (product.min_quantity || 0) + 10; try { const fd = new FormData(); fd.append("quantity", q); await adminApi.updateProduct(product.id, fd); setProducts((c) => c.map((p) => p.id === product.id ? { ...p, quantity: q } : p)); showToast("✓ Stock mis à jour"); } catch (e) { showToast(e.message, 3000); } };
  const handleBadgeChange  = async (product, badge) => { try { const fd = new FormData(); fd.append("badge", badge); await adminApi.updateProduct(product.id, fd); setProducts((c) => c.map((p) => p.id === product.id ? { ...p, badge } : p)); showToast("✓ Badge mis à jour"); } catch (e) { showToast(e.message, 3000); } };
  const handleFeaturedToggle = async (product) => { const next = !product.is_featured; try { const fd = new FormData(); fd.append("is_featured", next ? "1" : "0"); await adminApi.updateProduct(product.id, fd); setProducts((c) => c.map((p) => p.id === product.id ? { ...p, is_featured: next } : p)); showToast(next ? "✓ Produit mis en vedette" : "✓ Produit retiré de la vedette"); } catch (e) { showToast(e.message, 3000); } };
  const handleDelete       = async (id) => { try { await adminApi.deleteProduct(id); setProducts((c) => c.filter((p) => p.id !== id)); showToast("✓ Produit supprimé"); } catch (e) { showToast(e.message, 3000); } };

  /* ── Ajout ── */
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setImagePreview(files?.[0] ? URL.createObjectURL(files[0]) : null);
    if (name === "image2") setImage2Preview(files?.[0] ? URL.createObjectURL(files[0]) : null);
    setForm((c) => ({ ...c, [name]: files ? files[0] : value }));
  };
  const handleAddProduct = async () => {
    if (!form.category_id || !form.name || !form.price || !form.sku) { showToast("⚠ Nom, catégorie, prix et SKU requis", 3000); return; }
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null && v !== "") fd.append(k, v); });
    try { await adminApi.createProduct(fd); setForm(initialForm); setImagePreview(null); setImage2Preview(null); setAddOpen(false); await loadData(); showToast("✓ Produit ajouté"); } catch (e) { showToast(e.message, 3000); }
  };
  const closeAdd = () => { setAddOpen(false); setForm(initialForm); setImagePreview(null); setImage2Preview(null); };

  /* ── Modification ── */
  const openEdit = (p) => {
    setEditProduct(p);
    setEditForm({ category_id: p.category_id?.toString() || "", name: p.name || "", description: p.description || "", price: p.price?.toString() || "", sku: p.sku || "", quantity: p.quantity?.toString() || "0", badge: p.badge || "", image: null, image2: null });
    setEditImagePreview(p.image || null);
    setEditImage2Preview(p.image2 || null);
  };
  const closeEdit = () => { setEditProduct(null); setEditImagePreview(null); setEditImage2Preview(null); };
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setEditImagePreview(files?.[0] ? URL.createObjectURL(files[0]) : editImagePreview);
    if (name === "image2") setEditImage2Preview(files?.[0] ? URL.createObjectURL(files[0]) : editImage2Preview);
    setEditForm((c) => ({ ...c, [name]: files ? files[0] : value }));
  };
  const handleEditSubmit = async () => {
    if (!editForm.category_id || !editForm.name || !editForm.price || !editForm.sku) { showToast("⚠ Champs requis manquants", 3000); return; }
    const fd = new FormData();
    Object.entries(editForm).forEach(([k, v]) => { if (v !== null && v !== "") fd.append(k, v); });
    try { await adminApi.updateProduct(editProduct.id, fd); closeEdit(); await loadData(); showToast("✓ Produit modifié"); } catch (e) { showToast(e.message, 3000); }
  };

  /* ══ RENDU ══════════════════════════════════════════════════════════════════ */
  return (
    <div className="panel active">

      {/* ── Header ── */}
      <div className="section-head">
        <div>
          <div className="section-head-title">Produits &amp; Stock</div>
          <div className="section-head-sub">{products.length} produit(s) au total</div>
        </div>
        <button
          className="action-btn ab-primary"
          style={{ padding: "10px 22px", fontSize: "13px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => setAddOpen(true)}
        >
          <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span>
          Ajouter un produit
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total produits",  value: products.length, color: "#c41420", bg: "rgba(196,20,32,.07)" },
          { label: "En stock",         value: active,          color: "#1a7a3e", bg: "rgba(46,170,94,.08)" },
          { label: "Ruptures",         value: oos,             color: "#b07010", bg: "rgba(224,144,32,.09)", urgent: oos > 0 },
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

      {/* ── Barre de recherche ── */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: search ? "var(--red)" : "var(--ink-m)", pointerEvents: "none", transition: "color .2s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher par nom, SKU, catégorie, description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "11px 44px 11px 46px",
            border: `1.5px solid ${search ? "var(--red)" : "var(--border)"}`,
            borderRadius: "14px", fontSize: "13px", fontFamily: "'Inter', sans-serif",
            color: "var(--ink)", background: "#fff", outline: "none",
            boxShadow: search ? "0 0 0 3px rgba(196,20,32,.08)" : "none",
            transition: "border-color .2s, box-shadow .2s",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
              border: "none", background: "rgba(10,10,12,.08)", borderRadius: "50%",
              width: "22px", height: "22px", cursor: "pointer", fontSize: "12px",
              color: "var(--ink-s)", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Inter', sans-serif", lineHeight: 1,
            }}
            title="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Filtres ── */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
        {[
          { id: "all",    label: "Tous",      count: products.length },
          { id: "active", label: "En stock",  count: active },
          { id: "oos",    label: "Ruptures",  count: oos },
        ].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
            cursor: "pointer", fontFamily: "'Inter', sans-serif", border: "1.5px solid",
            transition: "all .2s", display: "inline-flex", alignItems: "center", gap: "6px",
            borderColor: filter === f.id ? "var(--red)" : "var(--border)",
            background:  filter === f.id ? "var(--red)" : "transparent",
            color:       filter === f.id ? "#fff" : "var(--ink-s)",
          }}>
            {f.label}
            <span style={{ background: filter === f.id ? "rgba(255,255,255,.25)" : "rgba(10,10,12,.08)", color: filter === f.id ? "#fff" : "var(--ink-m)", borderRadius: "100px", fontSize: "10px", fontWeight: "700", padding: "1px 6px" }}>
              {f.count}
            </span>
          </button>
        ))}
        {search && (
          <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--ink-m)" }}>
            <strong style={{ color: "var(--red)" }}>{filteredProducts.length}</strong> résultat(s) pour «&nbsp;{search}&nbsp;»
          </span>
        )}
      </div>

      {/* ── Grille produits ── */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--ink-m)" }}>Chargement...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--ink-m)" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
          <div style={{ fontWeight: "600", marginBottom: "8px" }}>Aucun produit trouvé</div>
          <button className="action-btn ab-primary" onClick={() => setAddOpen(true)}>+ Ajouter un produit</button>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
            {pagedProducts.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                categories={categories}
                onPriceChange={handlePriceChange}
                onPriceCommit={handlePriceCommit}
                onStockToggle={handleStockToggle}
                onBadgeChange={handleBadgeChange}
                onFeaturedToggle={handleFeaturedToggle}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filteredProducts.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </>
      )}

      {/* ── Modal AJOUT ── */}
      {addOpen && (
        <div className="modal-overlay open" onClick={closeAdd}>
          <div className="modal-box" style={{ maxWidth: "520px", maxHeight: "92vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-head-title">Nouveau produit</div>
              <button className="modal-close" onClick={closeAdd}>✕</button>
            </div>
            <div className="modal-body">
              <ProductForm
                form={form}
                categories={categories}
                imagePreview={imagePreview}
                image2Preview={image2Preview}
                onChange={handleFormChange}
                onSubmit={handleAddProduct}
                onCancel={closeAdd}
                submitLabel="➕ Ajouter le produit"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Modal MODIFICATION ── */}
      {editProduct && (
        <div className="modal-overlay open" onClick={closeEdit}>
          <div className="modal-box" style={{ maxWidth: "520px", maxHeight: "92vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-head-title">Modifier — {editProduct.name}</div>
              <button className="modal-close" onClick={closeEdit}>✕</button>
            </div>
            <div className="modal-body">
              <ProductForm
                form={editForm}
                categories={categories}
                imagePreview={editImagePreview}
                image2Preview={editImage2Preview}
                onChange={handleEditChange}
                onSubmit={handleEditSubmit}
                onCancel={closeEdit}
                submitLabel="💾 Enregistrer les modifications"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
