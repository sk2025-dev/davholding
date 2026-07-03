import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const STORAGE_KEY = "dav_client_token";
const USER_KEY    = "dav_client_user";

const ClientAuthContext = createContext(null);

export function ClientAuthProvider({ children }) {
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const pendingCallback           = useRef(null);

  const saveSession = (userData, token) => {
    localStorage.setItem(STORAGE_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const apiRequest = async (path, body) => {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Erreur réseau");
    return data;
  };

  const login = useCallback(async (email, password) => {
    const data = await apiRequest("/login", { email, password });
    saveSession(data.user, data.token);
    return data.user;
  }, []);

  const register = useCallback(async (name, email, password, password_confirmation, phone) => {
    const data = await apiRequest("/register", { name, email, phone: phone || undefined, password, password_confirmation });
    saveSession(data.user, data.token);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
      } catch { /* ignore */ }
    }
    clearSession();
  }, []);

  const loginWithGoogle = useCallback(() => {
    // Sauvegarder l'URL actuelle pour y revenir après auth
    sessionStorage.setItem("dav_auth_return", window.location.pathname);
    window.location.href = `${API_URL}/auth/google`;
  }, []);

  // Appelé par AuthCallbackPage après retour de Google
  const onGoogleSuccess = useCallback((userData, token) => {
    saveSession(userData, token);
    const returnPath = sessionStorage.getItem("dav_auth_return") || "/beaute/cosmetiques";
    sessionStorage.removeItem("dav_auth_return");
    // Exécuter le callback en attente si présent, puis naviguer
    const cb = pendingCallback.current;
    pendingCallback.current = null;
    window.location.replace(returnPath);
    if (cb) setTimeout(cb, 300);
  }, []);

  const requireAuth = useCallback((callback) => {
    if (user) { callback?.(); return; }
    pendingCallback.current = callback;
    setModalOpen(true);
  }, [user]);

  const onAuthSuccess = useCallback(() => {
    setModalOpen(false);
    const cb = pendingCallback.current;
    pendingCallback.current = null;
    cb?.();
  }, []);

  /* ── Booking modal ── */
  const [bookingOpen, setBookingOpen]       = useState(false);
  const [bookingService, setBookingService] = useState(null);

  const openBooking = useCallback((service = null) => {
    setBookingService(service);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    setBookingService(null);
  }, []);

  return (
    <ClientAuthContext.Provider value={{
      user, login, register, logout,
      loginWithGoogle, onGoogleSuccess,
      requireAuth, modalOpen, setModalOpen, onAuthSuccess,
      openBooking, closeBooking, bookingOpen, bookingService,
    }}>
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const ctx = useContext(ClientAuthContext);
  if (!ctx) throw new Error("useClientAuth must be used inside ClientAuthProvider");
  return ctx;
}
