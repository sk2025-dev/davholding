import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 20, suffix: "+", label: "Projets livrés" },
  { target: 15, suffix: "+", label: "Clients satisfaits" },
  { target: 100, suffix: "%", label: "Taux de satisfaction" },
];

function CounterItem({ target, suffix, label }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="c-number-item c-reveal">
      <div className="c-number-val">
        {value}<span>{suffix}</span>
      </div>
      <div className="c-number-label">{label}</div>
    </div>
  );
}

export default function ConsultingNumbers() {
  return (
    <section className="c-numbers">
      <div className="c-container">
        <div className="c-numbers__grid">
          {stats.map((s, i) => (
            <CounterItem key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
