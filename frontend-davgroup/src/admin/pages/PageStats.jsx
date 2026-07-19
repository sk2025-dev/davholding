import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../utils/api";
import { useAdmin } from "../hooks/useAdmin";

export default function PageStats() {
  const { showToast } = useAdmin();
  const [items, setItems] = useState([]);
  const load = useCallback(async () => {
    try {
      const response = await adminApi.getPageStats();
      setItems(response?.data || []);
    } catch (error) { showToast(error.message, 3000); }
  }, [showToast]);
  useEffect(() => { load(); }, [load]);

  return (
    <div className="panel-wrap">
      <div className="panel-header"><div><h1 className="panel-title">Vues & partages</h1><p className="panel-subtitle">Statistiques agrégées des pages publiques, sans données personnelles.</p></div><button className="btn-primary" onClick={load}>Actualiser</button></div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Page</th><th>Vues</th><th>Partages</th><th>Captures</th><th>Dernière activité</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.title || item.path}</strong><br/><small>{item.path}</small></td><td>{item.view_count}</td><td>{item.share_count}</td><td>{item.capture_count}</td><td>{item.last_activity_at ? new Date(item.last_activity_at).toLocaleString("fr-FR") : "—"}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
