import { useEffect, useRef } from "react";

const clients = [
  { img: "/consulting/images/AEJ.png", name: "Agence Emploi Jeunes", tag: "Emploi & RH" },
  { img: "/consulting/images/logo dav beauty.png", name: "Dav' Beauté", tag: "Beauté & Bien-être" },
  { img: "/consulting/images/metho.jpg", name: "Application Métho", tag: "Web · Gestion" },
  { img: "/consulting/images/pointage.png", name: "Application PRE", tag: "Mobile · Présence" },
];

export default function ConsultingClientsStrip() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.innerHTML += track.innerHTML;
    let pos = 0;
    let paused = false;
    let rafId;

    function tick() {
      if (!paused) {
        pos += 0.5;
        if (pos >= track.scrollWidth / 2) pos = 0;
        track.style.transform = `translateX(${-pos}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    track.addEventListener("mouseenter", () => (paused = true));
    track.addEventListener("mouseleave", () => (paused = false));

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="c-clients">
      <div className="c-container">
        <p className="c-clients__label">Ils nous ont fait confiance</p>
        <div className="c-clients-track-wrap">
          <div ref={trackRef} className="c-clients-track">
            {clients.map((c, i) => (
              <div key={i} className="c-client-card">
                <img src={c.img} alt={c.name} />
                <div className="c-client-card-name">{c.name}</div>
                <div className="c-client-card-tag">{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
