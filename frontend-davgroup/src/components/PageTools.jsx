import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/PageTools.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export default function PageTools() {
  const location = useLocation();
  const [message, setMessage] = useState("");

  const record = useCallback((type) => {
    fetch(`${API_URL}/page-stats/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ path: location.pathname, title: document.title, type }),
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    const key = `dav_page_view:${location.pathname}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      record("view");
    }
  }, [location.pathname, record]);

  if (location.pathname.startsWith("/admin")) return null;

  const share = async () => {
    const data = { title: document.title, text: `Découvrez ${document.title}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Lien copié");
      }
      record("share");
    } catch (error) {
      if (error?.name !== "AbortError") setMessage("Partage indisponible");
    }
    setTimeout(() => setMessage(""), 2200);
  };

  const capture = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setMessage("Capture non prise en charge sur cet appareil");
      setTimeout(() => setMessage(""), 2500);
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: false,
        preferCurrentTab: true,
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();
      await new Promise((resolve) => setTimeout(resolve, 250));
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.92));
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `dav-${location.pathname.split("/").filter(Boolean).join("-") || "accueil"}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
      record("capture");
      setMessage("Capture enregistrée");
    } catch (error) {
      if (error?.name !== "NotAllowedError") setMessage("Capture annulée");
    } finally {
      stream?.getTracks().forEach((track) => track.stop());
      setTimeout(() => setMessage(""), 2200);
    }
  };

  return (
    <aside className="page-tools" aria-label="Outils de la page">
      <button type="button" onClick={capture} title="Capturer cette page" aria-label="Capturer cette page">⌗ <span>Capturer</span></button>
      <button type="button" onClick={share} title="Partager cette page" aria-label="Partager cette page">↗ <span>Partager</span></button>
      {message && <div className="page-tools__message" role="status">{message}</div>}
    </aside>
  );
}
