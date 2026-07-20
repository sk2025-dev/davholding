export const sectionTabs = [
  { label: "Accueil", to: "/davbeaute" },
  {
    label: "Prestations",
    children: [
      { label: "Coiffures", to: "/beaute/coiffures" },
      { label: "Onglerie", to: "/beaute/ongerie" },
      { label: "Spa & détente", to: "/beaute/spa" },
    ],
  },
  {
    label: "Boutique",
    children: [
      { label: "Produits capillaires", to: "/beaute/capillaires" },
      { label: "Produits cosmétiques", to: "/beaute/cosmetiques" },
    ],
  },
  { label: "À propos", to: "/beaute/about" },
];

export const realisationCategories = [
  {
    title: "Nos micro twistes",
    emphasis: "réalisés",
    subtitle: "Tressage · Twists · Protectrice",
    images: [
      { src: "/images/twis.jpeg", alt: "Micro twist 1" },
      { src: "/images/twis1.jpeg", alt: "Micro twist 2" },
      { src: "/images/twist6.jpeg", alt: "Micro twist 3" },
      { src: "/images/twistcourte_rempli.jpeg", alt: "Micro twist 4" },
      { src: "/images/twistcourte.jpeg", alt: "Micro twist 5" },
      { src: "/images/twistslongremplir.jpeg", alt: "Micro twist 6" },
    ],
  },
  {
    title: "Nos coiffures",
    emphasis: "enfants",
    subtitle: "Nattes · Tresses · Micro-Twist",
    images: [
      { src: "/images/debut.webp", alt: "Coiffure enfant 1 réalisée à Cocody Angré" },
      { src: "/images/fin.webp", alt: "Coiffure enfant 2 réalisée à Cocody Angré" },
      { src: "/images/mimi.webp", alt: "Coiffure enfant 3 réalisée à Cocody Angré" },
      { src: "/images/silicone.webp", alt: "Coiffure enfant 4 réalisée à Cocody Angré" },
      { src: "/images/toutmeche.webp", alt: "Coiffure enfant 5 réalisée à Cocody Angré" },
      { src: "/images/mamouch.webp", alt: "Coiffure enfant 6" },
    ],
  },
  {
    title: "Pose",
    emphasis: "ongles",
    subtitle: "Gel · Résine · Nail art · French",
    images: [
      { src: "/images/rougebordauongle.jpg", alt: "Pose ongles 1" },
      { src: "/images/onglet blanccourt.jpg", alt: "Pose ongles 2" },
      { src: "/images/ongletlong.jpg", alt: "Pose ongles 3" },
      { src: "/images/elegant.jpg", alt: "Pose ongles 4" },
      { src: "/images/mignon.jpg", alt: "Pose ongles 5" },
      { src: "/images/designmarron.jpg", alt: "Pose ongles 6" },
    ],
  },
  {
    title: "Dernière",
    emphasis: "session spa",
    subtitle: "Soins visage · Massage · Détente",
    images: [
      { src: "/images/spa1.jpeg", alt: "Session spa 1" },
      { src: "/images/spa2.jpeg", alt: "Session spa 2" },
      { src: "/images/spa3.jpeg", alt: "Session spa 3" },
      { src: "/images/spa4.jpeg", alt: "Session spa 4" },
      { src: "/images/spa7.jpeg", alt: "Session spa 5" },
      { src: "/images/spa6.jpeg", alt: "Session spa 6" },
    ],
  },
];

export const capillaires = [
  {
    title: "Hydratation profonde",
    text: "Pour redonner souplesse, éclat et tenue aux cheveux.",
  },
  {
    title: "Entretien régulier",
    text: "Lavage, démêlage et soin pour garder des cheveux sains.",
  },
  {
    title: "Mise en forme",
    text: "Coiffage soigné, finition propre et rendu durable.",
  },
  {
    title: "Protection & réparation",
    text: "Une approche douce pour préserver la fibre capillaire.",
  },
];

