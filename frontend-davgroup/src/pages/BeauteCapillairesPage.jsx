import { useMemo, useState } from "react";
import BeauteLayout from "../components/Beaute/BeauteLayout";
import BeauteCapillairesSection from "../components/Beaute/BeauteCapillairesSection";
import CheckoutModal from "../components/Beaute/CheckoutModal";
import { useClientAuth } from "../context/ClientAuthContext";

function parsePrice(price) {
  return Number.parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

function BeauteCapillairesPage() {
  const { requireAuth, user } = useClientAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
    [cartItems],
  );

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.title === product.title);
      if (existingItem) {
        return currentItems.map((item) =>
          item.title === product.title ? { ...item, quantity: item.quantity + qty } : item,
        );
      }
      return [
        ...currentItems,
        {
          title: product.title,
          priceLabel: product.price,
          unitPrice: parsePrice(product.price),
          quantity: qty,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const changeQuantity = (title, delta) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.title === title ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  const finalizeOrder = () => {
    if (cartItems.length === 0) return;
    requireAuth(openCheckout);
  };

  return (
    <BeauteLayout cartCount={cartCount} onCartClick={() => setIsCartOpen(true)}>
      <BeauteCapillairesSection onAddToCart={handleAddToCart} />

      <div
        className={`beauty-cart-overlay${isCartOpen ? " is-open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside
        className={`beauty-cart-drawer${isCartOpen ? " is-open" : ""}`}
        aria-label="Panier"
      >
        <div className="beauty-cart-drawer__header">
          <div>
            <p>Mon panier</p>
            <h2>
              {cartCount} article{cartCount > 1 ? "s" : ""}
            </h2>
          </div>
          <button
            type="button"
            className="beauty-cart-close"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="beauty-cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="beauty-cart-empty">
              <p>Le panier est vide pour le moment.</p>
            </div>
          ) : (
            <div className="beauty-cart-list">
              {cartItems.map((item) => (
                <article className="beauty-cart-item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.priceLabel}</p>
                  </div>
                  <div className="beauty-cart-item__actions">
                    <button type="button" onClick={() => changeQuantity(item.title, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.title, 1)}>+</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="beauty-cart-drawer__footer">
          {user && (
            <div className="beauty-cart-user">
              <span className="beauty-cart-user__avatar">
                {user.name?.charAt(0).toUpperCase()}
              </span>
              <span className="beauty-cart-user__name">{user.name}</span>
            </div>
          )}
          <div className="beauty-cart-total">
            <span>Total</span>
            <strong>{cartTotal.toLocaleString("fr-FR")} FCFA</strong>
          </div>
          <button
            type="button"
            className="beauty-btn beauty-btn--primary beauty-cart-checkout"
            onClick={finalizeOrder}
            disabled={cartItems.length === 0}
          >
            {user ? "Finaliser la commande" : "Créer un compte pour commander"}
          </button>
        </div>
      </aside>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onSuccess={handleCheckoutSuccess}
        onAddToCart={handleAddToCart}
      />
    </BeauteLayout>
  );
}

export default BeauteCapillairesPage;
