import { useEffect, useState } from "react";
import "../../styles/BeauteCosmetiques.css";
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
    badge: p.badge || null,
    image: p.image || "/images/placeholder.png",
    image2: p.image2 || null,
    description: p.description || "",
    inStock: p.quantity > 0,
  };
}

function BeauteCosmetiquesSection({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/products?category=Cosmétiques`)
      .then((res) => res.json())
      .then((json) => setProducts((json?.data || []).map(toCardItem)))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  const inStock = products.filter((p) => p.inStock);

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

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-m, #888)" }}>
          Chargement des produits…
        </div>
      ) : inStock.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-m, #888)" }}>
          Aucun produit disponible pour le moment.
        </div>
      ) : (
        <div className="cosm-sub">
          <div className="beauty-grid">
            {inStock.map((item) => (
              <BeautyCard
                key={item.title}
                variant="product"
                item={item}
                onAddToCart={() => onAddToCart(item)}
                onViewDetails={() => setSelectedProduct(item)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}

export default BeauteCosmetiquesSection;
