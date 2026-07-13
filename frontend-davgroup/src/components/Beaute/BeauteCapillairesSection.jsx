import { useEffect, useState } from "react";
import BeautyCard from "./BeautyCard";
import ProductDetailModal from "./ProductDetailModal";
import { useClientAuth } from "../../context/ClientAuthContext";
import "../../styles/BeauteCapillaires.css";
import "../../styles/BeauteCoiffures.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function formatPrice(price) {
  return Number(price).toLocaleString("fr-FR") + " FCFA";
}

function toCardItem(p) {
  return {
    id: p.id,
    title: p.name,
    type: p.category || "Capillaire",
    price: formatPrice(p.price),
    badge: p.badge || null,
    image: p.image || "/images/placeholder.png",
    image2: p.image2 || null,
    description: p.description || "",
    inStock: p.quantity > 0,
  };
}

function BeauteCapillairesSection({ onAddToCart }) {
  const { requireAuth, openBooking } = useClientAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/products?category=Soins Capillaires`)
      .then((res) => res.json())
      .then((json) => setProducts((json?.data || []).map(toCardItem)))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  const inStock = products.filter((p) => p.inStock);
  const allProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="capillaires" className="beauty-section beauty-capillaires">
      <div className="beauty-section-heading beauty-capillaires__heading">
        <div>
          <p>Notre méthode</p>
          <h2>
            L'entretien de vos <span>cheveux</span>
          </h2>
        </div>
      </div>

      <div className="beauty-capillaires__intro">
        <div className="beauty-capillaires__copy">
          <p className="beauty-capillaires__kicker">Soin &amp; nutrition</p>
          <p className="beauty-capillaires__lead">
            Chez Dav'Beauté, chaque séance commence par un diagnostic capillaire
            personnalisé. Nous prenons soin de vos cheveux de la racine aux
            pointes : lavage en douceur, hydratation intensive sous casque
            thermique, puis coiffure soignée pour un résultat durable et
            naturel.
          </p>
          <ul className="beauty-capillaires__steps">
            <li>
              <span>01</span>
              Lavage &amp; démêlage doux avec nos soins naturels
            </li>
            <li>
              <span>02</span>
              Hydratation intensive sous casque thermique
            </li>
          </ul>

          <button
            className="beauty-btn beauty-btn--primary beauty-capillaires__cta"
            onClick={() => requireAuth(() => openBooking())}
          >
            📅 Prendre un rendez-vous
          </button>
        </div>

        <div className="beauty-capillaires__photos" aria-label="Photos soin">
          <figure>
            <img src="/images/CASKI.png" alt="Lavage des cheveux" />
            <figcaption>sous casque thermique</figcaption>
          </figure>
          <figure>
            <img src="/images/MII.png" alt="Résultat après soin" />
            <figcaption>Shampoing et Démêlage</figcaption>
          </figure>
        </div>
      </div>

      <div className="beauty-capillaires__products">
        <div className="beauty-section-heading beauty-section-heading--stack">
          <div>
            <p>Nos produits</p>
            <h2>
              Produits <span>capillaires</span>
            </h2>
          </div>
          <span className="beauty-capillaires__count">
            {inStock.length} produit{inStock.length !== 1 ? "s" : ""}
          </span>
        </div>

        {!isLoading && (
          <div className="coif-search-wrap" style={{ marginLeft: 0, marginBottom: 24 }}>
            <span className="coif-search-icon">🔍</span>
            <input
              type="text"
              className="coif-search"
              placeholder="Rechercher un produit capillaire…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="coif-search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>
        )}

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-m, #888)" }}>
            Chargement des produits…
          </div>
        ) : allProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-m, #888)" }}>
            Aucun produit disponible pour le moment.
          </div>
        ) : (
          <div className="beauty-product-grid">
            {allProducts.map((product) => (
              <BeautyCard
                key={product.title}
                variant="product"
                item={product}
                onAddToCart={() => onAddToCart(product)}
                onViewDetails={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

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

export default BeauteCapillairesSection;
