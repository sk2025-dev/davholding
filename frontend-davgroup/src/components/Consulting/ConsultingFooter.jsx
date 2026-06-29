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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a className="c-social-pill" href="#" aria-label="WhatsApp" title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
              </a>
              <a className="c-social-pill" href="#" aria-label="Instagram" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
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
