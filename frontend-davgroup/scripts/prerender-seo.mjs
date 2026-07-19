import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { BEAUTY_FAQ } from "../src/components/Beaute/beauteFaqData.js";

const distDir = resolve("dist");
const template = await readFile(resolve(distDir, "index.html"), "utf8");
const siteUrl = (process.env.SITE_URL || "https://davholdinggroup.com").replace(/\/$/, "");

const pages = [
  {
    path: "beaute/realisations",
    title: "Salon de beauté à Cocody Angré | Dav’Beauté Abidjan",
    description: "Dav’Beauté, salon à Cocody Angré : coiffure, onglerie, spa, soins capillaires et cosmétiques à Abidjan. Découvrez nos réalisations et réservez en ligne.",
  },
  {
    path: "beaute/coiffures",
    title: "Coiffure à Cocody Angré | Dav’Beauté",
    description: "Coiffures protectrices, twists, tresses et coiffures enfants à Cocody Angré, Abidjan. Consultez les prestations Dav’Beauté et prenez rendez-vous.",
  },
  {
    path: "beaute/ongerie",
    title: "Onglerie à Cocody Angré | Dav’Beauté",
    description: "Pose d’ongles, gel, résine, nail art et French à Cocody Angré, Abidjan. Réservez votre séance chez Dav’Beauté.",
  },
  {
    path: "beaute/spa",
    title: "Spa et soins à Cocody Angré | Dav’Beauté",
    description: "Soins visage, massage et détente à Cocody Angré, Abidjan. Découvrez l’espace bien-être Dav’Beauté et réservez en ligne.",
  },
  {
    path: "beaute/capillaires",
    title: "Produits et soins capillaires à Abidjan | Dav’Beauté",
    description: "Découvrez les soins et produits capillaires Dav’Beauté à Abidjan : hydratation, pousse, entretien et protection des cheveux.",
  },
  {
    path: "beaute/cosmetiques",
    title: "Cosmétiques et soins du corps à Abidjan | Dav’Beauté",
    description: "Produits cosmétiques, soins du visage et du corps disponibles chez Dav’Beauté à Cocody Angré, Abidjan.",
  },
  {
    path: "beaute/about",
    title: "À propos de Dav’Beauté | Salon à Cocody Angré",
    description: "Découvrez Dav’Beauté, l’univers beauté de Dav’Holding Group situé à Cocody Angré, Abidjan.",
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

for (const page of pages) {
  const canonical = `${siteUrl}/${page.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/beaute/#salon`,
    name: "Dav’Beauté",
    description: page.description,
    url: `${siteUrl}/beaute/realisations`,
    image: `${siteUrl}/images/beaue2.webp`,
    logo: `${siteUrl}/images/beauté.png`,
    telephone: "+2250757249390",
    email: "davholdinggroup@davbeaute.ci",
    priceRange: "FCFA",
    currenciesAccepted: "XOF",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cocody Angré, 8e tranche",
      addressLocality: "Abidjan",
      addressRegion: "District autonome d’Abidjan",
      addressCountry: "CI",
    },
    areaServed: {
      "@type": "City",
      name: "Abidjan",
    },
    sameAs: [
      "https://www.facebook.com/Davi225",
      "https://www.instagram.com/davbeaute/",
      "https://www.tiktok.com/@dav_beaute",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2250757249390",
      contactType: "customer service",
      availableLanguage: "French",
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coiffure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Onglerie" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spa et soins beauté" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soins capillaires" } },
    ],
  };
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

  const seoMarkup = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="business.business" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${siteUrl}/images/beaue2.webp" />`,
    `<script id="beaute-local-business-schema" type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`,
    page.path === "beaute/realisations"
      ? `<script id="beaute-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema).replaceAll("<", "\\u003c")}</script>`
      : "",
  ].join("\n    ");

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace("</head>", `    ${seoMarkup}\n  </head>`);

  const outputDir = resolve(distDir, page.path);
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, "index.html"), html);
}

console.log(`SEO statique généré pour ${pages.length} pages Beauté.`);
