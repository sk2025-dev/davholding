import { useState, useMemo, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAdmin } from "../hooks/useAdmin";
import RdvModal from "../components/modals/RdvModal";
import { MOCK_RDVS } from "../utils/constants";
import { adminApi } from "../utils/api";
import "../styles/admin.css";

const STATUS_MAP = {
  pending:   { label: "En attente", bg: "rgba(100,100,200,.08)", color: "#4040a0", dot: "#6060c0" },
  confirmed: { label: "Confirmé",   bg: "rgba(46,170,94,.1)",   color: "#1a7a3e", dot: "#2eaa5e" },
  completed: { label: "Terminé",    bg: "rgba(10,10,12,.07)",   color: "#555",    dot: "#999"    },
  cancelled: { label: "Annulé",     bg: "rgba(224,48,48,.08)",  color: "#c41420", dot: "#e03030" },
};

const CATEGORIES = {
  coiffure: { label: "Coiffure & Tressage", icon: "✂️",  color: "#6b21a8", bg: "rgba(107,33,168,.1)"  },
  ongerie:  { label: "Ongerie",             icon: "💅",  color: "#be185d", bg: "rgba(190,24,93,.1)"   },
  spa:      { label: "Spa & Soins",         icon: "🧖",  color: "#0f766e", bg: "rgba(15,118,110,.1)"  },
  conseil:  { label: "Conseil beauté",      icon: "✨",  color: "#b45309", bg: "rgba(180,83,9,.1)"    },
};

const PAY_LABELS = {
  mobile:   "Mobile Money",
  card:     "Carte bancaire",
  cash:     "Espèces",
  paydunya: "PayDunya",
};

function getInitial(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

function getDay(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00").getDate();
}

function getMonth(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00").toLocaleDateString("fr-FR", { month: "short" });
}

function formatDateFull(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00").toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long",
  });
}

