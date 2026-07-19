import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../utils/api";
import { useAdmin } from "../hooks/useAdmin";
import ConfirmModal from "../components/ConfirmModal";

const SECTIONS = [
  { key: "design", label: "Conception graphique", hint: "Section « Ce que nous faisons » — page Design" },
  { key: "it", label: "IT & Surveillance", hint: "Section « Installation & configuration de système de sécurité »" },
  { key: "mobile", label: "Développement mobile & web", hint: "Section « Applications web & mobile »" },
];

export default function ConsultingSectionImages() {
  const { showToast } = useAdmin();
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [previews, setPreviews] = useState({});
  const [resetTarget, setResetTarget] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getConsultingSectionImages();
      setImages(res?.data || {});
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleFileChange = (sectionKey, file) => {
    if (!file) return;
    setPreviews((p) => ({ ...p, [sectionKey]: URL.createObjectURL(file) }));
    handleUpload(sectionKey, file);
  };

  const handleUpload = async (sectionKey, file) => {
    setSavingKey(sectionKey);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await adminApi.updateConsultingSectionImage(sectionKey, fd);
      setImages((prev) => ({ ...prev, ...res.data }));
      showToast("Image mise à jour.", 2500);
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setSavingKey(null);
    }
  };

  const confirmReset = async () => {
    const sectionKey = resetTarget;
    setResetTarget(null);
    setSavingKey(sectionKey);
    try {
      const res = await adminApi.resetConsultingSectionImage(sectionKey);
      setImages((prev) => ({ ...prev, ...res.data }));
      setPreviews((p) => ({ ...p, [sectionKey]: null }));
      showToast("Image réinitialisée.", 2500);
    } catch (err) {
      showToast(err.message, 3000);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="panel-wrap">
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Photos des sections Consulting</h1>
          <p className="panel-subtitle">
            Remplacez les photos illustrant les sections « Ce que nous faisons » des pages Consulting
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">Chargement…</div>
      ) : (
        <div className="section-images-grid">
          {SECTIONS.map(({ key, label, hint }) => (
            <div key={key} className="section-image-card">
              <div className="section-image-preview">
                {previews[key] || images[key] ? (
                  <img src={previews[key] || images[key]} alt={label} />
                ) : (
                  <span className="promo-slide-no-img">Pas d'image</span>
                )}
              </div>
              <div className="section-image-body">
                <h3>{label}</h3>
                <p className="promo-slide-sub">{hint}</p>
                <div className="section-image-actions">
                  <label className="btn-ghost btn-sm section-image-upload">
                    {savingKey === key ? "Envoi…" : "Changer l'image"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={savingKey === key}
                      onChange={(e) => handleFileChange(key, e.target.files[0])}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn-danger btn-sm"
                    disabled={savingKey === key}
                    onClick={() => setResetTarget(key)}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!resetTarget}
        title="Réinitialiser l'image"
        message="Cette photo perso sera supprimée et remplacée par l'image d'origine. Continuer ?"
        onConfirm={confirmReset}
        onCancel={() => setResetTarget(null)}
      />

      <style>{`
        .section-images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        .section-image-card {
          border: 1px solid var(--border, #e5e4e7);
          border-radius: 12px;
          overflow: hidden;
          background: var(--card-bg, #fff);
        }
        .section-image-preview {
          aspect-ratio: 16/9;
          background: #f3e7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .section-image-preview img { width: 100%; height: 100%; object-fit: cover; }
        .section-image-body { padding: 14px 16px 16px; }
        .section-image-body h3 { font-size: 15px; font-weight: 600; margin: 0 0 4px; }
        .section-image-actions { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .section-image-upload { display: inline-block; cursor: pointer; }
      `}</style>
    </div>
  );
}
