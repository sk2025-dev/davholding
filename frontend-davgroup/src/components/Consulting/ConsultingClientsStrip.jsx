const clients = [
  { img: "/consulting/images/AEJ.png", name: "Agence Emploi Jeunes", tag: "Emploi & RH" },
  { img: "/consulting/images/logo dav beauty.png", name: "Dav' Beauté", tag: "Projet interne — Groupe DAV" },
  { img: "/consulting/images/metho.jpg", name: "Application Métho", tag: "Web · Gestion" },
  { img: "/consulting/images/pointage.png", name: "Application PRE", tag: "Mobile · Présence" },
];

export default function ConsultingClientsStrip() {
  return (
    <section className="c-clients">
      <div className="c-container">
        <p className="c-clients__label">Ils nous ont fait confiance</p>
        <div className="c-clients-grid">
          {clients.map((client) => (
            <div key={client.name} className="c-client-card c-reveal">
              <img src={client.img} alt={client.name} />
              <div className="c-client-card-name">{client.name}</div>
              <div className="c-client-card-tag">{client.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
