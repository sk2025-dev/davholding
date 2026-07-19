import BeauteFooter from "./BeauteFooter";
import BeauteHeader from "./BeauteHeader";
import BeauteMainNav from "./BeauteMainNav";
import BeautePromoSection from "./BeautePromoSection";
import BeauteQuickNav from "./BeauteQuickNav";
import SuggestedProductModal from "./SuggestedProductModal";
import BeauteHomeHero from "./BeauteHomeHero";
import BeauteSeo from "./BeauteSeo";
import BeauteSocialProof from "./BeauteSocialProof";
import BeauteFaq from "./BeauteFaq";
import BeauteTestimonials from "./BeauteTestimonials";
import { sectionTabs } from "./beauteData";
import "../../styles/BeautePage.css";
import "../../styles/BeauteHeader.css";
import "../../styles/BeauteMainNav.css";
import "../../styles/BeauteRealisations.css";

function BeauteLayout({ children, cartCount = 0, onCartClick, showHomeHero = false }) {
  return (
    <>
      <a className="beauty-skip-link" href="#beauty-main-content">
        Aller au contenu principal
      </a>
      <main className="beauty-page" id="beauty-main-content" tabIndex="-1">
        <BeauteSeo />
        <BeauteHeader
          cartCount={cartCount}
          onCartClick={onCartClick}
        />
        <BeauteMainNav tabs={sectionTabs} />
        {showHomeHero && <BeauteHomeHero />}
        <BeautePromoSection />
        {showHomeHero && <BeauteSocialProof />}
        {showHomeHero && <BeauteTestimonials />}
        {children}
        {showHomeHero && <BeauteFaq />}
        <BeauteFooter />
        <BeauteQuickNav />
        <SuggestedProductModal />
      </main>
    </>
  );
}

export default BeauteLayout;
