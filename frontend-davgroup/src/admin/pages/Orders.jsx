import { useEffect, useState, useMemo } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const STATUS_MAP = {
  pending:   { label: "En attente", cls: "s-pending" },
  confirmed: { label: "Confirmée",  cls: "s-confirmed" },
  cancelled: { label: "Annulée",    cls: "s-cancelled" },
};

const PAY_METHOD = {
  paydunya:         "PayDunya",
  cash_on_delivery: "Paiement à la livraison",
  mobile:           "Mobile Money",
  card:             "Carte bancaire",
};

const PAY_STATUS = {
  pending:  { label: "Non payé",  color: "#b07010" },
  paid:     { label: "Payé",      color: "#1a7a3e" },
  failed:   { label: "Échoué",    color: "#c41420" },
  refunded: { label: "Remboursé", color: "#555" },
};

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }) : "—";

const fmtPrice = (n) => Number(n || 0).toLocaleString("fr-FR") + " FCFA";

/* ── Modal détail ── */
function OrderDetailModal({ order, onClose, onConfirm, onCancel }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    adminApi.getOrder(order.id)
      .then(d => setItems(d?.items || []))
      .catch(() => {});
  }, [order.id]);

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-head">
          <div className="modal-head-title">Commande {order.order_number}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Statuts */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span className={`status-badge ${STATUS_MAP[order.status]?.cls || ""}`}>
              {STATUS_MAP[order.status]?.label || order.status}
            </span>
            {order.payment_status && (
              <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 100, background: "rgba(10,10,12,.06)", color: PAY_STATUS[order.payment_status]?.color, fontWeight: 700 }}>
                {PAY_STATUS[order.payment_status]?.label}
              </span>
            )}
            <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 100, background: "rgba(10,10,12,.06)", color: "var(--ink-s)", fontWeight: 600 }}>
              {PAY_METHOD[order.payment_method] || order.payment_method}
            </span>
          </div>

          {/* Client */}
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

          {/* Date */}
          <div style={{ fontSize: 12, color: "var(--ink-m)" }}>
            Passée le {fmtDate(order.created_at)}
          </div>

          {/* Action — uniquement si en attente */}
          {order.status === "pending" && (
            <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
              <button
                className="action-btn ab-confirm"
                style={{ flex: 1 }}
                onClick={() => { onConfirm(order.id); onClose(); }}
              >
                ✓ Confirmer la commande
              </button>
              <button
                className="action-btn ab-cancel"
                onClick={() => { onCancel(order.id); onClose(); }}
              >
                ✕ Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
const PER_PAGE = 8;

const Orders = () => {
  const { showToast } = useAdmin();
  const [orders, setOrders]     = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage]         = useState(1);
  const [syncing, setSyncing]   = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders();
      setOrders(res?.data || []);
    } catch {
      showToast("⚠ Impossible de charger les commandes", 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/sync-pending`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
      });
      const data = await res.json();
      showToast(`✓ ${data.updated} paiement(s) mis à jour sur ${data.checked} vérifiés`);
      loadOrders();
    } catch {
      showToast("⚠ Erreur lors de la synchronisation", 3000);
    } finally {
      setSyncing(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await adminApi.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? res.data : o));
      showToast(status === "confirmed" ? "✓ Commande confirmée" : "✓ Commande annulée");
    } catch {
      showToast("⚠ Erreur mise à jour", 3000);
    }
  };

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

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [filter, search]);

  const counts = {
    all:       orders.length,
    pending:   orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  const TABS = [
    { key: "all",       label: "Toutes" },
    { key: "pending",   label: "En attente" },
    { key: "confirmed", label: "Confirmées" },
    { key: "cancelled", label: "Annulées" },
  ];

  return (
    <div className="panel active">
      <div className="section-head">
        <div>
          <div className="section-head-title">Gestion des commandes</div>
          <div className="section-head-sub">{orders.length} commande(s) au total</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="action-btn ab-primary" onClick={loadOrders} style={{ padding: "8px 18px", fontSize: 13 }}>
            ↻ Actualiser
          </button>
          <button
            className="action-btn ab-primary"
            onClick={handleSync}
            disabled={syncing}
            style={{ padding: "8px 18px", fontSize: 13, background: "rgba(26,74,204,.1)", color: "#1a4acc", border: "1px solid rgba(26,74,204,.2)" }}
          >
            {syncing ? "Synchronisation…" : "⟳ Sync PayDunya"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="ord-stats">
        {[
          {
            label: "Total", value: counts.all, color: "#c41420",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
          },
          {
            label: "En attente", value: counts.pending, color: "#b07010", urgent: counts.pending > 0,
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
          },
          {
            label: "Confirmées", value: counts.confirmed, color: "#1a7a3e",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
          },
          {
            label: "Annulées", value: counts.cancelled, color: "#888",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
          },
        ].map(s => (
          <div key={s.label} className={`ord-stat-card${s.urgent ? " ord-stat-card--urgent" : ""}`}>
            <div className="ord-stat-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="ord-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="ord-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-filters">
          {TABS.map(t => (
            <button key={t.key} className={`tf-tab ${filter === t.key ? "tf-active" : ""}`}
              onClick={() => setFilter(t.key)}>
              {t.label}
              {counts[t.key] > 0 && (
                <span style={{ marginLeft: 5, fontSize: 10, background: filter === t.key ? "rgba(255,255,255,.3)" : "rgba(10,10,12,.08)", borderRadius: 100, padding: "1px 6px", fontWeight: 700 }}>
                  {counts[t.key]}
                </span>
              )}
            </button>
          ))}
          <input
            type="text"
            className="tf-search"
            placeholder="🔍 Référence, client, téléphone…"
            value={search}
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />
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
              ) : paginated.length === 0 ? (
                <tr><td colSpan="7" className="empty-row">Aucune commande trouvée</td></tr>
              ) : (
                paginated.map(o => (
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
                      <div className="ord-actions">
                        {/* Voir le détail — toujours disponible */}
                        <button className="ord-btn ord-btn--view" title="Voir le détail" onClick={() => setSelected(o)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          Voir
                        </button>

                        {/* Confirmer — uniquement si en attente */}
                        {o.status === "pending" && (
                          <button
                            className="ord-btn ord-btn--confirm"
                            title="Confirmer la commande"
                            onClick={() => handleStatusChange(o.id, "confirmed")}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </button>
                        )}

                        {/* Annuler — uniquement si en attente */}
                        {o.status === "pending" && (
                          <button
                            className="ord-btn ord-btn--cancel"
                            title="Annuler la commande"
                            onClick={() => handleStatusChange(o.id, "cancelled")}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="ord-pagination">
            <span className="ord-pag-info">
              {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} sur {filtered.length}
            </span>
            <div className="ord-pag-btns">
              <button className="ord-pag-btn" disabled={page === 1} onClick={() => setPage(1)}>«</button>
              <button className="ord-pag-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…"
                    ? <span key={`dots-${i}`} className="ord-pag-dots">…</span>
                    : <button key={p} className={`ord-pag-btn${page === p ? " ord-pag-btn--active" : ""}`} onClick={() => setPage(p)}>{p}</button>
                )
              }
              <button className="ord-pag-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
              <button className="ord-pag-btn" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <OrderDetailModal
          order={selected}
          onClose={() => setSelected(null)}
          onConfirm={(id) => handleStatusChange(id, "confirmed")}
          onCancel={(id) => handleStatusChange(id, "cancelled")}
        />
      )}
    </div>
  );
};

export default Orders;