/* ── Carte rendez-vous ── */
const RdvCard = ({ r, onView }) => {
  const status   = STATUS_MAP[r.status] || STATUS_MAP.pending;
  const category = CATEGORIES[r.category];

  return (
    <div
      style={{
        background: "#fff", borderRadius: 16,
        border: "1px solid rgba(10,10,12,.07)",
        boxShadow: "0 1px 6px rgba(0,0,0,.04)",
        display: "flex", alignItems: "stretch", overflow: "hidden",
        transition: "box-shadow .2s, transform .2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,.04)"; }}
    >
      {/* Bande gauche colorée selon statut */}
      <div style={{ width: 4, background: status.dot, flexShrink: 0 }} />

      {/* Bloc date / heure */}
      <div style={{
        width: 76, flexShrink: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "16px 8px",
        borderRight: "1px solid rgba(10,10,12,.06)", background: "rgba(10,10,12,.01)",
      }}>
        <div style={{
          width: 52, borderRadius: 12, overflow: "hidden",
          background: "linear-gradient(160deg, #c41420, #3d0510)",
          textAlign: "center", padding: "7px 0",
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Fraunces', serif" }}>
            {getDay(r.rdvDate)}
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.75)", textTransform: "uppercase", letterSpacing: ".07em", marginTop: 2 }}>
            {getMonth(r.rdvDate)}
          </div>
        </div>
        <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: "var(--ink-s)", letterSpacing: ".02em" }}>
          {r.slot || "—"}
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, padding: "14px 18px", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", minWidth: 0 }}>

        {/* Prestation */}
        <div style={{ minWidth: 180, flex: 2 }}>
          {category && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "2px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700,
              background: category.bg, color: category.color, marginBottom: 5,
            }}>
              {category.icon} {category.label}
            </span>
          )}
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)", lineHeight: 1.3 }}>
            {r.service}
          </div>
          {r.duration && (
            <div style={{ fontSize: 11, color: "var(--ink-m)", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {r.duration}
            </div>
          )}
          <div style={{ fontSize: 10.5, color: "var(--ink-m)", marginTop: 4 }}>
            {formatDateFull(r.rdvDate)}
          </div>
        </div>

        {/* Client */}
        <div style={{ minWidth: 150, flex: 2 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-m)", marginBottom: 6 }}>
            Client
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #c9a060, #a07840)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#fff",
            }}>
              {getInitial(r.client?.name)}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--ink)" }}>{r.client?.name || "—"}</div>
              <div style={{ fontSize: 11, color: "var(--ink-m)", marginTop: 1 }}>{r.client?.phone || "—"}</div>
              {r.client?.email && (
                <div style={{ fontSize: 10, color: "var(--ink-m)", marginTop: 1, opacity: .7 }}>{r.client.email}</div>
              )}
            </div>
          </div>
        </div>

        {/* Acompte */}
        {r.acompte > 0 && (
          <div style={{ minWidth: 110, flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-m)", marginBottom: 4 }}>
              Acompte
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1a7a3e" }}>
              {r.acompte.toLocaleString("fr-FR")} F
            </div>
            {r.payMethod && (
              <div style={{ fontSize: 10.5, color: "var(--ink-m)", marginTop: 2 }}>
                {PAY_LABELS[r.payMethod] || r.payMethod}
              </div>
            )}
          </div>
        )}

        {/* Statut */}
        <div style={{ minWidth: 110, flex: 1, textAlign: "right" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--red)", fontWeight: 600, marginBottom: 8 }}>
            {r.id}
          </div>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600,
            background: status.bg, color: status.color,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: status.dot, display: "inline-block" }} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Bouton Voir */}
      <div style={{
        padding: "14px 16px", display: "flex", alignItems: "center",
        borderLeft: "1px solid rgba(10,10,12,.06)", background: "rgba(10,10,12,.01)", flexShrink: 0,
      }}>
        <button
          onClick={() => onView(r)}
          style={{
            padding: "7px 16px", borderRadius: 8, border: "1.5px solid var(--border)",
            background: "transparent", fontSize: 12, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", color: "var(--ink-s)", whiteSpace: "nowrap",
            transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-s)"; }}
        >
          Voir
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
const Rdvs = () => {
  const { showToast, setNewRdvCount } = useAdmin();
  const [rdvs, setRdvs]           = useLocalStorage("dav_rdvs", MOCK_RDVS);
  const [filter, setFilter]       = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [selectedRdv, setSelectedRdv] = useState(null);

  const PER_PAGE = 4;

  useEffect(() => {
    adminApi.markRdvsNotified().then(() => setNewRdvCount(0)).catch(() => {});
  }, [setNewRdvCount]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res  = await adminApi.getRdvs();
        const data = res?.data || [];
        const mapped = data.map((r) => {
          const datePart = r.appointment_date ? r.appointment_date.slice(0, 10) : "";
          const timePart = r.appointment_date ? r.appointment_date.slice(11, 16) : "";
          return {
            id:       `#RDV-${r.id}`,
            rawId:    r.id,
            rdvDate:  datePart,
            slot:     timePart,
            service:  r.service  || "—",
            category: r.category || null,
            duration: r.duration
              ? parseInt(r.duration) >= 60
                ? `${Math.round(parseInt(r.duration) / 60)}h`
                : `${r.duration}m`
              : "",
            client:    { name: r.client_name, phone: r.client_phone, email: r.client_email },
            payMethod: r.payment_method || "",
            acompte:   r.deposit_amount || 0,
            svcPrice:  r.service_price  || null,
            status:    r.status || "pending",
            notes:     r.notes  || "",
          };
        });
        if (mounted && mapped.length > 0) setRdvs(mapped);
      } catch {
        /* conserve les mocks si l'API est indisponible */
      }
    };
    load();
    return () => { mounted = false; };
  }, [setRdvs]);

  const stats = useMemo(() => ({
    total:     rdvs?.length     || 0,
    pending:   rdvs?.filter(r => r.status === "pending").length   || 0,
    confirmed: rdvs?.filter(r => r.status === "confirmed").length || 0,
    cancelled: rdvs?.filter(r => r.status === "cancelled").length || 0,
  }), [rdvs]);

  const catCounts = useMemo(() => {
    const counts = { coiffure: 0, ongerie: 0, spa: 0, conseil: 0 };
    (rdvs || []).forEach(r => { if (r.category && counts[r.category] !== undefined) counts[r.category]++; });
    return counts;
  }, [rdvs]);

  const STATUS_FILTERS = [
    { id: "all",       label: "Tous",       count: stats.total     },
    { id: "pending",   label: "En attente", count: stats.pending   },
    { id: "confirmed", label: "Confirmés",  count: stats.confirmed },
    { id: "cancelled", label: "Annulés",    count: stats.cancelled },
  ];

  const CAT_FILTERS = [
    { id: "all",      label: "Toutes catégories", icon: "📋" },
    { id: "coiffure", label: "Coiffure",           icon: "✂️"  },
    { id: "ongerie",  label: "Ongerie",            icon: "💅"  },
    { id: "spa",      label: "Spa & Soins",        icon: "🧖"  },
    { id: "conseil",  label: "Conseil",            icon: "✨"  },
  ];

  const filteredRdvs = useMemo(() => {
    let r = rdvs || [];
    if (filter    !== "all") r = r.filter(x => x.status   === filter);
    if (catFilter !== "all") r = r.filter(x => x.category === catFilter);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(x =>
        x.id.toLowerCase().includes(q) ||
        (x.client?.name  || "").toLowerCase().includes(q) ||
        (x.service       || "").toLowerCase().includes(q) ||
        (x.client?.phone || "").includes(q)
      );
    }
    return [...r].sort((a, b) => new Date(b.rdvDate + "T" + b.slot) - new Date(a.rdvDate + "T" + a.slot));
  }, [rdvs, filter, catFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRdvs.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const pagedRdvs  = filteredRdvs.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const setFilterReset  = (v) => { setFilter(v);    setPage(1); };
  const setCatReset     = (v) => { setCatFilter(v); setPage(1); };
  const setSearchReset  = (v) => { setSearch(v);    setPage(1); };

  return (
    <div className="panel active">

      {/* Header */}
      <div className="section-head">
        <div>
          <div className="section-head-title">Rendez-vous</div>
          <div className="section-head-sub">
            {filteredRdvs.length} résultat(s) — page {safePage}/{totalPages}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total RDV",  value: stats.total,     color: "#c41420" },
          { label: "En attente", value: stats.pending,   color: "#b07010" },
          { label: "Confirmés",  value: stats.confirmed, color: "#1a7a3e" },
          { label: "Annulés",    value: stats.cancelled, color: "#aaa"    },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 14, padding: "16px 18px",
            border: "1px solid rgba(10,10,12,.07)",
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, fontFamily: "'Fraunces', serif" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: "rgba(10,10,12,.45)", marginTop: 4, fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filtres catégorie */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {CAT_FILTERS.map(f => {
          const count  = f.id === "all" ? stats.total : catCounts[f.id];
          const active = catFilter === f.id;
          const cat    = CATEGORIES[f.id];
          return (
            <button key={f.id} onClick={() => setCatReset(f.id)} style={{
              padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
              border: active ? "none" : "1.5px solid var(--border)",
              background: active ? (cat ? cat.color : "var(--red)") : "transparent",
              color: active ? "#fff" : (cat ? cat.color : "var(--ink-s)"),
              display: "inline-flex", alignItems: "center", gap: 5, transition: "all .2s",
            }}>
              <span>{f.icon}</span>
              <span>{f.label}</span>
              <span style={{
                background: active ? "rgba(255,255,255,.25)" : "rgba(10,10,12,.08)",
                color: active ? "#fff" : "var(--ink-m)",
                borderRadius: 100, fontSize: 10, fontWeight: 700, padding: "1px 6px",
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filtres statut + Recherche */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STATUS_FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilterReset(f.id)} style={{
              padding: "5px 12px", borderRadius: 100, fontSize: 11.5, fontWeight: 600,
              cursor: "pointer", fontFamily: "'Inter', sans-serif", border: "1.5px solid",
              transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 5,
              borderColor: filter === f.id ? "var(--red)" : "var(--border)",
              background:  filter === f.id ? "var(--red)" : "transparent",
              color:       filter === f.id ? "#fff" : "var(--ink-s)",
            }}>
              {f.label}
              <span style={{
                background: filter === f.id ? "rgba(255,255,255,.25)" : "rgba(10,10,12,.08)",
                color: filter === f.id ? "#fff" : "var(--ink-m)",
                borderRadius: 100, fontSize: 10, fontWeight: 700, padding: "1px 6px",
              }}>{f.count}</span>
            </button>
          ))}
        </div>

        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--ink-m)", pointerEvents: "none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Nom, téléphone, soin…"
            value={search}
            onChange={e => setSearchReset(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "9px 36px 9px 40px",
              border: `1.5px solid ${search ? "var(--red)" : "var(--border)"}`,
              borderRadius: 12, fontSize: 13, fontFamily: "'Inter', sans-serif",
              color: "var(--ink)", background: "#fff", outline: "none", transition: "border-color .2s",
            }}
          />
          {search && (
            <button onClick={() => setSearchReset("")} style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              border: "none", background: "rgba(10,10,12,.08)", borderRadius: "50%",
              width: 20, height: 20, cursor: "pointer", fontSize: 11,
              color: "var(--ink-s)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          )}
        </div>
      </div>

      {/* Liste */}
      {filteredRdvs.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--ink-m)" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Aucun rendez-vous trouvé</div>
          <div style={{ fontSize: 13 }}>Essayez de modifier vos filtres</div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pagedRdvs.map(r => (
              <RdvCard key={r.id} r={r} onView={setSelectedRdv} />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 24 }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                style={{
                  width: 34, height: 34, borderRadius: 10, border: "1.5px solid var(--border)",
                  background: "transparent", cursor: safePage === 1 ? "not-allowed" : "pointer",
                  opacity: safePage === 1 ? 0.35 : 1, fontSize: 16, color: "var(--ink-s)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >‹</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} style={{
                  width: 34, height: 34, borderRadius: 10,
                  border: n === safePage ? "none" : "1.5px solid var(--border)",
                  background: n === safePage ? "var(--red)" : "transparent",
                  color: n === safePage ? "#fff" : "var(--ink-s)",
                  fontWeight: n === safePage ? 700 : 500, fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Inter', sans-serif", transition: "all .15s",
                }}>{n}</button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                style={{
                  width: 34, height: 34, borderRadius: 10, border: "1.5px solid var(--border)",
                  background: "transparent", cursor: safePage === totalPages ? "not-allowed" : "pointer",
                  opacity: safePage === totalPages ? 0.35 : 1, fontSize: 16, color: "var(--ink-s)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >›</button>
            </div>
          )}
        </>
      )}

      {selectedRdv && (
        <RdvModal
          rdv={selectedRdv}
          onClose={() => setSelectedRdv(null)}
        />
      )}
    </div>
  );
};

export default Rdvs;
