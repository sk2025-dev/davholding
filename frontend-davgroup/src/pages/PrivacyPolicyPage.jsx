import { Link } from "react-router-dom";
import "../styles/LegalPage.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__container">
        <Link to="/" className="legal-page__back">← Retour à l'accueil</Link>

        <div className="legal-page__draft-notice">
          ⚠️ Document provisoire — ce texte générique doit être relu et validé par un juriste avant publication officielle.
        </div>

        <h1>Politique de confidentialité</h1>
        <p className="legal-page__updated">Dernière mise à jour : à compléter</p>

        <h2>1. Qui sommes-nous</h2>
        <p>
          Ce site est édité par DAV Holding Group ("nous"), regroupant les activités Dav'Beauté et Dav Consulting.
          Pour toute question relative à cette politique, contactez-nous à l'adresse indiquée en page Contact.
        </p>

        <h2>2. Données que nous collectons</h2>
        <p>
          Selon les services utilisés, nous pouvons collecter : nom, prénom, email, téléphone, adresse de livraison,
          historique de commandes et de rendez-vous, et des données techniques (adresse IP, type de navigateur).
        </p>

        <h2>3. Cookies</h2>
        <p>
          Nous utilisons des cookies pour :
        </p>
        <ul>
          <li>Assurer le fonctionnement technique du site (connexion, panier d'achat) ;</li>
          <li>Mémoriser vos préférences (ex : votre choix concernant ce bandeau de consentement) ;</li>
          <li>Mesurer la fréquentation du site, le cas échéant.</li>
        </ul>
        <p>
          Vous pouvez à tout moment supprimer les cookies stockés via les paramètres de votre navigateur.
        </p>

        <h2>4. Utilisation des données</h2>
        <p>
          Vos données sont utilisées pour traiter vos commandes et rendez-vous, vous contacter au sujet de votre
          compte, et améliorer nos services. Nous ne vendons pas vos données à des tiers.
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Vous pouvez demander l'accès, la rectification ou la suppression de vos données personnelles en nous
          contactant directement.
        </p>

        <h2>6. Contact</h2>
        <p>
          Pour toute question relative à vos données personnelles, contactez-nous via les coordonnées disponibles
          sur la page Contact du site.
        </p>
      </div>
    </div>
  );
}
