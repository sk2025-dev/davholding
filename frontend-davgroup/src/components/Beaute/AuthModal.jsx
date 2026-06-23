import { useState } from "react";
import { useClientAuth } from "../../context/ClientAuthContext";
import "../../styles/AuthModal.css";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

export default function AuthModal() {
  const { modalOpen, setModalOpen, login, register, loginWithGoogle, onAuthSuccess } = useClientAuth();
  const [tab, setTab]         = useState("register");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const [loginForm, setLoginForm]       = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirm: "" });

  if (!modalOpen) return null;

  const handleClose = () => { setModalOpen(false); setError(""); };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      onAuthSuccess();
    } catch (err) {
      setError(err.message || "Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (registerForm.password !== registerForm.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await register(registerForm.name, registerForm.email, registerForm.password, registerForm.confirm);
      onAuthSuccess();
    } catch (err) {
      setError(err.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-overlay" onClick={handleClose} />
      <div className="auth-modal" role="dialog" aria-modal="true">
        <button className="auth-close" onClick={handleClose} type="button" aria-label="Fermer">✕</button>

        <div className="auth-lock-icon">🛍️</div>
        <h2 className="auth-title">
          {tab === "register" ? "Créez votre compte" : "Bon retour !"}
        </h2>
        <p className="auth-subtitle">
          {tab === "register"
            ? "Créez votre compte gratuit pour finaliser votre commande."
            : "Connectez-vous pour finaliser votre commande."}
        </p>

        {/* Bouton Google */}
        <button type="button" className="auth-google-btn" onClick={loginWithGoogle}>
          <GoogleIcon />
          Continuer avec Google
        </button>

        <div className="auth-divider"><span>ou</span></div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); setError(""); }}
          >
            Créer un compte
          </button>
          <button
            type="button"
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
          >
            J'ai déjà un compte
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {tab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label>Adresse email</label>
              <input
                type="email" required placeholder="aya@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="auth-field">
              <label>Mot de passe</label>
              <input
                type="password" required placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label>Prénom &amp; Nom</label>
              <input
                type="text" required placeholder="Aya Kouassi"
                value={registerForm.name}
                onChange={(e) => setRegisterForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="auth-field">
              <label>Adresse email</label>
              <input
                type="email" required placeholder="aya@email.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="auth-field">
              <label>Mot de passe</label>
              <input
                type="password" required minLength={8} placeholder="8 caractères minimum"
                value={registerForm.password}
                onChange={(e) => setRegisterForm((p) => ({ ...p, password: e.target.value }))}
              />
            </div>
            <div className="auth-field">
              <label>Confirmer le mot de passe</label>
              <input
                type="password" required placeholder="••••••••"
                value={registerForm.confirm}
                onChange={(e) => setRegisterForm((p) => ({ ...p, confirm: e.target.value }))}
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Création…" : "Créer mon compte"}
            </button>
          </form>
        )}

        <p className="auth-note">
          Vos données ne sont utilisées que pour vos commandes Dav'Beauté.
        </p>
      </div>
    </>
  );
}
