// src/app/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HoldingPage from "../pages/HoldingPage";
import BeautePage from "../pages/BeautePage";
import BeauteRealisationsPage from "../pages/BeauteRealisationsPage";
import BeauteCapillairesPage from "../pages/BeauteCapillairesPage";
import BeauteCoiffuresPage from "../pages/BeauteCoiffuresPage";
import BeauteCosmetiquesPage from "../pages/BeauteCosmetiquesPage";
import BeauteSpaPage from "../pages/BeauteSpaPage";
import BeauteOngeriePage from "../pages/BeauteOngeriePage";
import BeauteAboutPage from "../pages/BeauteAboutPage";
import ConsultingPage from "../pages/ConsultingPage";
import ConsultingBrandingPage from "../pages/ConsultingBrandingPage";
import ConsultingDevPage from "../pages/ConsultingDevPage";
import ConsultingDesignPage from "../pages/ConsultingDesignPage";
import ConsultingSecurePage from "../pages/ConsultingSecurePage";
import Admin from "../admin/Admin";
import { ClientAuthProvider, useClientAuth } from "../context/ClientAuthContext";
import AuthModal from "../components/Beaute/AuthModal";
import BookingModal from "../components/Beaute/BookingModal";
import AuthCallbackPage from "../pages/AuthCallbackPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentCancelPage from "../pages/PaymentCancelPage";
import ProfilePage from "../pages/ProfilePage";
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

/* Wrapper qui a accès au contexte pour le BookingModal */
function AppModals() {
  const { bookingOpen, bookingService, closeBooking } = useClientAuth();
  return (
    <>
      <AuthModal />
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} preService={bookingService} />
    </>
  );
}

function App() {
  return (
    <ClientAuthProvider>
    <BrowserRouter>
      <AppModals />
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
      </Routes>
    </BrowserRouter>
    </ClientAuthProvider>
  );
}

export default App;
