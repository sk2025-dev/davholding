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
    const isGommage = item.title.toLowerCase().includes("gommage");
    const discount  = computeDiscount(item.rawPrice, activePromo, item.id);

    return (
      <article className={`beauty-product-card${isGommage ? " beauty-product-card--gommage" : ""}`}>
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

          {/* Badge réduction ou badge custom */}
          {discount ? (
            <span className="beauty-product-badge beauty-product-badge--promo">
              -{discount.pct}%
            </span>
          ) : item.badge ? (
            <span className="beauty-product-badge">{item.badge}</span>
          ) : null}
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
                onClick={onAddToCart}
                translate="no"
                lang="fr"
              >
                + Panier
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
