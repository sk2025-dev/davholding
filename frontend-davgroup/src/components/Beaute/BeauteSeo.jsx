import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BEAUTY_FAQ } from "./beauteFaqData";

const PAGE_META = {
  "/davbeaute": {
    title: "Salon de beauté à Cocody Angré | Dav’Beauté Abidjan",
    description: "Dav’Beauté, salon à Cocody Angré : coiffure, onglerie, spa, soins capillaires et cosmétiques à Abidjan. Découvrez nos réalisations et réservez en ligne.",
  },
  "/beaute/coiffures": {
    title: "Coiffure à Cocody Angré | Dav’Beauté",
    description: "Coiffures protectrices, twists, tresses et coiffures enfants à Cocody Angré, Abidjan. Consultez les prestations Dav’Beauté et prenez rendez-vous.",
  },
  "/beaute/ongerie": {
    title: "Onglerie à Cocody Angré | Dav’Beauté",
    description: "Pose d’ongles, gel, résine, nail art et French à Cocody Angré, Abidjan. Réservez votre séance chez Dav’Beauté.",
  },
  "/beaute/spa": {
    title: "Spa et soins à Cocody Angré | Dav’Beauté",
    description: "Soins visage, massage et détente à Cocody Angré, Abidjan. Découvrez l’espace bien-être Dav’Beauté et réservez en ligne.",
  },
  "/beaute/capillaires": {
    title: "Produits et soins capillaires à Abidjan | Dav’Beauté",
    description: "Découvrez les soins et produits capillaires Dav’Beauté à Abidjan : hydratation, pousse, entretien et protection des cheveux.",
  },
  "/beaute/cosmetiques": {
    title: "Cosmétiques et soins du corps à Abidjan | Dav’Beauté",
    description: "Produits cosmétiques, soins du visage et du corps disponibles chez Dav’Beauté à Cocody Angré, Abidjan.",
  },
  "/beaute/about": {
    title: "À propos de Dav’Beauté | Salon à Cocody Angré",
    description: "Découvrez Dav’Beauté, l’univers beauté de Dav’Holding Group situé à Cocody Angré, Abidjan.",
  },
};

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function BeauteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META["/davbeaute"];
    const canonicalUrl = `${window.location.origin}${pathname}`;
    document.title = meta.title;
    setMeta('meta[name="description"]', { name: "description", content: meta.description });
    setMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "business.business" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: `${window.location.origin}/images/beaue2.webp` });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schema = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "@id": `${window.location.origin}/davbeaute#salon`,
      name: "Dav’Beauté",
      url: `${window.location.origin}/davbeaute`,
      image: `${window.location.origin}/images/beaue2.webp`,
      logo: `${window.location.origin}/images/beauté.png`,
      telephone: "+2250757249390",
      email: "davholdinggroup@davbeaute.ci",
      priceRange: "FCFA",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cocody Angré, 8e tranche",
        addressLocality: "Abidjan",
        addressCountry: "CI",
      },
      areaServed: { "@type": "City", name: "Abidjan" },
      sameAs: [
        "https://www.facebook.com/Davi225",
        "https://www.instagram.com/davbeaute/",
        "https://www.tiktok.com/@dav_beaute",
      ],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coiffure" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Onglerie" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spa et soins beauté" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soins capillaires" } },
      ],
    };

    let script = document.getElementById("beaute-local-business-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "beaute-local-business-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: BEAUTY_FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    let faqScript = document.getElementById("beaute-faq-schema");
    if (pathname === "/davbeaute") {
      if (!faqScript) {
        faqScript = document.createElement("script");
        faqScript.id = "beaute-faq-schema";
        faqScript.type = "application/ld+json";
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify(faqSchema);
    } else if (faqScript) {
      faqScript.remove();
    }
  }, [pathname]);

  return null;
}