export const capillaryProducts = [
  {
    title: "Duo Black Pouss",
    type: "Soin pousse capillaire",
    price: "14 000 FCFA",
    badge: "Best-seller",
    image: "/images/duoblack.webp",
    description:
      "Duo complet formulé pour stimuler et accélérer la pousse des cheveux noirs. Enrichi en actifs naturels africains, il fortifie la racine et favorise des cheveux plus longs et plus denses.",
  },
  {
    title: "Duo Pousse Accéléré",
    type: "Traitement pousse intensif",
    price: "14 000 FCFA",
    badge: "Nouveau",
    image: "/images/accelere.webp",
    description:
      "Double action pousse et nutrition : active la circulation du cuir chevelu et nourrit la fibre capillaire en profondeur. Résultats visibles dès les premières semaines.",
  },
  {
    title: "Huile Black Plus",
    type: "Huile capillaire concentrée",
    price: "5 000 FCFA",
    image: "/images/blackplus.webp",
    description:
      "Huile concentrée aux extraits botaniques spécialement pensée pour les cheveux noirs et texturés. Illumine, nourrit en profondeur et renforce chaque mèche sans alourdir.",
  },
  {
    title: "Huile Simple Pousse",
    type: "Huile pousse quotidienne",
    price: "7 000 FCFA",
    image: "/images/che.webp",
    description:
      "Huile légère à utiliser au quotidien pour stimuler naturellement la pousse. Pénètre facilement sans alourdir, hydrate durablement et fortifie le cheveu de la racine aux pointes.",
  },
  {
    title: "Shampoing et Démêlant Aloe Vera",
    type: "Huile pousse quotidienne",
    price: "10 000 FCFA",
    image: "/images/aloevera.webp",
    description:
      "Shampoing et démêlant pensée pour nettoyer en douceur, préserver l’hydratation et faciliter le coiffage au quotidien.",
  },
  {
    title: "Shampoing gimgimbre",
    type: "Assouplissant",
    price: "10 000 FCFA",
    image: "/images/duogimgimbre.webp",
    description:
      "Formule assouplissante qui aide à discipliner les cheveux tout en gardant une texture souple, légère et agréable au toucher.",
  },
  {
    title: "Crème capillaire",
    type: "Assouplissant",
    price: "10 000 FCFA",
    image: "/images/cremecapi.webp",
    description:
      "Crème capillaire nourrissante pour améliorer la souplesse, protéger les longueurs et garder une finition plus nette.",
  },
];

export const coiffures = [
  {
    title: "Coiffures protectrices",
    text: "Twists, tresses et styles durables pour petits et grands.",
  },
  {
    title: "Coiffures enfants",
    text: "Des looks pratiques, soignés et adaptés au quotidien.",
  },
  {
    title: "Twists & nattes",
    text: "Un rendu net, élégant et visuellement maîtrisé.",
  },
  {
    title: "Conseil coiffure",
    text: "Choisir la coiffure la plus adaptée à votre texture et style.",
  },
];

export const cosmetiques = [
  {
    title: "Crèmes de corps ",
    text: "Hydratation, éclat et confort au quotidien.",
  },
  {
    title: "Gels douche",
    text: "Des textures agréables et des senteurs propres.",
  },
  {
    title: "Soins visage",
    text: "Nettoyer, nourrir et révéler la peau avec douceur.",
  },
  {
    title: "Produits de beauté",
    text: "Une sélection pensée pour prolonger l’effet salon.",
  },
];

