import { useEffect, useState } from "react";
import "../../styles/BeauteTestimonials.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export default function BeauteTestimonials() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/testimonials`, { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setItems(data?.data || []))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="beauty-testimonials" aria-labelledby="testimonials-title">
      <header>
        <span>Paroles de clientes</span>
        <h2 id="testimonials-title">Elles partagent leur expérience.</h2>
        <p>Des témoignages publiés depuis notre espace d’administration.</p>
      </header>
      <div className="beauty-testimonials__grid">
        {items.map((item) => (
          <article className="beauty-testimonial" key={item.id}>
            <div className="beauty-testimonial__head">
              {item.photo_url ? <img src={item.photo_url} alt="" loading="lazy" decoding="async" /> : <span>{item.client_name.charAt(0)}</span>}
              <div><strong>{item.client_name}</strong>{item.service && <small>{item.service}</small>}</div>
            </div>
            {item.rating && <div className="beauty-testimonial__stars" aria-label={`${item.rating} étoiles sur 5`}>{"★".repeat(item.rating)}<span>{"★".repeat(5 - item.rating)}</span></div>}
            <blockquote>“{item.content}”</blockquote>
            {item.source && (item.source_url
              ? <a href={item.source_url} target="_blank" rel="noopener noreferrer">Avis publié sur {item.source}</a>
              : <small>Source : {item.source}</small>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
