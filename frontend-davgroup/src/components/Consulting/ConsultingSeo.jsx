import { useEffect } from "react";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://davholdinggroup.com").replace(/\/$/, "");
const PAGE_URL = `${SITE_URL}/davconsulting`;
const TITLE = "Dav'Consulting | Développement web, mobile, design & IT à Abidjan";
const DESCRIPTION =
  "Pôle technologique de Dav'Holding Group SARL à Abidjan : applications web et mobile, identité visuelle, infrastructure IT et solutions métiers.";
const SOCIAL_IMAGE = `${SITE_URL}/consulting/images/femmedev.png`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Dav'Holding Group SARL",
      url: SITE_URL,
      logo: `${SITE_URL}/consulting/images/code.png`,
      email: "contact@davholdinggroup.com",
      telephone: "+2250566232575",
      department: { "@id": `${PAGE_URL}#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${PAGE_URL}#organization`,
      name: "Dav'Consulting",
      alternateName: "Dav Consulting",
      description: DESCRIPTION,
      url: PAGE_URL,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      founder: { "@id": `${PAGE_URL}#founder` },
      areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
      knowsAbout: [
        "Développement web",
        "Développement mobile",
        "Applications métier",
        "Design UI/UX",
        "Identité visuelle",
        "Systèmes d'information géographique",
        "Infrastructure IT",
        "Cybersécurité",
      ],
    },
    {
      "@type": "Person",
      "@id": `${PAGE_URL}#founder`,
      name: "Serge-Olivier Kouakou Kassi",
      jobTitle: "Gérant et ingénieur informaticien",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Groupe EDHEC Abidjan",
      },
      knowsAbout: [
        "Génie logiciel",
        "Développement web et mobile",
        "Systèmes d'information géographique",
        "Géomatique",
        "Pilotage de projets",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "fr-CI",
      about: { "@id": `${PAGE_URL}#organization` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dav'Holding Group",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr-CI",
    },
    ...[
      ["Développement Web & Mobile", "Solutions métiers, plateformes digitales et applications sur mesure."],
      ["Design & Identité Visuelle", "Logos, chartes graphiques, interfaces UI/UX et supports de marque."],
      ["IT, Réseaux & Sécurité", "Hébergement, serveurs, vidéosurveillance et protection des données."],
    ].map(([name, description], index) => ({
      "@type": "Service",
      "@id": `${PAGE_URL}#service-${index + 1}`,
      name,
      description,
      provider: { "@id": `${PAGE_URL}#organization` },
      areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
    })),
    ...[
      ["Présence digitale", 400000],
      ["Application métier", 1500000],
      ["Solution complète + IA", 2800000],
    ].map(([name, minPrice], index) => ({
      "@type": "Offer",
      "@id": `${PAGE_URL}#offer-${index + 1}`,
      name,
      url: `${PAGE_URL}#offres`,
      offeredBy: { "@id": `${PAGE_URL}#organization` },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice,
        priceCurrency: "XOF",
        valueAddedTaxIncluded: false,
      },
    })),
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: [
        [
          "Dav'Consulting est-il une société indépendante ?",
          "Non. Dav'Consulting est le pôle technologique de Dav'Holding Group SARL, aux côtés de Dav'Beauté et Dav'Market.",
        ],
        [
          "Quels services propose Dav'Consulting ?",
          "Dav'Consulting conçoit des sites, applications web et mobiles, identités visuelles, interfaces UI/UX, infrastructures IT et solutions de sécurité.",
        ],
        [
          "Quel budget prévoir pour démarrer un projet ?",
          "Les offres commencent à 400 000 FCFA pour une présence digitale, 1 500 000 FCFA pour une application métier et 2 800 000 FCFA pour une solution métier avec IA.",
        ],
        [
          "Travaillez-vous avec les PME et les institutions ?",
          "Oui. L'expérience de Dav'Consulting couvre les PME, l'immobilier, les projets institutionnels, la géomatique, REDD+, le MINEF et l'Agence Emploi Jeune.",
        ],
      ].map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ],
};

function setMeta(selector, attributes, restoreCallbacks) {
  let element = document.head.querySelector(selector);
  const previousAttributes = element
    ? Object.fromEntries(Object.keys(attributes).map((name) => [name, element.getAttribute(name)]))
    : null;
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  restoreCallbacks.push(() => {
    if (!previousAttributes) {
      element.remove();
      return;
    }
    Object.entries(previousAttributes).forEach(([name, value]) => {
      if (value === null) element.removeAttribute(name);
      else element.setAttribute(name, value);
    });
  });
}

export default function ConsultingSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = TITLE;
    const restoreCallbacks = [];

    [
      ['meta[name="description"]', { name: "description", content: DESCRIPTION }],
      ['meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large" }],
      ['meta[property="og:type"]', { property: "og:type", content: "website" }],
      ['meta[property="og:locale"]', { property: "og:locale", content: "fr_CI" }],
      ['meta[property="og:site_name"]', { property: "og:site_name", content: "Dav'Holding Group" }],
      ['meta[property="og:title"]', { property: "og:title", content: TITLE }],
      ['meta[property="og:description"]', { property: "og:description", content: DESCRIPTION }],
      ['meta[property="og:url"]', { property: "og:url", content: PAGE_URL }],
      ['meta[property="og:image"]', { property: "og:image", content: SOCIAL_IMAGE }],
      ['meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" }],
      ['meta[name="twitter:title"]', { name: "twitter:title", content: TITLE }],
      ['meta[name="twitter:description"]', { name: "twitter:description", content: DESCRIPTION }],
      ['meta[name="twitter:image"]', { name: "twitter:image", content: SOCIAL_IMAGE }],
    ].forEach(([selector, attributes]) => {
      setMeta(selector, attributes, restoreCallbacks);
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = PAGE_URL;
    restoreCallbacks.push(() => {
      if (previousCanonical === null) canonical.remove();
      else canonical.href = previousCanonical;
    });

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.id = "consulting-structured-data";
    jsonLd.textContent = JSON.stringify(structuredData);
    document.head.appendChild(jsonLd);

    return () => {
      document.title = previousTitle;
      jsonLd.remove();
      restoreCallbacks.forEach((restore) => restore());
    };
  }, []);

  return null;
}
