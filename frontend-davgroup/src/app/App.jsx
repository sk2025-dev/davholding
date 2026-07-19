import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClientAuthProvider, useClientAuth } from "../context/ClientAuthContext";
import CookieConsent from "../components/CookieConsent";
import "../styles/Variables.css";
import "../styles/Holding.css";
import "../styles/Carrousel.css";
import "../styles/Modal.css";
import "../styles/BeautePage.css";
import "../styles/BeauteHeader.css";
import "../styles/BeauteMainNav.css";
import "../styles/BeauteFooter.css";
import "../styles/BeauteCapillaires.css";
import "../styles/CheckoutModal.css";
import "../styles/Typography.css";

function lazyWithVersionRecovery(importer, name) {
  return lazy(() =>
    importer()
      .then((module) => {
        sessionStorage.removeItem(`dav_chunk_retry_${name}`);
        return module;
      })
      .catch((error) => {
        const retryKey = `dav_chunk_retry_${name}`;
        if (!sessionStorage.getItem(retryKey)) {
          sessionStorage.setItem(retryKey, "1");
          window.location.reload();
          return new Promise(() => {});
        }
        sessionStorage.removeItem(retryKey);
        throw error;
      }),
  );
}

const HoldingPage = lazyWithVersionRecovery(() => import("../pages/HoldingPage"), "holding");
const BeauteRealisationsPage = lazyWithVersionRecovery(() => import("../pages/BeauteRealisationsPage"), "beaute-realisations");
const BeauteCapillairesPage = lazyWithVersionRecovery(() => import("../pages/BeauteCapillairesPage"), "beaute-capillaires");
const BeauteCoiffuresPage = lazyWithVersionRecovery(() => import("../pages/BeauteCoiffuresPage"), "beaute-coiffures");
const BeauteCosmetiquesPage = lazyWithVersionRecovery(() => import("../pages/BeauteCosmetiquesPage"), "beaute-cosmetiques");
const BeauteSpaPage = lazyWithVersionRecovery(() => import("../pages/BeauteSpaPage"), "beaute-spa");
const BeauteOngeriePage = lazyWithVersionRecovery(() => import("../pages/BeauteOngeriePage"), "beaute-ongerie");
const BeauteAboutPage = lazyWithVersionRecovery(() => import("../pages/BeauteAboutPage"), "beaute-about");
const ConsultingPage = lazyWithVersionRecovery(() => import("../pages/ConsultingPage"), "consulting");
const ConsultingBrandingPage = lazyWithVersionRecovery(() => import("../pages/ConsultingBrandingPage"), "consulting-branding");
const ConsultingDevPage = lazyWithVersionRecovery(() => import("../pages/ConsultingDevPage"), "consulting-dev");
const ConsultingDesignPage = lazyWithVersionRecovery(() => import("../pages/ConsultingDesignPage"), "consulting-design");
const ConsultingSecurePage = lazyWithVersionRecovery(() => import("../pages/ConsultingSecurePage"), "consulting-secure");
const Admin = lazyWithVersionRecovery(() => import("../admin/Admin"), "admin");
const AuthModal = lazyWithVersionRecovery(() => import("../components/Beaute/AuthModal"), "auth-modal");
const BookingModal = lazyWithVersionRecovery(() => import("../components/Beaute/BookingModal"), "booking-modal");
const AuthCallbackPage = lazyWithVersionRecovery(() => import("../pages/AuthCallbackPage"), "auth-callback");
const PaymentSuccessPage = lazyWithVersionRecovery(() => import("../pages/PaymentSuccessPage"), "payment-success");
const PaymentCancelPage = lazyWithVersionRecovery(() => import("../pages/PaymentCancelPage"), "payment-cancel");
const ProfilePage = lazyWithVersionRecovery(() => import("../pages/ProfilePage"), "profile");
const PrivacyPolicyPage = lazyWithVersionRecovery(() => import("../pages/PrivacyPolicyPage"), "privacy");
const TermsOfUsePage = lazyWithVersionRecovery(() => import("../pages/TermsOfUsePage"), "terms");

function PageLoader() {
  return (
    <div role="status" aria-live="polite" style={{ minHeight: "40vh", display: "grid", placeItems: "center" }}>
      Chargement…
    </div>
  );
}

/* Wrapper qui a accès au contexte pour le BookingModal */
function AppModals() {
  const { modalOpen, bookingOpen, bookingService, closeBooking } = useClientAuth();
  return (
    <Suspense fallback={null}>
      {modalOpen && <AuthModal />}
      {bookingOpen && (
        <BookingModal isOpen onClose={closeBooking} preService={bookingService} />
      )}
    </Suspense>
  );
}

function App() {
  return (
    <ClientAuthProvider>
    <BrowserRouter>
      <AppModals />
      <CookieConsent />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HoldingPage />} />
          <Route path="/admin" element={<Admin />} />
        <Route path="/beaute" element={<Navigate to="/beaute/realisations" replace />} />
        <Route
          path="/beaute/realisations"
          element={<BeauteRealisationsPage />}
        />
        <Route path="/beaute/capillaires" element={<BeauteCapillairesPage />} />
        <Route path="/beaute/coiffures" element={<BeauteCoiffuresPage />} />
        <Route path="/beaute/cosmetiques" element={<BeauteCosmetiquesPage />} />
        <Route path="/beaute/ongerie" element={<BeauteOngeriePage />} />
        <Route path="/beaute/spa" element={<BeauteSpaPage />} />
        <Route path="/beaute/about" element={<BeauteAboutPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />
        <Route path="/consulting/realisations/branding" element={<ConsultingBrandingPage />} />
        <Route path="/consulting/realisations/developpement" element={<ConsultingDevPage />} />
        <Route path="/consulting/realisations/design" element={<ConsultingDesignPage />} />
        <Route path="/consulting/secure" element={<ConsultingSecurePage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/paiement/succes" element={<PaymentSuccessPage />} />
        <Route path="/paiement/annule" element={<PaymentCancelPage />} />
        <Route path="/beaute/profil" element={<ProfilePage />} />
        <Route path="/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
        <Route path="/conditions-utilisation" element={<TermsOfUsePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </ClientAuthProvider>
  );
}

export default App;
