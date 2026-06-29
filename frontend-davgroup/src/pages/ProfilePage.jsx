import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientAuth } from "../context/ClientAuthContext";
import BeauteLayout from "../components/Beaute/BeauteLayout";
import "../styles/ProfilePage.css";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function authHeaders() {
  const token = localStorage.getItem("dav_client_token");
  return { Authorization: `Bearer ${token}`, Accept: "application/json", "Content-Type": "application/json" };
}

const STATUS_ORDER = {
  pending:    { label: "En attente",  color: "#b07010", bg: "rgba(224,144,32,.1)" },
  confirmed:  { label: "Confirmée",   color: "#1a7a3e", bg: "rgba(46,170,94,.1)"  },
  processing: { label: "En cours",    color: "#1d4ed8", bg: "rgba(59,130,246,.1)" },
  shipped:    { label: "Expédiée",    color: "#6d28d9", bg: "rgba(109,40,217,.1)" },
  delivered:  { label: "Livrée",      color: "#1a7a3e", bg: "rgba(46,170,94,.15)" },
  cancelled:  { label: "Annulée",     color: "#c41420", bg: "rgba(196,20,32,.1)"  },
};

const STATUS_RDV = {
  pending:   { label: "En attente",  color: "#b07010", bg: "rgba(224,144,32,.1)" },
  confirmed: { label: "Confirmé",    color: "#1a7a3e", bg: "rgba(46,170,94,.1)"  },
  completed: { label: "Terminé",     color: "#6d28d9", bg: "rgba(109,40,217,.1)" },
  cancelled: { label: "Annulé",      color: "#c41420", bg: "rgba(196,20,32,.1)"  },
};

