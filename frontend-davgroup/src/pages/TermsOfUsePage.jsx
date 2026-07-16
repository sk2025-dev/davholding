import { Link } from "react-router-dom";
import "../styles/LegalPage.css";

export default function TermsOfUsePage() {
  return (
    <div className="legal-page">
      <div className="legal-page__container">
        <Link to="/" className="legal-page__back">← Retour à l'accueil</Link>

        <div className="legal-page__draft-notice">
          ⚠️ Document provisoire — ce texte générique doit être relu et validé par un juriste avant publication officielle.
        </div>

        <h1>Conditions d'utilisation</h1>
        <p className="legal-page__updated">Dernière mise à jour : à compléter</p>

        <h2>1. Objet</h2>
        <p>
          Les présentes conditions régissent l'utilisation du site DAV Holding Group et de ses espaces
          Dav'Beauté et Dav Consulting. En utilisant ce site, vous acceptez ces conditions.
        </p>

        <h2>2. Services proposés</h2>
        <p>
          Le site permet notamment : la présentation des activités du groupe, la vente en ligne de produits et
          services beauté, la prise de rendez-vous, et la présentation des services de conseil et développement.
        </p>

        <h2>3. Comptes utilisateurs</h2>
        <p>
          La création d'un compte peut être nécessaire pour certains services (commandes, rendez-vous). Vous êtes
          responsable de la confidentialité de vos identifiants de connexion.
        </p>

        <h2>4. Commandes et paiements</h2>
        <p>
          Les commandes passées via le site sont soumises à disponibilité des produits/services. Les modalités de
          paiement et de livraison sont précisées au moment de la commande.
        </p>

        <h2>5. Responsabilité</h2>
        <p>
          Nous mettons tout en œuvre pour assurer l'exactitude des informations publiées, mais ne pouvons garantir
          l'absence totale d'erreurs. Nous déclinons toute responsabilité en cas d'interruption temporaire du service.
        </p>

        <h2>6. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos) est protégé et ne peut être reproduit
          sans autorisation préalable.
        </p>

        <h2>7. Droit applicable</h2>
        <p>
          Les présentes conditions sont régies par le droit ivoirien. Tout litige relève de la compétence des
          juridictions d'Abidjan, Côte d'Ivoire.
        </p>

        <h2>8. Contact</h2>
        <p>
          Pour toute question relative à ces conditions, contactez-nous via les coordonnées disponibles sur la
          page Contact du site.
        </p>
      </div>
    </div>
  );
}
