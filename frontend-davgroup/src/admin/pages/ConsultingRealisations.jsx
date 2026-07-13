import { useEffect, useState } from "react";
import { adminApi } from "../utils/api";
import { useAdmin } from "../hooks/useAdmin";
import ConfirmModal from "../components/ConfirmModal";

const CATEGORIES = [
  { key: "branding", label: "Branding" },
  { key: "developpement", label: "Développement" },
  { key: "design", label: "Design" },
  { key: "secure", label: "Sécurité" },
];

const EMPTY_FORM = {
  category: "branding",
  title: "",
  tag: "",
  tags: "",
  sort_order: 0,
  is_active: true,
  image: null,
  _imagePreview: null,
};

export default function ConsultingRealisations() {
  const { showToast } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("branding");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getConsultingRealisations(activeCategory);
      setItems(res?.data || []);
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, [activeCategory]);

  const openAdd = () => {
    setEditItem(null);
    setForm({ ...EMPTY_FORM, category: activeCategory });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      category: item.category,
      title: item.title || "",
      tag: item.tag || "",
      tags: (item.tags || []).join(", "),
      sort_order: item.sort_order ?? 0,
      is_active: item.is_active,
      image: null,
      _imagePreview: item.image_url || null,
    });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files) {
      setForm(f => ({ ...f, image: files[0], _imagePreview: URL.createObjectURL(files[0]) }));
    } else {
      setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("category", form.category);
      fd.append("title", form.title);
      if (form.tag) fd.append("tag", form.tag);
      form.tags.split(",").map(t => t.trim()).filter(Boolean).forEach(t => fd.append("tags[]", t));
      fd.append("sort_order", form.sort_order);
      fd.append("is_active", form.is_active ? "1" : "0");
      if (form.image) fd.append("image", form.image);

      if (editItem) {
        await adminApi.updateConsultingRealisation(editItem.id, fd);
        showToast("Réalisation mise à jour.", 2500);
      } else {
        await adminApi.createConsultingRealisation(fd);
        showToast("Réalisation ajoutée.", 2500);
      }
      closeModal();
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (item) => setDeleteTarget(item);

  const confirmDelete = async () => {
    const item = deleteTarget;
    setDeleteTarget(null);
    try {
      await adminApi.deleteConsultingRealisation(item.id);
      showToast("Réalisation supprimée.", 2500);
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    }
  };

  const toggleActive = async (item) => {
    try {
      const fd = new FormData();
      fd.append("is_active", item.is_active ? "0" : "1");
      await adminApi.updateConsultingRealisation(item.id, fd);
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    }
  };

  return (
    <div className="panel-wrap">
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Réalisations Consulting</h1>
          <p className="panel-subtitle">Gérez les images affichées sur les pages Branding, Développement et Design</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Ajouter une réalisation</button>
      </div>

      <div className="cr-tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`cr-tab${activeCategory === c.key ? " cr-tab--active" : ""}`}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="loading-state">Chargement…</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>Aucune réalisation pour le moment dans cette catégorie.</p>
          <button className="btn-primary" onClick={openAdd}>Ajouter la première</button>
        </div>
      ) : (
        <div className="promo-slides-grid">
          {items.map((item) => (
            <div key={item.id} className={`promo-slide-card${!item.is_active ? " promo-slide-card--inactive" : ""}`}>
              <div className="promo-slide-img">
                {item.image_url
                  ? <img src={item.image_url} alt={item.title} />
                  : <span className="promo-slide-no-img">Pas d'image</span>
                }
                <span className={`promo-slide-status ${item.is_active ? "status--active" : "status--inactive"}`}>
                  {item.is_active ? "Actif" : "Inactif"}
                </span>
              </div>
              <div className="promo-slide-body">
                <p className="promo-slide-order">#{item.sort_order}</p>
                <h3>{item.title}</h3>
                {item.tag && <p className="promo-slide-sub">{item.tag}</p>}
                {item.tags?.length > 0 && (
                  <p className="promo-slide-desc">{item.tags.join(" · ")}</p>
                )}
              </div>
              <div className="promo-slide-actions">
                <button className="btn-ghost btn-sm" onClick={() => toggleActive(item)}>
                  {item.is_active ? "Désactiver" : "Activer"}
                </button>
                <button className="btn-ghost btn-sm" onClick={() => openEdit(item)}>Modifier</button>
                <button className="btn-danger btn-sm" onClick={() => handleDelete(item)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h2>{editItem ? "Modifier la réalisation" : "Nouvelle réalisation"}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="form-label">
                Catégorie *
                <select name="category" className="form-input" value={form.category} onChange={handleChange} required>
                  {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </label>
              <label className="form-label">
                Titre *
                <input name="title" className="form-input" value={form.title} onChange={handleChange} required />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">
                  Étiquette (ex: UI Design, web…)
                  <input name="tag" className="form-input" value={form.tag} onChange={handleChange} />
                </label>
                <label className="form-label">
                  Tags (séparés par virgule)
                  <input name="tags" className="form-input" value={form.tags} onChange={handleChange} placeholder="Figma, UI Kit" />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">
                  Ordre d'affichage
                  <input name="sort_order" className="form-input" type="number" min={0} value={form.sort_order} onChange={handleChange} />
                </label>
                <label className="form-label" style={{ justifyContent: "center" }}>
                  <span>Actif</span>
                  <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} style={{ width: 20, height: 20, marginTop: 8 }} />
                </label>
              </div>
              <label className="form-label">
                Image
                <input name="image" type="file" className="form-input" accept="image/*" onChange={handleChange} />
              </label>
              {form._imagePreview && (
                <img src={form._imagePreview} alt="Preview" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, marginTop: 4 }} />
              )}
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={closeModal}>Annuler</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Enregistrement…" : editItem ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer la réalisation"
        message={`Supprimer "${deleteTarget?.title}" ? Cette action est définitive.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <style>{`
        .cr-tabs {
          display: flex;
          gap: 8px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .cr-tab {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--border, #e5e4e7);
          background: transparent;
          font-size: 13px;
          cursor: pointer;
        }
        .cr-tab--active {
          background: #111;
          color: #fff;
          border-color: #111;
        }
        .promo-slides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        .promo-slide-card {
          border: 1px solid var(--border, #e5e4e7);
          border-radius: 12px;
          overflow: hidden;
          background: var(--card-bg, #fff);
          transition: opacity .2s;
        }
        .promo-slide-card--inactive { opacity: .55; }
        .promo-slide-img {
          position: relative;
          aspect-ratio: 16/9;
          background: #f3e7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .promo-slide-img img { width: 100%; height: 100%; object-fit: cover; }
        .promo-slide-no-img { font-size: 12px; color: #aaa; }
        .promo-slide-status {
          position: absolute;
          top: 8px; right: 8px;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }
        .status--active { background: #dcfce7; color: #166534; }
        .status--inactive { background: #f3f4f6; color: #6b7280; }
        .promo-slide-body { padding: 14px 16px 8px; }
        .promo-slide-order { font-size: 11px; color: #aaa; margin-bottom: 4px; }
        .promo-slide-body h3 { font-size: 15px; font-weight: 600; margin: 0 0 4px; }
        .promo-slide-sub { font-size: 13px; color: #888; margin: 0 0 4px; }
        .promo-slide-desc { font-size: 12px; color: #aaa; margin: 0 0 4px; line-height: 1.4; }
        .promo-slide-actions {
          display: flex;
          gap: 8px;
          padding: 8px 16px 14px;
          flex-wrap: wrap;
        }
        .btn-sm { padding: 5px 10px; font-size: 12px; }
      `}</style>
    </div>
  );
}
