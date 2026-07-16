import BeauteFooter from "./BeauteFooter";
import BeauteHeader from "./BeauteHeader";
import BeauteMainNav from "./BeauteMainNav";
import BeautePromoSection from "./BeautePromoSection";
import BeauteQuickNav from "./BeauteQuickNav";
import SuggestedProductModal from "./SuggestedProductModal";
import { sectionTabs } from "./beauteData";
import "../../styles/BeautePage.css";
import "../../styles/BeauteHeader.css";
import "../../styles/BeauteMainNav.css";
import "../../styles/BeauteRealisations.css";

function BeauteLayout({ children, cartCount = 0, onCartClick }) {
  return (
    <main className="beauty-page">
      <BeauteHeader
        cartCount={cartCount}
        onCartClick={onCartClick}
      />
      <BeauteMainNav tabs={sectionTabs} />
      <BeautePromoSection />
      {children}
      <BeauteFooter />
      <BeauteQuickNav />
      <SuggestedProductModal />
    </main>
  );
}

export default BeauteLayout;
