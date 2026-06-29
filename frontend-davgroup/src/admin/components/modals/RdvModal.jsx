import "../../styles/admin.css";

const STATUS_MAP = {
  pending:   { label: "En attente", cls: "s-pending"   },
  confirmed: { label: "Confirmé",   cls: "s-confirmed" },
  completed: { label: "Terminé",    cls: "s-done"      },
  cancelled: { label: "Annulé",     cls: "s-cancelled" },
};

const PAY_LABELS = {
  mobile:           "Mobile Money",
  card:             "Carte bancaire",
  cash:             "Espèces",
  paydunya:         "PayDunya",
  cash_on_delivery: "Paiement à la livraison",
};

const fmtPrice = (n) =>
  n != null ? Number(n).toLocaleString("fr-FR") + " FCFA" : "—";

const RdvModal = ({ rdv, onClose }) => {
  if (!rdv) return null;

  const reste = rdv.svcPrice != null && rdv.acompte != null
    ? rdv.svcPrice - rdv.acompte
    : null;

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-head-title">Rendez-vous {rdv.id}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">

          {/* Statut */}
          <div className="modal-row">
            <span className="modal-row-label">Statut</span>
            <span className="modal-row-val">
              <span className={`status-badge ${STATUS_MAP[rdv.status]?.cls || ""}`}>
                {STATUS_MAP[rdv.status]?.label || rdv.status}
              </span>
            </span>
          </div>

          {/* Client */}
          <div className="modal-row">
            <span className="modal-row-label">Client</span>
            <span className="modal-row-val">
              {rdv.client?.name}
              {rdv.client?.phone && <><br /><small style={{ color: "var(--ink-m)" }}>{rdv.client.phone}</small></>}
            </span>
          </div>

          {rdv.client?.email && (
            <div className="modal-row">
              <span className="modal-row-label">Email</span>
              <span className="modal-row-val">{rdv.client.email}</span>
            </div>
          )}

          {/* Prestation */}
          <div className="modal-row">
            <span className="modal-row-label">Soin</span>
            <span className="modal-row-val">{rdv.service || "—"}</span>
          </div>

          <div className="modal-row">
            <span className="modal-row-label">Date</span>
            <span className="modal-row-val">{rdv.rdvDate} à {rdv.slot}</span>
          </div>

          {rdv.duration && (
            <div className="modal-row">
              <span className="modal-row-label">Durée</span>
              <span className="modal-row-val">{rdv.duration}</span>
            </div>
          )}

          {/* Paiement */}
          {rdv.svcPrice != null && (
            <div className="modal-row">
              <span className="modal-row-label">Prix prestation</span>
              <span className="modal-row-val">{fmtPrice(rdv.svcPrice)}</span>
            </div>
          )}

          {rdv.acompte > 0 && (
            <div className="modal-row">
              <span className="modal-row-label">Acompte versé</span>
              <span className="modal-row-val" style={{ color: "var(--red)", fontWeight: 700 }}>
                {fmtPrice(rdv.acompte)}
              </span>
            </div>
          )}

          {reste != null && reste > 0 && (
            <div className="modal-row">
              <span className="modal-row-label">Reste à payer</span>
              <span className="modal-row-val">{fmtPrice(reste)}</span>
            </div>
          )}

          {rdv.payMethod && (
            <div className="modal-row">
              <span className="modal-row-label">Paiement</span>
              <span className="modal-row-val">{PAY_LABELS[rdv.payMethod] || rdv.payMethod}</span>
            </div>
          )}

          {rdv.notes && (
            <div className="modal-row">
              <span className="modal-row-label">Notes</span>
              <span className="modal-row-val" style={{ fontStyle: "italic", color: "var(--ink-m)" }}>
                {rdv.notes}
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RdvModal;
