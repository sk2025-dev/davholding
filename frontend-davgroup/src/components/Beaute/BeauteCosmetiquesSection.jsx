import { useEffect, useState } from "react";
import "../../styles/BeauteCosmetiques.css";
import "../../styles/BeauteCoiffures.css";
import BeautyCard from "./BeautyCard";
import ProductDetailModal from "./ProductDetailModal";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function formatPrice(price) {
  return Number(price).toLocaleString("fr-FR") + " FCFA";
}

function toCardItem(p) {
  return {
    id: p.id,
    title: p.name,
    type: p.category || "Cosmétique",
    price: formatPrice(p.price),
    rawPrice: Number(p.price),
    badge: p.badge || null,
    image: p.image || "/images/placeholder.png",
    image2: p.image2 || null,
    description: p.description || "",
    inStock: p.quantity > 0,
  };
}

const PER_PAGE = 8;

function BeauteCosmetiquesSection({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [activePromo, setActivePromo] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/products?category=Cosmétiques`)
      .then((res) => res.json())
      .then((json) => setProducts((json?.data || []).map(toCardItem)))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));

    fetch(`${API_URL}/promos/active`)
      .then(r => r.json())
      .then(d => { if (d?.data?.length > 0) setActivePromo(d.data[0]); })
      .catch(() => {});
  }, []);

  const inStock    = products.filter((p) => p.inStock);
  const filtered   = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <section className="products-section beauty-cosmetiques">
      <div className="section-header">
        <div className="section-title-block">
          <div className="section-eyebrow">Visage &amp; corps</div>
          <h2 className="section-title">
            Produits <em>cosmétiques</em>
          </h2>
        </div>
      </div>

      {!isLoading && (
        <div className="coif-search-wrap" style={{ marginLeft: 0, marginBottom: 24 }}>
          <span className="coif-search-icon">🔍</span>
          <input
            type="text"
            className="coif-search"
            placeholder="Rechercher un produit cosmétique…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          {search && <button className="coif-search-clear" onClick={() => { setSearch(""); setPage(1); }}>✕</button>}
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-m, #888)" }}>
          Chargement des produits…
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-m, #888)" }}>
          Aucun produit disponible pour le moment.
        </div>
      ) : (
        <div className="cosm-sub">
          <div className="beauty-grid">
            {paged.map((item) => (
              <BeautyCard
                key={item.title}
                variant="product"
                item={item}
                onAddToCart={() => onAddToCart(item)}
                onViewDetails={() => setSelectedProduct(item)}
                activePromo={activePromo}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="coif-pagination" style={{ marginTop: 40 }}>
              <button className="coif-pag-btn"
                onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={safePage === 1}>‹</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n}
                  className={`coif-pag-btn${n === safePage ? " coif-pag-btn--active" : ""}`}
                  onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >{n}</button>
              ))}

              <button className="coif-pag-btn"
                onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={safePage === totalPages}>›</button>

              <span className="coif-pag-info">
                {filtered.length} produit{filtered.length > 1 ? "s" : ""} — page {safePage}/{totalPages}
              </span>
            </div>
          )}
        </div>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          suggestions={inStock.filter((p) => p.id !== selectedProduct.id).slice(0, 3)}
        />
      )}
    </section>
  );
}

export default BeauteCosmetiquesSection;
