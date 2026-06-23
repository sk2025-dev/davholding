const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 11-9 11s-9-4-9-11a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6L12 13 2 6" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.11 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.72 3.03a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.96.35 1.98.6 3.03.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function ConsultingFooter() {
  return (
    <footer className="c-footer" aria-label="Pied de page DAV Consulting">
      <div className="c-container">
        <div className="c-footer__grid">
          <div>
            <div className="brand">
              <img src="/consulting/images/code.png" alt="DAV Consulting logo" />
              <h4>DAV Consulting</h4>
            </div>
            <p className="desc">Agence digitale — développement web & mobile, design et infrastructure. Basée à Abidjan.</p>
            <div className="c-footer__socials" aria-label="Réseaux sociaux">
              <a className="c-social-pill" href="#" aria-label="LinkedIn" title="LinkedIn">
                <img src="/consulting/images/link.png" alt="LinkedIn" />
              </a>
              <a className="c-social-pill" href="#" aria-label="WhatsApp" title="WhatsApp">
                <img src="/consulting/images/whatsapp.png" alt="WhatsApp" />
              </a>
              <a className="c-social-pill" href="#" aria-label="Instagram" title="Instagram">
                <img src="/consulting/images/instagram.png" alt="Instagram" />
              </a>
            </div>
          </div>

          <div>
            <p className="col-title">Services</p>
            <ul>
              <li><a href="#">Laravel / PHP</a></li>
              <li><a href="#">Flutter Mobile</a></li>
              <li><a href="#">React / Vue JS</a></li>
              <li><a href="#">Design UI/UX</a></li>
            </ul>
          </div>

          <div>
            <p className="col-title">Réalisations</p>
            <ul>
              <li><a href="#">Applications Mobile</a></li>
              <li><a href="#">Applications Web</a></li>
              <li><a href="#">APIs & Back-end</a></li>
            </ul>
          </div>

          <div>
            <p className="col-title">Contact</p>
            <ul>
              <li className="c-contact-line">
                <LocationIcon />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="c-contact-line">
                <MailIcon />
                <a href="mailto:contact@davconsulting.ci">contact@davconsulting.ci</a>
              </li>
              <li className="c-contact-line">
                <PhoneIcon />
                <a href="tel:+2250757249390">+225 07 57 24 93 90</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="c-footer__bar">
          <div className="left">© 2026 DAV Consulting — Tous droits réservés.</div>
          <div className="right">Côte d'Ivoire</div>
        </div>

        <div className="c-footer__watermark" aria-hidden="true">DAV'CONSULTING</div>
      </div>
    </footer>
  );
}
