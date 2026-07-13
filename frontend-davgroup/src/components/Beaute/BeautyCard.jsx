const BADGE_MAP = {
  "badge-best":  { label: "Meilleure vente", cls: "beauty-product-badge--best" },
  "badge-new":   { label: "Nouveau",          cls: "beauty-product-badge--new"  },
  "badge-promo": { label: "Promo",            cls: "beauty-product-badge--promo-tag" },
  // anciens textes littéraux stockés avant la migration vers les clés
  "best-seller": { label: "Meilleure vente", cls: "beauty-product-badge--best" },
  "nouveau":     { label: "Nouveau",          cls: "beauty-product-badge--new"  },
  "promo":       { label: "Promo",            cls: "beauty-product-badge--promo-tag" },
};

function resolveBadge(raw) {
  if (!raw) return null;
  return BADGE_MAP[raw.toLowerCase()] || BADGE_MAP[raw] || { label: raw, cls: "" };
}

function formatPrice(n) {
  return Number(n).toLocaleString("fr-FR") + " FCFA";
}

function computeDiscount(rawPrice, promo, productId) {
  if (!promo || !rawPrice) return null;

  /* Vérifier si la promo s'applique à ce produit */
  const ids = promo.product_ids || [];
  if (ids.length > 0 && !ids.includes(productId)) return null;

  let discounted;
  if (promo.discount_type === "percent") {
    discounted = rawPrice * (1 - promo.value / 100);
  } else {
    discounted = rawPrice - promo.value;
  }

  if (discounted <= 0) return null;

  const pct = Math.round((1 - discounted / rawPrice) * 100);
  return { discounted: Math.round(discounted), pct };
}

function BeautyCard({ variant, item, label, onAddToCart, onViewDetails, activePromo }) {
  if (variant === "product") {
    const isGommage   = item.title.toLowerCase().includes("gommage");
    const discount    = computeDiscount(item.rawPrice, activePromo, item.id);
    const inStock    = item.inStock !== false;
    const badge      = resolveBadge(item.badge);

    return (
      <article className={`beauty-product-card${isGommage ? " beauty-product-card--gommage" : ""}${!inStock ? " beauty-product-card--oos" : ""}`}>
        <div className="beauty-product-media">
          <div className="beauty-product-media__trigger" aria-hidden="true">
            <div className="beauty-product-img-stack">
              <img
                src={item.image || "/images/placeholder.png"}
                alt={item.title}
                className="beauty-product-img-layer img-front"
              />
              {item.image2 && (
                <img
                  src={item.image2}
                  alt={`${item.title} — vue 2`}
                  className="beauty-product-img-layer img-back"
                />
              )}
            </div>
          </div>

          {/* Overlay rupture de stock */}
          {!inStock && (
            <div className="beauty-product-oos-overlay">
              <span className="beauty-product-oos-label">Rupture de stock</span>
            </div>
          )}

          {/* Badge réduction ou badge produit (uniquement si en stock) */}
          {inStock && (discount ? (
            <span className="beauty-product-badge beauty-product-badge--promo">
              -{discount.pct}%
            </span>
          ) : badge ? (
            <span className={`beauty-product-badge ${badge.cls}`}>
              {badge.label}
            </span>
          ) : null)}
        </div>

        <div className="beauty-product-body">
          <p className="beauty-product-type">{item.type}</p>
          <h3>{item.title}</h3>
          <div className="beauty-product-footer">

            {/* Prix */}
            {discount ? (
              <div className="beauty-product-prices">
                <strong className="beauty-product-price--new">
                  {formatPrice(discount.discounted)}
                </strong>
                <span className="beauty-product-price--old">
                  {item.price}
                </span>
              </div>
            ) : (
              <strong>{item.price}</strong>
            )}

            <div className="beauty-product-actions">
              {onViewDetails && (
                <button
                  type="button"
                  className="beauty-product-link beauty-product-link--ghost"
                  onClick={() => onViewDetails(item)}
                >
                  Détails
                </button>
              )}
              <button
                type="button"
                className="beauty-product-link"
                onClick={inStock ? onAddToCart : undefined}
                disabled={!inStock}
                translate="no"
                lang="fr"
              >
                {inStock ? "+ Panier" : "Indisponible"}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "service") {
    return (
      <article className="beauty-service-card">
        <div className="beauty-service-image">
          <img src={item.image} alt={item.title} />
          <span>{item.title}</span>
        </div>
        <div className="beauty-service-body">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </article>
    );
  }

  if (variant === "realisation") {
    return (
      <article className="beauty-real-card">
        <div className="beauty-real-image">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="beauty-real-body">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="beauty-info-card">
      <span className="beauty-card-kicker">{label}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}

export default BeautyCard;
