import { useEffect, useState, useMemo } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const STATUS_MAP = {
  pending:    { label: "En attente",  cls: "s-pending" },
  confirmed:  { label: "Confirmée",   cls: "s-confirmed" },
  processing: { label: "En cours",    cls: "s-confirmed" },
  shipped:    { label: "Expédiée",    cls: "s-shipped" },
  delivered:  { label: "Livrée",      cls: "s-delivered" },
  cancelled:  { label: "Annulée",     cls: "s-cancelled" },
};

const PAY_METHOD = {
  paydunya:         "PayDunya",
  cash_on_delivery: "Paiement livraison",
  mobile:           "Mobile Money",
  card:             "Carte bancaire",
};

const PAY_STATUS = {
  pending:   { label: "Non payé",  color: "#b07010" },
  paid:      { label: "Payé",      color: "#1a7a3e" },
  failed:    { label: "Échoué",    color: "#c41420" },
  refunded:  { label: "Remboursé", color: "#555" },
};

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const fmtPrice = (n) =>
  Number(n || 0).toLocaleString("fr-FR") + " FCFA";

/* ── Modal détail ── */
function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    adminApi.getOrder(order.id)
      .then(d => setItems(d?.items || []))
      .catch(() => {});
  }, [order.id]);

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-head-title">Commande {order.order_number}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Infos client */}
          <div style={{ background: "rgba(10,10,12,.03)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-m)", marginBottom: 10 }}>Client</div>
            <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 4 }}>
              <span><strong>{order.client_name}</strong></span>
              {order.client_email && <span style={{ color: "var(--ink-m)" }}>{order.client_email}</span>}
              {order.client_phone && <span style={{ color: "var(--ink-m)" }}>{order.client_phone}</span>}
              {order.shipping_address && <span style={{ color: "var(--ink-m)" }}>📍 {order.shipping_address}</span>}
            </div>
          </div>

          {/* Articles */}
          {items.length > 0 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-m)", marginBottom: 10 }}>Articles</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {items.map((it, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "8px 12px", background: "#fff", borderRadius: 10, border: "1px solid var(--border)" }}>
                    <span>{it.title} <span style={{ color: "var(--ink-m)" }}>× {it.quantity}</span></span>
                    <strong>{fmtPrice(it.unitPrice * it.quantity)}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totaux */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--ink-m)" }}>Sous-total</span>
              <span>{fmtPrice(order.subtotal)}</span>
            </div>
            {Number(order.shipping) > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--ink-m)" }}>Livraison</span>
                <span>{fmtPrice(order.shipping)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, borderTop: "1px solid var(--border)", paddingTop: 8 }}>
              <span>Total</span>
              <span style={{ color: "var(--red)" }}>{fmtPrice(order.total)}</span>
            </div>
          </div>

          {/* Paiement */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 100, background: "rgba(10,10,12,.06)", color: "var(--ink-s)", fontWeight: 600 }}>
              {PAY_METHOD[order.payment_method] || order.payment_method}
            </span>
            {order.payment_status && (
              <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 100, background: "rgba(10,10,12,.06)", color: PAY_STATUS[order.payment_status]?.color || "var(--ink-s)", fontWeight: 700 }}>
                {PAY_STATUS[order.payment_status]?.label || order.payment_status}
              </span>
            )}
          </div>

          {/* Actions statut */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {order.status === "pending" && order.payment_status !== "paid" && (
              <button className="action-btn ab-confirm" onClick={() => onStatusChange(order.id, "confirmed")}>✓ Confirmer</button>
            )}
            {order.status === "confirmed" && (
              <button className="action-btn ab-view" style={{ background: "rgba(42,92,255,.1)", color: "#1a4acc" }} onClick={() => onStatusChange(order.id, "shipped")}>📦 Expédier</button>
            )}
            {order.status === "shipped" && (
              <button className="action-btn ab-confirm" onClick={() => onStatusChange(order.id, "delivered")}>🏠 Livré</button>
            )}
            {!["cancelled", "delivered"].includes(order.status) && (
              <button className="action-btn ab-cancel" onClick={() => onStatusChange(order.id, "cancelled")}>✕ Annuler</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
const Orders = () => {
  const { showToast } = useAdmin();
  const [orders, setOrders]   = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState(null);

  const loadOrders = async (params = {}) => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders(params);
      setOrders(res?.data || []);
    } catch {
      showToast("⚠ Impossible de charger les commandes", 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const filtered = useMemo(() => {
    let r = orders;
    if (filter !== "all") r = r.filter(o => o.status === filter);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(o =>
        (o.order_number || "").toLowerCase().includes(q) ||
        (o.client_name  || "").toLowerCase().includes(q) ||
        (o.client_phone || "").toLowerCase().includes(q)
      );
    }
    return r;
  }, [orders, filter, search]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await adminApi.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? res.data : o));
      if (selected?.id === id) setSelected(res.data);
      showToast("✓ Statut mis à jour");
    } catch {
      showToast("⚠ Erreur mise à jour", 3000);
    }
  };

  const counts = {
    all:       orders.length,
    pending:   orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => ["confirmed","processing"].includes(o.status)).length,
    shipped:   orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  const TABS = [
    { key: "all",       label: "Toutes" },
    { key: "pending",   label: "En attente" },
    { key: "confirmed", label: "Confirmées" },
    { key: "shipped",   label: "Expédiées" },
    { key: "delivered", label: "Livrées" },
    { key: "cancelled", label: "Annulées" },
  ];

  return (
    <div className="panel active">
      <div className="section-head">
        <div>
          <div className="section-head-title">Gestion des commandes</div>
          <div className="section-head-sub">{orders.length} commande(s) au total</div>
        </div>
        <button className="action-btn ab-primary" onClick={() => loadOrders()} style={{ padding: "8px 18px", fontSize: 13 }}>
          ↻ Actualiser
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total",     value: counts.all,       color: "#c41420" },
          { label: "En attente",value: counts.pending,   color: "#b07010", urgent: counts.pending > 0 },
          { label: "Livrées",   value: counts.delivered, color: "#1a7a3e" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: `1px solid ${s.urgent ? "rgba(224,144,32,.35)" : "rgba(10,10,12,.07)"}`, boxShadow: s.urgent ? "0 0 0 3px rgba(224,144,32,.1)" : "none" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: s.color, fontFamily: "'Fraunces',serif" }}>{s.value}</div>
            <div style={{ fontSize: 11.5, color: "rgba(10,10,12,.45)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-filters">
          {TABS.map(t => (
            <button key={t.key} className={`tf-tab ${filter === t.key ? "tf-active" : ""}`}
              onClick={() => setFilter(t.key)}>
              {t.label}
              {counts[t.key] > 0 && <span style={{ marginLeft: 5, fontSize: 10, background: filter === t.key ? "rgba(255,255,255,.3)" : "rgba(10,10,12,.08)", borderRadius: 100, padding: "1px 6px", fontWeight: 700 }}>{counts[t.key]}</span>}
            </button>
          ))}
          <input type="text" className="tf-search" placeholder="🔍 Référence, client, téléphone…"
            value={search} onChange={e => setSearch(e.target.value.toLowerCase())} />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Date</th>
                <th>Client</th>
                <th>Montant</th>
                <th>Paiement</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="7" className="empty-row">Chargement…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="7" className="empty-row">Aucune commande trouvée</td></tr>
              ) : (
                filtered.map(o => (
                  <tr key={o.id}>
                    <td><div className="td-ref">{o.order_number}</div></td>
                    <td><div style={{ fontSize: 12.5 }}>{fmtDate(o.created_at)}</div></td>
                    <td>
                      <div className="td-name">{o.client_name}</div>
                      <div className="td-meta">{o.client_phone}</div>
                    </td>
                    <td><div className="td-price">{fmtPrice(o.total)}</div></td>
                    <td>
                      <div style={{ fontSize: 12.5 }}>{PAY_METHOD[o.payment_method] || o.payment_method}</div>
                      {o.payment_status && (
                        <div style={{ fontSize: 11, color: PAY_STATUS[o.payment_status]?.color, fontWeight: 600 }}>
                          {PAY_STATUS[o.payment_status]?.label}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${STATUS_MAP[o.status]?.cls || ""}`}>
                        {STATUS_MAP[o.status]?.label || o.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button className="action-btn ab-view" onClick={() => setSelected(o)}>👁 Voir</button>
                        {o.status === "pending" && o.payment_status !== "paid" && (
                          <button className="action-btn ab-confirm" onClick={() => handleStatusChange(o.id, "confirmed")}>✓</button>
                        )}
                        {o.status === "confirmed" && (
                          <button className="action-btn ab-view" style={{ background: "rgba(42,92,255,.1)", color: "#1a4acc" }} onClick={() => handleStatusChange(o.id, "shipped")}>📦</button>
                        )}
                        {o.status === "shipped" && (
                          <button className="action-btn ab-confirm" onClick={() => handleStatusChange(o.id, "delivered")}>🏠</button>
                        )}
                        {!["cancelled","delivered"].includes(o.status) && (
                          <button className="action-btn ab-cancel" onClick={() => handleStatusChange(o.id, "cancelled")}>✕</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <OrderDetailModal
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(id, status) => { handleStatusChange(id, status); setSelected(null); }}
        />
      )}
    </div>
  );
};

export default Orders;
