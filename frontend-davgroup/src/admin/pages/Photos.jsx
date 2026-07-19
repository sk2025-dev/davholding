import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const CATEGORY_OPTIONS = [
  { value: "coiffure",  label: "Coiffure" },
  { value: "ongerie",   label: "Ongerie" },
  { value: "spa",       label: "Spa & Soins" },
  { value: "equipe",    label: "Équipe" },
  { value: "ambiance",  label: "Ambiance salon" },
];

const initialForm = {
  section_key: "galerie",
  category_key: "coiffure",
  title: "",
  sort_order: "0",
  image: null,
};

const Photos = () => {
  const { showToast } = useAdmin();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [filterCat, setFilterCat] = useState("all");

  const loadItems = useCallback(async () => {
    try {
      const res = await adminApi.getBeautyServices("galerie");
      setItems(res?.data || []);
    } catch (err) {
      showToast(err.message || "Impossible de charger les photos", 3000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filtered = useMemo(() => {
    if (filterCat === "all") return items;
    return items.filter((i) => i.category_key === filterCat);
  }, [items, filterCat]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files?.[0] || null;
      setImagePreview(file ? URL.createObjectURL(file) : null);
    }
    setForm((cur) => ({ ...cur, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.image) {
      showToast("⚠ Le titre et la photo sont obligatoires", 3000);
      return;
    }
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null && v !== "") fd.append(k, v);
    });
    try {
      await adminApi.createBeautyService(fd);
      setForm(initialForm);
      setImagePreview(null);
      await loadItems();
      showToast("✓ Photo ajoutée");
    } catch (err) {
      showToast(err.message || "Erreur lors de l'ajout", 3000);
    }
  };

  const handleToggle = async (item) => {
    const fd = new FormData();
    fd.append("_method", "PUT");
    fd.append("is_active", item.is_active ? "0" : "1");
    fd.append("section_key", item.section_key);
    fd.append("category_key", item.category_key);
    fd.append("title", item.title);
    fd.append("sort_order", item.sort_order ?? 0);
    try {
      await adminApi.updateBeautyService(item.id, fd);
      await loadItems();
      showToast("✓ Visibilité mise à jour");
    } catch (err) {
      showToast(err.message || "Erreur", 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteBeautyService(id);
      setItems((cur) => cur.filter((i) => i.id !== id));
      showToast("✓ Photo supprimée");
    } catch (err) {
      showToast(err.message || "Erreur suppression", 3000);
    }
  };

  return (
    <div className="panel active">
      <div className="section-head">
        <div>
          <div className="section-head-title">Galerie Photos</div>
          <div className="section-head-sub">{items.length} photo(s) dans la galerie</div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button className={`tf-tab ${filterCat === "all" ? "tf-active" : ""}`} onClick={() => setFilterCat("all")}>Toutes</button>
          {CATEGORY_OPTIONS.map((c) => (
            <button key={c.value} className={`tf-tab ${filterCat === c.value ? "tf-active" : ""}`} onClick={() => setFilterCat(c.value)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="promos-layout" style={{ marginBottom: "24px" }}>
        <div className="promo-form-card">
          <div className="promo-card-title">Ajouter une photo</div>

          <div className="admin-field">
            <label className="admin-label">Titre / Légende</label>
            <input name="title" className="admin-inp" value={form.title} onChange={handleChange} placeholder="Ex : Pose gel French" />
          </div>

          <div className="admin-field">
            <label className="admin-label">Catégorie</label>
            <select name="category_key" className="admin-sel" value={form.category_key} onChange={handleChange}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: "12px" }}>
            <div className="admin-field">
              <label className="admin-label">Photo</label>
              <input name="image" type="file" accept="image/*" className="admin-inp" onChange={handleChange} />
              {imagePreview && (
                <div style={{ marginTop: "12px", height: "180px", borderRadius: "14px", overflow: "hidden", background: "rgba(0,0,0,.06)" }}>
                  <img src={imagePreview} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
            <div className="admin-field">
              <label className="admin-label">Ordre</label>
              <input name="sort_order" type="number" className="admin-inp" value={form.sort_order} onChange={handleChange} min="0" />
            </div>
          </div>

          <button className="action-btn ab-primary" onClick={handleSubmit} style={{ width: "100%", marginTop: "4px" }}>
            ➕ Ajouter à la galerie
          </button>
        </div>

        <div />
      </div>

      {/* Grille photos */}
      {isLoading ? (
        <div className="empty-row">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-row">Aucune photo dans cette catégorie</div>
      ) : (
        <div className="products-admin-grid">
          {filtered.map((item) => (
            <div key={item.id} className={`prod-admin-card ${!item.is_active ? "out-of-stock" : ""}`}>
              <div className="pac-img">
                <img
                  src={item.image_url || "/images/placeholder.png"}
                  alt={item.title}
                  onError={(e) => (e.target.parentNode.style.background = "var(--gold-pale)")}
                />
                {!item.is_active && (
                  <div className="pac-stock-overlay"><span>Masquée</span></div>
                )}
              </div>
              <div className="pac-body">
                <div className="pac-name">{item.title}</div>
                <div className="pac-cat">
                  {CATEGORY_OPTIONS.find((c) => c.value === item.category_key)?.label || item.category_key}
                  {" · "}ordre {item.sort_order}
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                  <button
                    className={`action-btn ${item.is_active ? "ab-confirm" : ""}`}
                    style={!item.is_active ? { background: "rgba(255,178,0,.15)", color: "var(--warn)" } : {}}
                    onClick={() => handleToggle(item)}
                  >
                    {item.is_active ? "✓ Visible" : "⊘ Masquée"}
                  </button>
                  <button className="action-btn ab-cancel" onClick={() => handleDelete(item.id)}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Photos;
