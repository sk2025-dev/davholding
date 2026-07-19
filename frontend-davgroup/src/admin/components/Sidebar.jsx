import { useAdmin } from "../hooks/useAdmin";
import "../styles/admin.css";

const getInitial = (userProfile, currentUser) => {
  const source = userProfile?.name || currentUser?.name || currentUser?.email || "Admin";
  return source.trim().charAt(0).toUpperCase();
};

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  rdvs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  products: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
    </svg>
  ),
  beauty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 5 5 5 8c0 4 4 7 7 10 3-3 7-6 7-10 0-3-3-6-7-6z" />
      <path d="M12 2c0 0-2 3-2 6s2 4 2 4 2-1 2-4-2-6-2-6z" />
      <path d="M5 8c0 0 3 1 7 1s7-1 7-1" />
    </svg>
  ),
  photos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  promos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
    </svg>
  ),
  "promo-slides": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15l3-3 2 2 3-4 2 3" />
      <circle cx="8" cy="9" r="1" />
    </svg>
  ),
  realisations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9l4-4 4 4 4-4 4 4" />
      <path d="M3 15l4 4 4-4 4 4 4-4" />
    </svg>
  ),
  "consulting-realisations": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v12H4z" />
      <path d="M4 16l4-4 3 3 5-5 4 4" />
    </svg>
  ),
  "consulting-hero-slides": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M8 6v12M16 6v12" />
      <path d="M2 12h2M20 12h2" />
    </svg>
  ),
  "consulting-section-images": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  "delivery-zones": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  testimonials: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  ),
  "page-stats": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
};

const Sidebar = ({ isOpen, onClose }) => {
  const {
    currentUser,
    userProfile,
    logout,
    switchPanel,
    currentPanel,
    setShowProfileModal,
    notifs,
  } = useAdmin();

  const handleNav = (id) => {
    switchPanel(id);
    onClose?.();
  };

  const isConsultingOnly = currentUser?.role === "consulting";

  const allMenuItems = [
    { id: "dashboard",    label: "Tableau de bord",  davgroupOnly: true },
    { id: "orders",       label: "Commandes",        badge: notifs.pendingOrders, davgroupOnly: true },
    { id: "rdvs",         label: "Rendez-vous",      badge: notifs.awaitingRdvs,   davgroupOnly: true },
    { id: "products",     label: "Produits & Stock", badge: notifs.outOfStock,     davgroupOnly: true },
    { id: "beauty",       label: "Beauté",            davgroupOnly: true },
    { id: "realisations", label: "Réalisations",      davgroupOnly: true },
    { id: "promos",       label: "Codes promotionnels", davgroupOnly: true },
    { id: "promo-slides", label: "Publicités & bannières", davgroupOnly: true },
    { id: "testimonials", label: "Témoignages clients", davgroupOnly: true },
    { id: "page-stats", label: "Vues & partages", davgroupOnly: true },
    { id: "delivery-zones", label: "Communes de livraison", davgroupOnly: true },
    { id: "consulting-realisations", label: "Réalisations Consulting" },
    { id: "consulting-hero-slides", label: "Carrousel Consulting" },
    { id: "consulting-section-images", label: "Photos Consulting" },
  ];

  const menuItems = allMenuItems.filter((item) => !isConsultingOnly || !item.davgroupOnly);

  return (
    <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
      <div className="sb-logo">
        <img src="/images/logo.png" alt="DAVGROUP" />
        <div className="sb-logo-sub">Administration</div>
      </div>

      <nav className="sb-nav">
        <div className="sb-section-label">Principal</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sb-item ${currentPanel === item.id ? "sb-active" : ""}`}
            onClick={() => handleNav(item.id)}
          >
            {icons[item.id]}
            {item.label}
            {item.badge > 0 && <span className="sb-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sb-footer">
        <button
          className="sb-user"
          onClick={() => setShowProfileModal(true)}
          style={{ cursor: "pointer", width: "100%", textAlign: "left" }}
        >
          <div className="sb-avatar">
            {userProfile?.photo ? (
              <img
                src={userProfile.photo}
                alt="Profil"
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              getInitial(userProfile, currentUser)
            )}
          </div>
          <div>
            <div className="sb-user-name">
              {userProfile?.name || currentUser?.name || currentUser?.email}
            </div>
            <div className="sb-user-role">Administrateur</div>
          </div>
        </button>

        <button className="sb-logout" onClick={logout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
