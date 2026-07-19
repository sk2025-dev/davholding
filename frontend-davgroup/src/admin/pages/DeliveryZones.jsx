import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../utils/api";
import { useAdmin } from "../hooks/useAdmin";
import ConfirmModal from "../components/ConfirmModal";

const EMPTY_FORM = { name: "", fee: "", sort_order: 0, is_active: true };

export default function DeliveryZones() {
  const { showToast } = useAdmin();
  const [zones, setZones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editZone, setEditZone] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getDeliveryZones();
      setZones(res?.data || []);
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditZone(null);
    setForm({ ...EMPTY_FORM, sort_order: zones.length });
    setModalOpen(true);
  };

  const openEdit = (zone) => {
    setEditZone(zone);
    setForm({
      name: zone.name,
      fee: zone.fee,
      sort_order: zone.sort_order,
      is_active: zone.is_active,
    });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditZone(null); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        fee: Number(form.fee),
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      };
      if (editZone) {
        await adminApi.updateDeliveryZone(editZone.id, payload);
        showToast("Commune mise à jour.", 2500);
      } else {
        await adminApi.createDeliveryZone(payload);
        showToast("Commune ajoutée.", 2500);
      }
      closeModal();
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (zone) => setDeleteTarget(zone);

  const confirmDelete = async () => {
    const zone = deleteTarget;
    setDeleteTarget(null);
    try {
      await adminApi.deleteDeliveryZone(zone.id);
      showToast("Commune supprimée.", 2500);
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    }
  };

  const toggleActive = async (zone) => {
    try {
      await adminApi.updateDeliveryZone(zone.id, { is_active: !zone.is_active });
      await load();
    } catch (err) {
      showToast(err.message, 3000);
    }
  };

  return (
    <div className="panel-wrap">
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Communes de livraison</h1>
          <p className="panel-subtitle">Gérez les villes/communes et leurs tarifs de livraison</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Ajouter une commune</button>
      </div>

      {isLoading ? (
        <div className="loading-state">Chargement…</div>
      ) : zones.length === 0 ? (
        <div className="empty-state">
          <p>Aucune commune pour le moment.</p>
          <button className="btn-primary" onClick={openAdd}>Ajouter la première</button>
        </div>
      ) : (
        <div className="dz-table-wrap">
          <table className="dz-table">
            <thead>
              <tr>
                <th>Commune</th>
                <th>Tarif (FCFA)</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id} className={!zone.is_active ? "dz-row--inactive" : ""}>
                  <td>{zone.name}</td>
                  <td>{Number(zone.fee).toLocaleString("fr-FR")}</td>
                  <td>
                    <span className={`status--pill ${zone.is_active ? "status--active" : "status--inactive"}`}>
                      {zone.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="dz-actions">
                    <button className="btn-ghost btn-sm" onClick={() => toggleActive(zone)}>
                      {zone.is_active ? "Désactiver" : "Activer"}
                    </button>
                    <button className="btn-ghost btn-sm" onClick={() => openEdit(zone)}>Modifier</button>
                    <button className="btn-danger btn-sm" onClick={() => handleDelete(zone)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 440 }}>
            <div className="modal-header">
              <h2>{editZone ? "Modifier la commune" : "Nouvelle commune"}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="form-label">
                Nom de la commune *
                <input name="name" className="form-input" value={form.name} onChange={handleChange} placeholder="Cocody" required />
              </label>
              <label className="form-label">
                Tarif de livraison (FCFA) *
                <input name="fee" type="number" min="0" step="1" className="form-input" value={form.fee} onChange={handleChange} required />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="form-label">
                  Ordre d'affichage
                  <input name="sort_order" type="number" min="0" className="form-input" value={form.sort_order} onChange={handleChange} />
                </label>
                <label className="form-label" style={{ justifyContent: "center" }}>
                  <span>Actif</span>
                  <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} style={{ width: 20, height: 20, marginTop: 8 }} />
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={closeModal}>Annuler</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Enregistrement…" : editZone ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer la commune"
        message={`Supprimer "${deleteTarget?.name}" ? Cette action est définitive.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <style>{`
        .dz-table-wrap {
          margin-top: 24px;
          overflow-x: auto;
          border: 1px solid var(--border, #e5e4e7);
          border-radius: 12px;
        }
        .dz-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .dz-table th {
          text-align: left;
          padding: 12px 16px;
          background: var(--card-bg-alt, #f7f7f8);
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #888;
        }
        .dz-table td {
          padding: 12px 16px;
          border-top: 1px solid var(--border, #e5e4e7);
        }
        .dz-row--inactive { opacity: .55; }
        .dz-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .status--pill {
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }
        .status--active { background: #dcfce7; color: #166534; }
        .status--inactive { background: #f3f4f6; color: #6b7280; }
        .btn-sm { padding: 5px 10px; font-size: 12px; }
      `}</style>
    </div>
  );
}
