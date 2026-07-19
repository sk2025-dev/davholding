import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClientAuth } from "../context/ClientAuthContext";

export default function AuthCallbackPage() {
  const navigate  = useNavigate();
  const { onGoogleSuccess } = useClientAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");
    const error  = params.get("error");

    if (error || !token) {
      navigate("/beaute/cosmetiques?auth=error", { replace: true });
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(params.get("user") || "{}"));
      onGoogleSuccess(user, token);
    } catch {
      navigate("/beaute/cosmetiques?auth=error", { replace: true });
    }
  }, [navigate, onGoogleSuccess]);

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", background: "#faf6f0", flexDirection: "column", gap: 16,
    }}>
      <div style={{ fontSize: 36 }}>🌸</div>
      <p style={{ fontFamily: "Inter, sans-serif", color: "#1a0f0a", fontSize: 15 }}>
        Connexion en cours…
      </p>
    </div>
  );
}