function StatusBadge({ status, map }) {
  const s = map[status] || { label: status, color: "#888", bg: "rgba(0,0,0,.06)" };
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Onglet Profil                                                     */
/* ══════════════════════════════════════════════════════════════════ */
function TabProfil({ user, onUpdated }) {
  const [form, setForm]     = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [pwForm, setPwForm] = useState({ current_password: "", password: "", password_confirmation: "" });
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [msg, setMsg]       = useState(null);
  const [pwMsg, setPwMsg]   = useState(null);

  const initials = (user?.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg(null);
    try {
      const res = await fetch(`${API}/user/profile`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur");
      localStorage.setItem("dav_client_user", JSON.stringify(data.user));
      onUpdated(data.user);
      setMsg({ type: "ok", text: "Profil mis à jour avec succès." });
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    } finally { setSaving(false); }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwSaving(true); setPwMsg(null);
    try {
      const res = await fetch(`${API}/user/password`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(pwForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur");
      setPwMsg({ type: "ok", text: data.message });
      setPwForm({ current_password: "", password: "", password_confirmation: "" });
    } catch (err) {
      setPwMsg({ type: "err", text: err.message });
    } finally { setPwSaving(false); }
  };

  return (
    <div className="prof-tab-content">
      {/* Avatar */}
      <div className="prof-avatar-row">
        <div className="prof-avatar">{initials}</div>
        <div>
          <div className="prof-avatar-name">{user?.name}</div>
          <div className="prof-avatar-email">{user?.email}</div>
        </div>
      </div>

      {/* Infos personnelles */}
      <div className="prof-card">
        <div className="prof-card-title">Informations personnelles</div>
        <form onSubmit={saveProfile} className="prof-form">
          <div className="prof-form-row">
            <div className="prof-field">
              <label>Nom complet</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="prof-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
          </div>
          <div className="prof-field" style={{ maxWidth: 280 }}>
            <label>Téléphone <span className="prof-optional">(optionnel)</span></label>
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} maxLength={10} placeholder="0757249390" />
          </div>
          {msg && <div className={`prof-alert prof-alert--${msg.type}`}>{msg.text}</div>}
          <button type="submit" className="prof-btn" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>
      </div>

      {/* Changer mot de passe */}
      <div className="prof-card">
        <div className="prof-card-title">Changer le mot de passe</div>
        <form onSubmit={savePassword} className="prof-form">
          <div className="prof-field">
            <label>Mot de passe actuel</label>
            <input type="password" value={pwForm.current_password} onChange={e => setPwForm(f => ({ ...f, current_password: e.target.value }))} required />
          </div>
          <div className="prof-form-row">
            <div className="prof-field">
              <label>Nouveau mot de passe</label>
              <input type="password" value={pwForm.password} onChange={e => setPwForm(f => ({ ...f, password: e.target.value }))} required minLength={8} />
            </div>
            <div className="prof-field">
              <label>Confirmer</label>
              <input type="password" value={pwForm.password_confirmation} onChange={e => setPwForm(f => ({ ...f, password_confirmation: e.target.value }))} required />
            </div>
          </div>
          {pwMsg && <div className={`prof-alert prof-alert--${pwMsg.type}`}>{pwMsg.text}</div>}
          <button type="submit" className="prof-btn" disabled={pwSaving}>
            {pwSaving ? "Mise à jour…" : "Mettre à jour"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Onglet Commandes                                                  */
/* ══════════════════════════════════════════════════════════════════ */
const PER_PAGE_ORDERS = 5;

function TabCommandes() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [page, setPage]       = useState(1);

  useEffect(() => {
    fetch(`${API}/orders/my`, { headers: authHeaders() })
      .then(r => r.json())
      .then(d => setOrders(d?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="prof-loading">Chargement…</div>;

  if (orders.length === 0) return (
    <div className="prof-empty">
      <span>🛍️</span>
      <p>Aucune commande pour le moment.</p>
    </div>
  );

  const totalPages = Math.max(1, Math.ceil(orders.length / PER_PAGE_ORDERS));
  const safePage   = Math.min(page, totalPages);
  const paged      = orders.slice((safePage - 1) * PER_PAGE_ORDERS, safePage * PER_PAGE_ORDERS);

  const goTo = (n) => { setPage(n); setExpanded(null); };

  return (
    <div className="prof-tab-content">
      <div className="prof-list">
        {paged.map(order => (
          <div key={order.id} className="prof-list-item">
            <div className="prof-list-header" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
              <div className="prof-list-left">
                <span className="prof-order-num">{order.order_number}</span>
                <span className="prof-list-date">{formatDate(order.created_at)}</span>
              </div>
              <div className="prof-list-right">
                <StatusBadge status={order.status} map={STATUS_ORDER} />
                <span className="prof-order-total">{Number(order.total).toLocaleString("fr-FR")} FCFA</span>
                <span className="prof-chevron">{expanded === order.id ? "▲" : "▼"}</span>
              </div>
            </div>

            {expanded === order.id && (
              <div className="prof-list-body">
                <div className="prof-order-meta">
                  <div><span>Livraison</span> {order.shipping_address || "—"}</div>
                  <div><span>Paiement</span> {order.payment_status === "paid" ? "✅ Payé" : "⏳ En attente"}</div>
                  <div><span>Méthode</span> {order.payment_method === "cash_on_delivery" ? "Paiement à la livraison" : order.payment_method}</div>
                </div>
                {order.items?.length > 0 && (
                  <table className="prof-order-table">
                    <thead>
                      <tr><th>Produit</th><th>Qté</th><th>Prix unit.</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>{Number(item.unitPrice).toLocaleString("fr-FR")} FCFA</td>
                          <td>{Number(item.unitPrice * item.quantity).toLocaleString("fr-FR")} FCFA</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" style={{ textAlign: "right", fontWeight: 700 }}>Total</td>
                        <td style={{ fontWeight: 700, color: "#c41420" }}>{Number(order.total).toLocaleString("fr-FR")} FCFA</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="prof-pagination">
          <button className="prof-pag-btn" onClick={() => goTo(safePage - 1)} disabled={safePage === 1}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={`prof-pag-btn${n === safePage ? " prof-pag-btn--active" : ""}`}
              onClick={() => goTo(n)}
            >{n}</button>
          ))}
          <button className="prof-pag-btn" onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages}>›</button>
          <span className="prof-pag-info">{orders.length} commande{orders.length > 1 ? "s" : ""}</span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Onglet Rendez-vous                                                */
/* ══════════════════════════════════════════════════════════════════ */
const PER_PAGE_RDVS = 5;

function TabRdvs() {
  const [rdvs, setRdvs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);

  useEffect(() => {
    fetch(`${API}/rdv/my`, { headers: authHeaders() })
      .then(r => r.json())
      .then(d => setRdvs(d?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="prof-loading">Chargement…</div>;

  if (rdvs.length === 0) return (
    <div className="prof-empty">
      <span>📅</span>
      <p>Aucun rendez-vous pour le moment.</p>
    </div>
  );

  const totalPages = Math.max(1, Math.ceil(rdvs.length / PER_PAGE_RDVS));
  const safePage   = Math.min(page, totalPages);
  const paged      = rdvs.slice((safePage - 1) * PER_PAGE_RDVS, safePage * PER_PAGE_RDVS);

  return (
    <div className="prof-tab-content">
      <div className="prof-list">
        {paged.map(rdv => (
          <div key={rdv.id} className="prof-list-item">
            <div className="prof-list-header" style={{ cursor: "default" }}>
              <div className="prof-list-left">
                <span className="prof-order-num">#{String(rdv.id).padStart(5, "0")}</span>
                <span className="prof-rdv-service">{rdv.service}</span>
              </div>
              <div className="prof-list-right">
                <StatusBadge status={rdv.status} map={STATUS_RDV} />
                <span className="prof-list-date">{formatDateTime(rdv.appointment_date)}</span>
              </div>
            </div>
            <div className="prof-rdv-meta">
              <span>👤 {rdv.client_name}</span>
              <span>📞 {rdv.client_phone}</span>
              <span>💰 Avance : {Number(rdv.deposit_amount || 5000).toLocaleString("fr-FR")} FCFA — {rdv.payment_status === "paid" ? "✅ Payée" : "⏳ En attente"}</span>
              {rdv.notes && <span>📝 {rdv.notes}</span>}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="prof-pagination">
          <button className="prof-pag-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={`prof-pag-btn${n === safePage ? " prof-pag-btn--active" : ""}`}
              onClick={() => setPage(n)}
            >{n}</button>
          ))}
          <button className="prof-pag-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}>›</button>
          <span className="prof-pag-info">{rdvs.length} rendez-vous</span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Page principale                                                   */
/* ══════════════════════════════════════════════════════════════════ */
const STEPS = [
  { key: "profil",    label: "Mon profil",      icon: "👤" },
  { key: "commandes", label: "Mes commandes",   icon: "🛍️" },
  { key: "rdvs",      label: "Mes rendez-vous", icon: "📅" },
];

export default function ProfilePage() {
  const { user, logout, requireAuth } = useClientAuth();
  const navigate = useNavigate();
  const [tab, setTab]         = useState("profil");
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (!user) {
      requireAuth(() => {});
      navigate("/beaute/cosmetiques", { replace: true });
    }
  }, [user]);

  if (!user) return null;

  const activeIndex = STEPS.findIndex(s => s.key === tab);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <BeauteLayout>
      <section className="prof-page">
        <div className="prof-hero">
          <div className="prof-hero-inner">
            <h1 className="prof-hero-title">Mon espace</h1>
            <p className="prof-hero-sub">{user.name}</p>
          </div>
          <button className="prof-logout-hero" onClick={handleLogout}>⎋ Déconnexion</button>
        </div>

        <div className="prof-shell">
          {/* Stepper */}
          <div className="prof-stepper">
            {STEPS.map((s, i) => {
              const isActive = tab === s.key;
              const isDone   = i < activeIndex;
              return (
                <button
                  key={s.key}
                  className={`prof-step${isActive ? " prof-step--active" : ""}${isDone ? " prof-step--done" : ""}`}
                  onClick={() => setTab(s.key)}
                >
                  <span className="prof-step-bubble">
                    {isDone ? "✓" : i + 1}
                  </span>
                  <div className="prof-step-label">
                    <span className="prof-step-num">Étape {i + 1}</span>
                    <span className="prof-step-name">{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <span className="prof-step-line" />}
                </button>
              );
            })}
          </div>

          {/* Contenu */}
          <div className="prof-main">
            {tab === "profil"    && <TabProfil user={currentUser} onUpdated={setCurrentUser} />}
            {tab === "commandes" && <TabCommandes />}
            {tab === "rdvs"      && <TabRdvs />}
          </div>
        </div>
      </section>
    </BeauteLayout>
  );
}