export const cosmetiqueProducts = [
  {
    title: "Crème nourrissante avocat",
    type: "Crème de corps 250ml",
    price: "8 000 FCFA",
    badge: "Best-seller",
    image: "/images/cremeavocat.webp",
    description:
      "Crème riche à l'avocat pour hydrater en profondeur et nourrir la peau.",
  },
  {
    title: "Crème cacao & karité",
    type: "Crème de corps 250ml",
    price: "8 000 FCFA",
    image: "/images/cremecacaco.webp",
    description:
      "Crème gourmande au cacao et beurre de karité pour une peau douce.",
  },
  {
    title: "Crème carotte éclaircissante",
    type: "Crème de corps 250ml",
    price: "8 500 FCFA",
    image: "/images/cremecarotte.webp",
    description:
      "Crème enrichie à la carotte pour unifier et éclaircir le teint.",
  },
  {
    title: "Crème curcuma anti-âge",
    type: "Crème de corps 250ml",
    price: "8 500 FCFA",
    image: "/images/cremecucuma.webp",
    description:
      "Crème au curcuma pour tonifier et lutter contre les signes du temps.",
  },
  {
    title: "Crème oeuf & miel",
    type: "Crème de corps 250ml",
    price: "8 000 FCFA",
    image: "/images/cremeoeuf.webp",
    description:
      "Crème nourrissante à l'oeuf et miel pour une peau revitalisée.",
  },
  {
    title: "Huile de corps",
    type: "Huile de corps 250ml",
    price: "8 500 FCFA",
    image: "/images/oil.webp",
    description:
      "Huile légère à l'oeuf et miel pour nourrir et illuminer la peau.",
  },
  {
    title: "Gel douche curcuma",
    type: "Gel douche 300ml",
    price: "6 000 FCFA",
    image: "/images/savoncarotte.webp",
    description: "Gel doux parfumé au curcuma — nettoyage et douceur.",
  },

  {
    title: "Savon avocat & miel",
    type: "Savon artisanal",
    price: "2 500 FCFA",
    image: "/images/savoncitron.webp",
    description: "Savon surgras à l'avocat et miel pour une peau souple.",
  },
  {
    title: "Savon au miel",
    type: "Savon artisanal",
    price: "2 500 FCFA",
    image: "/images/savonmiel.webp",
    description: "Savon surgras à l'avocat et miel pour une peau souple.",
  },
  {
    title: "Gommage à l'aloe vera",
    type: "gommage corps 100ml",
    price: "7 500 FCFA",
    image: "/images/gelaloevera.webp",
    description: "Gel douche ultra gommant pour une peau belle et fraiche .",
  },
  {
    title: "Gommage oeuf & miel",
    type: "Gommage corporel",
    price: "6 500 FCFA",
    image: "/images/gelgommantoeuf.webp",
    description: "Exfolie en douceur pour un grain de peau affiné.",
  },
  {
    title: "Gommage au curcurma",
    type: "Soin corps 50ml",
    price: "12 000 FCFA",
    badge: "Nouveau",
    image: "/images/gelcurcuma.webp",
    description:
      "Soin quotidien pour unifier et éclaircir légèrement le teint.",
  },
];

export const cosmetiqueKits = [
  {
    title: "Kit visage teint caramel",
    type: "Kit de soins 3 produits",
    price: "18 000 FCFA",
    badge: "Best-seller",
    image: "/images/kit riz-caramel.webp",
    description:
      "Kit complet pour une routine visage optimale : nettoyant, soin et crème hydratante.",
  },
  {
    title: "Kit de visage teint claire et Metisse",
    type: "Kit de soins 3 produits",
    price: "16 000 FCFA",
    badge: "Nouveau",
    image: "/images/kitbananemetisse.webp",
    description:
      "Kit purifiant avec masque détox, tonique et séréconciliateur pour une peau nettoyée en profondeur.",
  },
  {
    title: "Kit de visage teint marron",
    type: "Kit de soins 3 produits",
    price: "20 000 FCFA",
    image: "/images/kitmarron.webp",
    description:
      "Kit spécial pour l'unification du teint et l'éclat naturel, avec actifs éclaircissants.",
  },
];

export const nailServices = [
  {
    title: "Nail art & manucure",
    text: "Pose soignée, couleur, forme et finition raffinée.",
    image: "/images/bako.webp",
  },
];

export const spaServices = [
  {
    title: "Spa visage",
    text: "Des soins doux pour détendre et rafraîchir la peau.",
    image: "/images/madame k.webp",
  },
];

/* Alias conservé pour compatibilité */
export const spaAndNails = [...nailServices, ...spaServices];
