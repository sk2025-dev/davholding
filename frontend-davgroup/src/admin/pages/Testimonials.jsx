import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../utils/api";
import { useAdmin } from "../hooks/useAdmin";

const EMPTY = { client_name: "", content: "", rating: 5, service: "", source: "", source_url: "", sort_order: 0, is_active: false, photo: null };

export default function Testimonials() {
  const { showToast } = useAdmin();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await adminApi.getTestimonials();
      setItems(response?.data || []);
    } catch (error) {
      showToast(error.message, 3000);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const edit = (item) => {
    setEditing(item);
    setForm({ ...EMPTY, ...item, photo: null });
    setOpen(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") data.append(key, key === "is_active" ? (value ? "1" : "0") : value);
    });
    try {
      if (editing) await adminApi.updateTestimonial(editing.id, data);
      else await adminApi.createTestimonial(data);
      showToast(editing ? "Témoignage modifié." : "Témoignage ajouté.", 2500);
      setOpen(false); setEditing(null); setForm(EMPTY); await load();
    } catch (error) {
      showToast(error.message, 3000);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Supprimer définitivement ce témoignage ?")) return;
    await adminApi.deleteTestimonial(id);
    await load();
  };

  return (
    <div className="panel-wrap">
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Témoignages clients</h1>
          <p className="panel-subtitle">Publiez uniquement des avis authentiques et vérifiables.</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditing(null); setForm(EMPTY); setOpen(true); }}>+ Ajouter</button>
      </div>

      <div className="promo-slides-grid">
        {items.map((item) => (
          <article className={`promo-slide-card${!item.is_active ? " promo-slide-card--inactive" : ""}`} key={item.id}>
            <div className="promo-slide-body">
              <p className="promo-slide-order">{item.rating ? "★".repeat(item.rating) : "Sans note"}</p>
              <h3>{item.client_name}</h3>
              <p className="promo-slide-desc">“{item.content}”</p>
              <p className="promo-slide-sub">{[item.service, item.source].filter(Boolean).join(" · ")}</p>
              <span className={`promo-slide-status ${item.is_active ? "status--active" : "status--inactive"}`}>
                {item.is_active ? "Publié" : "Brouillon"}
              </span>
            </div>
            <div className="promo-slide-actions">
              <button className="btn-ghost btn-sm" onClick={() => edit(item)}>Modifier</button>
              <button className="btn-danger btn-sm" onClick={() => remove(item.id)}>Supprimer</button>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="modal-overlay open" onClick={(event) => event.target === event.currentTarget && setOpen(false)}>
          <div className="modal-box" style={{ maxWidth: 620 }}>
            <div className="modal-header"><h2>{editing ? "Modifier" : "Nouveau témoignage"}</h2><button className="modal-close" onClick={() => setOpen(false)}>✕</button></div>
            <form className="modal-form" onSubmit={submit}>
              <label className="form-label">Nom ou initiales *<input className="form-input" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></label>
              <label className="form-label">Témoignage *<textarea className="form-input" rows="5" required maxLength="1500" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">Note<select className="form-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>{[5,4,3,2,1].map(n => <option key={n} value={n}>{n}/5</option>)}</select></label>
                <label className="form-label">Prestation<input className="form-input" value={form.service || ""} onChange={(e) => setForm({ ...form, service: e.target.value })} /></label>
                <label className="form-label">Source<input className="form-input" placeholder="Google, Facebook…" value={form.source || ""} onChange={(e) => setForm({ ...form, source: e.target.value })} /></label>
                <label className="form-label">Lien de la source<input className="form-input" type="url" value={form.source_url || ""} onChange={(e) => setForm({ ...form, source_url: e.target.value })} /></label>
                <label className="form-label">Ordre<input className="form-input" type="number" min="0" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></label>
                <label className="form-label">Photo facultative<input className="form-input" type="file" accept="image/*" onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} /></label>
              </div>
              <label className="form-label"><span><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Publier sur le site</span></label>
              <div className="modal-footer"><button className="btn-primary" type="submit">Enregistrer</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
