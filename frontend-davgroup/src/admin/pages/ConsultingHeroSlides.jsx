import { useEffect, useState } from "react";
import { adminApi } from "../utils/api";
import { useAdmin } from "../hooks/useAdmin";
import ConfirmModal from "../components/ConfirmModal";

const EMPTY_FORM = {
  tag: "",
  tab_label: "",
  headline: "",
  headline_highlight: "",
  subtitle: "",
  bullets: "",
  cta_primary_label: "Démarrer un projet",
  cta_primary_link: "#contact",
  cta_secondary_label: "",
  cta_secondary_link: "",
  sort_order: 0,
  is_active: true,
  image: null,
  _imagePreview: null,
};

export default function ConsultingHeroSlides() {
  const { showToast } = useAdmin();
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSlide, setEditSlide] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getConsultingHeroSlides();
      setSlides(res?.data || []);
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditSlide(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (slide) => {
    setEditSlide(slide);
    setForm({
      tag: slide.tag || "",
      tab_label: slide.tab_label || "",
      headline: slide.headline || "",
      headline_highlight: slide.headline_highlight || "",
      subtitle: slide.subtitle || "",
      bullets: (slide.bullets || []).join("\n"),
      cta_primary_label: slide.cta_primary_label || "Démarrer un projet",
      cta_primary_link: slide.cta_primary_link || "#contact",
      cta_secondary_label: slide.cta_secondary_label || "",
      cta_secondary_link: slide.cta_secondary_link || "",
      sort_order: slide.sort_order ?? 0,
      is_active: slide.is_active,
      image: null,
      _imagePreview: slide.image_url || null,
    });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditSlide(null); };

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
      fd.append("tab_label", form.tab_label);
      fd.append("headline", form.headline);
      if (form.tag) fd.append("tag", form.tag);
      if (form.headline_highlight) fd.append("headline_highlight", form.headline_highlight);
      if (form.subtitle) fd.append("subtitle", form.subtitle);
      form.bullets.split("\n").map(b => b.trim()).filter(Boolean).forEach(b => fd.append("bullets[]", b));
      fd.append("cta_primary_label", form.cta_primary_label || "Démarrer un projet");
      fd.append("cta_primary_link", form.cta_primary_link || "#contact");
      if (form.cta_secondary_label) fd.append("cta_secondary_label", form.cta_secondary_label);
      if (form.cta_secondary_link) fd.append("cta_secondary_link", form.cta_secondary_link);
      fd.append("sort_order", form.sort_order);
      fd.append("is_active", form.is_active ? "1" : "0");
      if (form.image) fd.append("image", form.image);

      if (editSlide) {
        await adminApi.updateConsultingHeroSlide(editSlide.id, fd);
        showToast("Slide mise à jour.", 2500);
      } else {
        await adminApi.createConsultingHeroSlide(fd);
        showToast("Slide ajoutée.", 2500);
      }
      closeModal();
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (slide) => setDeleteTarget(slide);

  const confirmDelete = async () => {
    const slide = deleteTarget;
    setDeleteTarget(null);
    try {
      await adminApi.deleteConsultingHeroSlide(slide.id);
      showToast("Slide supprimée.", 2500);
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    }
  };

  const toggleActive = async (slide) => {
    try {
      const fd = new FormData();
      fd.append("is_active", slide.is_active ? "0" : "1");
      await adminApi.updateConsultingHeroSlide(slide.id, fd);
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    }
  };

  return (
    <div className="panel-wrap">
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Carrousel Consulting</h1>
          <p className="panel-subtitle">Gérez les slides du grand carrousel de la page d'accueil Consulting</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Ajouter une slide</button>
      </div>

      {isLoading ? (
        <div className="loading-state">Chargement…</div>
      ) : slides.length === 0 ? (
        <div className="empty-state">
          <p>Aucune slide pour le moment.</p>
          <button className="btn-primary" onClick={openAdd}>Ajouter la première</button>
        </div>
      ) : (
        <div className="promo-slides-grid">
          {slides.map((slide) => (
            <div key={slide.id} className={`promo-slide-card${!slide.is_active ? " promo-slide-card--inactive" : ""}`}>
              <div className="promo-slide-img">
                {slide.image_url
                  ? <img src={slide.image_url} alt={slide.tab_label} />
                  : <span className="promo-slide-no-img">Pas d'image</span>
                }
                <span className={`promo-slide-status ${slide.is_active ? "status--active" : "status--inactive"}`}>
                  {slide.is_active ? "Actif" : "Inactif"}
                </span>
              </div>
              <div className="promo-slide-body">
                <p className="promo-slide-order">#{slide.sort_order} · Onglet : {slide.tab_label}</p>
                <h3>{slide.headline}{slide.headline_highlight ? ` ${slide.headline_highlight}` : ""}</h3>
                {slide.tag && <p className="promo-slide-sub">{slide.tag}</p>}
                {slide.bullets?.length > 0 && (
                  <p className="promo-slide-desc">{slide.bullets.join(" · ")}</p>
                )}
              </div>
              <div className="promo-slide-actions">
                <button className="btn-ghost btn-sm" onClick={() => toggleActive(slide)}>
                  {slide.is_active ? "Désactiver" : "Activer"}
                </button>
                <button className="btn-ghost btn-sm" onClick={() => openEdit(slide)}>Modifier</button>
                <button className="btn-danger btn-sm" onClick={() => handleDelete(slide)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 620 }}>
            <div className="modal-header">
              <h2>{editSlide ? "Modifier la slide" : "Nouvelle slide"}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">
                  Libellé de l'onglet *
                  <input name="tab_label" className="form-input" value={form.tab_label} onChange={handleChange} placeholder="Développement" required />
                </label>
                <label className="form-label">
                  Tag / badge
                  <input name="tag" className="form-input" value={form.tag} onChange={handleChange} placeholder="Développement" />
                </label>
              </div>

              <label className="form-label">
                Titre *
                <textarea name="headline" className="form-input" rows={2} value={form.headline} onChange={handleChange} placeholder={"Du code qui fait\nla"} required />
              </label>
              <label className="form-label">
                Fin du titre en accent (rouge italique)
                <input name="headline_highlight" className="form-input" value={form.headline_highlight} onChange={handleChange} placeholder="différence." />
              </label>
              <label className="form-label">
                Sous-titre
                <textarea name="subtitle" className="form-input" rows={2} value={form.subtitle} onChange={handleChange} />
              </label>
              <label className="form-label">
                Points clés (un par ligne)
                <textarea name="bullets" className="form-input" rows={3} value={form.bullets} onChange={handleChange} placeholder={"Développement web & mobile\nConseil & accompagnement digital"} />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">
                  Bouton principal — texte
                  <input name="cta_primary_label" className="form-input" value={form.cta_primary_label} onChange={handleChange} />
                </label>
                <label className="form-label">
                  Bouton principal — lien
                  <input name="cta_primary_link" className="form-input" value={form.cta_primary_link} onChange={handleChange} />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">
                  Bouton secondaire — texte
                  <input name="cta_secondary_label" className="form-input" value={form.cta_secondary_label} onChange={handleChange} placeholder="Nos services" />
                </label>
                <label className="form-label">
                  Bouton secondaire — lien
                  <input name="cta_secondary_link" className="form-input" value={form.cta_secondary_link} onChange={handleChange} placeholder="#services" />
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
                  {saving ? "Enregistrement…" : editSlide ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer la slide"
        message={`Supprimer la slide "${deleteTarget?.tab_label}" ? Cette action est définitive.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <style>{`
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
