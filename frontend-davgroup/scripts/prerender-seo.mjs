import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { BEAUTY_FAQ } from "../src/components/Beaute/beauteFaqData.js";

const distDir = resolve("dist");
const template = await readFile(resolve(distDir, "index.html"), "utf8");
const siteUrl = (process.env.SITE_URL || "https://davholdinggroup.com").replace(/\/$/, "");

const pages = [
  {
    path: "davbeaute",
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
    "@id": `${siteUrl}/davbeaute#salon`,
    name: "Dav’Beauté",
    description: page.description,
    url: `${siteUrl}/davbeaute`,
    image: `${siteUrl}/images/beaue2.webp`,
    logo: `${siteUrl}/images/beauté.png`,
    telephone: "+2250757249390",
    email: "contact@davholdinggroup.com",
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
    `<script id="beaute-local-business-schema" type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`,
    page.path === "davbeaute"
      ? `<script id="beaute-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema).replaceAll("<", "\\u003c")}</script>`
      : "",
  ].join("\n    ");

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<meta property="og:type" content=".*?" \/>/,
      '<meta property="og:type" content="business.business" />',
    )
    .replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    )
    .replace(
      /<meta property="og:image" content=".*?" \/>/,
      `<meta property="og:image" content="${siteUrl}/images/beaue2.webp" />`,
    )
    .replace(
      /<meta property="og:image:secure_url" content=".*?" \/>/,
      `<meta property="og:image:secure_url" content="${siteUrl}/images/beaue2.webp" />`,
    )
    .replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    )
    .replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<meta name="twitter:image" content=".*?" \/>/,
      `<meta name="twitter:image" content="${siteUrl}/images/beaue2.webp" />`,
    )
    .replace("</head>", `    ${seoMarkup}\n  </head>`);

  const outputDir = resolve(distDir, page.path);
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, "index.html"), html);
}

const legacyBeautyPath = resolve(distDir, "beaute/realisations");
await mkdir(legacyBeautyPath, { recursive: true });
await writeFile(
  resolve(legacyBeautyPath, "index.html"),
  `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${siteUrl}/davbeaute" />
    <meta http-equiv="refresh" content="0;url=${siteUrl}/davbeaute" />
    <title>Redirection vers Dav’Beauté</title>
    <script>window.location.replace("/davbeaute" + window.location.search + window.location.hash);</script>
  </head>
  <body>
    <p>Cette page a changé d’adresse. <a href="/davbeaute">Accéder à Dav’Beauté</a>.</p>
  </body>
</html>`,
);

const consultingPage = {
  path: "davconsulting",
  title: "Dav'Consulting | Développement web, mobile, design & IT à Abidjan",
  description:
    "Dav'Consulting accompagne entreprises et institutions en développement web et mobile, conception graphique, infrastructure IT et vidéosurveillance à Abidjan.",
  image: `${siteUrl}/consulting/images/femmedev.png`,
};
const consultingCanonical = `${siteUrl}/${consultingPage.path}`;
const consultingSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${consultingCanonical}#organization`,
  name: "Dav'Consulting",
  url: consultingCanonical,
  description: consultingPage.description,
  image: consultingPage.image,
  logo: `${siteUrl}/consulting/images/code.png`,
  telephone: "+2250566232575",
  email: "contact@davholdinggroup.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cocody Angré, 8e tranche",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Dav'Holding Group SARL",
    url: siteUrl,
  },
};

const replaceMetaContent = (html, selector, value) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta (${escapedSelector}) content="[^"]*" \\/>`,
  );
  return html.replace(pattern, `<meta ${selector} content="${escapeHtml(value)}" />`);
};

let consultingHtml = template
  .replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(consultingPage.title)}</title>`,
  )
  .replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${escapeHtml(consultingPage.description)}" />`,
  )
  .replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${escapeHtml(consultingCanonical)}" />`,
  );

consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:title"',
  consultingPage.title,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:description"',
  consultingPage.description,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:url"',
  consultingCanonical,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:image"',
  consultingPage.image,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:image:secure_url"',
  consultingPage.image,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:image:type"',
  "image/png",
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'property="og:image:alt"',
  "Dav'Consulting — solutions technologiques à Abidjan",
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'name="twitter:title"',
  consultingPage.title,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'name="twitter:description"',
  consultingPage.description,
);
consultingHtml = replaceMetaContent(
  consultingHtml,
  'name="twitter:image"',
  consultingPage.image,
);
consultingHtml = consultingHtml.replace(
  "</head>",
  `    <script id="consulting-organization-schema" type="application/ld+json">${JSON.stringify(consultingSchema).replaceAll("<", "\\u003c")}</script>\n  </head>`,
);

const consultingOutputDir = resolve(distDir, consultingPage.path);
await mkdir(consultingOutputDir, { recursive: true });
await writeFile(resolve(consultingOutputDir, "index.html"), consultingHtml);

const legacyConsultingPath = resolve(distDir, "consulting");
await mkdir(legacyConsultingPath, { recursive: true });
await writeFile(
  resolve(legacyConsultingPath, "index.html"),
  `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${siteUrl}/davconsulting" />
    <meta http-equiv="refresh" content="0;url=${siteUrl}/davconsulting" />
    <title>Redirection vers Dav’Consulting</title>
    <script>window.location.replace("/davconsulting" + window.location.search + window.location.hash);</script>
  </head>
  <body>
    <p>Cette page a changé d’adresse. <a href="/davconsulting">Accéder à Dav’Consulting</a>.</p>
  </body>
</html>`,
);

console.log(
  `SEO statique généré pour ${pages.length} pages Beauté et la page Consulting.`,
);
