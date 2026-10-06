import { MenuItem, CampusLocation } from '../types';
import heroImage from '../assets/images/esp_hero_food_1786275292789.jpg';
import thiebouImage from '../assets/images/thiebou_jen_plate_1786380059882.jpg';
import bissapImage from '../assets/images/bissap_frais_jus_1786281830766.jpg';
import ditakhImage from '../assets/images/ditakh_frais_jus_1786282107666.jpg';
import gingembreImage from '../assets/images/gingembre_ananas_jus_1786282379719.jpg';
import bouyeImage from '../assets/images/bouye_creme_baobab_1786282668294.jpg';
import cocktailImage from '../assets/images/cocktail_fruits_exotiques_1786282747086.jpg';
import yassaImage from '../assets/images/yassa_poulet_senegal_1786369384343.jpg';
import mafeImage from '../assets/images/mafe_simple_ref_1786366797354.jpg';
import chickenPlatterImage from '../assets/images/dibiterie_poulet_frites_1786367000_1786367049525.jpg';
import chawarmaImage from '../assets/images/chawarma_poulet_frais_1786367300599.jpg';
import frenchTacosImage from '../assets/images/french_tacos_double_viande_1786367418983.jpg';
import thiakryImage from '../assets/images/thiakry_degue_bol_1786367707954.jpg';
import parfaitMangueImage from '../assets/images/parfait_mangue_passion_1786368164841.jpg';
import fruitSaladImage from '../assets/images/salade_fruits_frais_1786368634287.jpg';

export const HERO_IMAGE_URL = heroImage;

export const MENU_ITEMS: MenuItem[] = [
  // ------------------- PLATS TRADITIONNELS -------------------
  {
    id: 'm1',
    name: 'Thiebou jën',
    category: 'plats',
    description: 'Riz rouge traditionnel sénégalais cuit au bouillon de poisson avec thiof, manioc, carotte, chou et diakhassou. Le grand classique du Resto ESP !',
    normalPrice: 2500,
    isFreeForNewStudents: true,
    image: thiebouImage,
    prepTime: '10-15 min',
    calories: '650 kcal',
    spicyLevel: 'mild',
    tags: ['Spécialité ESP', 'Best-Seller', 'Incontournable'],
    options: [
      { name: 'Niveau de piment', choices: ['Piment doux', 'Sans piment', 'Piment fort (Rokh)'] },
      { name: 'Accompagnement', choices: ['Sauce Beugueul classique', 'Extra Légumes'] }
    ]
  },
  {
    id: 'm2',
    name: 'Yassa Poulet ESP Special',
    category: 'plats',
    description: 'Poulet mariné au citron du pays et moutarde, cuit lentement avec des oignons caramélisés. Servi chaud sur du riz blanc parfumé.',
    normalPrice: 2200,
    isFreeForNewStudents: true,
    image: yassaImage,
    prepTime: '12 min',
    calories: '580 kcal',
    spicyLevel: 'mild',
    tags: ['Recommandé BDE', 'Frais'],
    options: [
      { name: 'Part de poulet', choices: ['Cuisse', 'Blanc'] },
      { name: 'Sauce', choices: ['Sauce Yassa généreuse', 'Sauce à part'] }
    ]
  },
  {
    id: 'm3',
    name: 'Mafé Simple',
    category: 'plats',
    description: 'Riz blanc servi avec une sauce onctueuse à la pâte d’arachide faite maison et morceaux de bœuf tendres cuits en mijoté.',
    normalPrice: 2000,
    isFreeForNewStudents: true,
    image: mafeImage,
    prepTime: '10 min',
    calories: '720 kcal',
    spicyLevel: 'none',
    tags: ['Rassasiant', 'Traditionnel'],
    options: [
      { name: 'Riz', choices: ['Riz blanc', 'Riz brisé'] }
    ]
  },

  // ------------------- FAST FOOD & SNACKS -------------------
  {
    id: 'm5',
    name: 'Dibi Poulet & Frites Campus',
    category: 'fastfood',
    description: 'Morceaux de poulet grillés au feu de bois façon dibiterie sénégalaise, servis avec oignons marinés, piment vert et portion de frites croustillantes.',
    normalPrice: 2800,
    isFreeForNewStudents: true,
    image: chickenPlatterImage,
    prepTime: '15 min',
    calories: '800 kcal',
    spicyLevel: 'spicy',
    tags: ['Grillade', 'Favori Étudiants'],
    options: [
      { name: 'Sauce grillade', choices: ['Moutarde & Piment', 'Sauce Blanche', 'Ketchup'] }
    ]
  },
  {
    id: 'm6',
    name: 'Chawarma Poulet & Sauce Ail ESP',
    category: 'fastfood',
    description: 'Pain pita bien chaud rempli d’effiloché de poulet grillé épicé, frites dorées, salade fraîche et notre sauce à l’ail secrète du Foyer ESP.',
    normalPrice: 1800,
    isFreeForNewStudents: true,
    image: chawarmaImage,
    prepTime: '8 min',
    calories: '520 kcal',
    spicyLevel: 'mild',
    tags: ['Rapide', 'Sur le pouce'],
    options: [
      { name: 'Garniture', choices: ['Tout compris', 'Sans piment', 'Extra Fromage'] }
    ]
  },
  {
    id: 'm7',
    name: 'French Tacos L\'Ingénieur (2 Viandes)',
    category: 'fastfood',
    description: 'Galette de blé grillée, garnie de poulet crispy + viande hachée, frites croustillantes à l\'intérieur et notre généreuse sauce fromagère maison chaude.',
    normalPrice: 3000,
    isFreeForNewStudents: true,
    image: frenchTacosImage,
    prepTime: '12 min',
    calories: '920 kcal',
    spicyLevel: 'mild',
    tags: ['XXL', 'Sauce Fromagère', 'Ultra Gourmand'],
    options: [
      { name: 'Choix des viandes', choices: ['Poulet Crispy & Haché', 'Double Poulet', 'Haché & Merguez'] },
      { name: 'Sauce', choices: ['Sauce Algérienne', 'Sauce Blanche', 'Sauce Samouraï'] }
    ]
  },
  {
    id: 'm8',
    name: 'Burger Polytech Double Steak Cheddar',
    category: 'fastfood',
    description: 'Double steak haché grillé, fromage cheddar fondu, oignons caramélisés, cornichons, salade et frites de patate douce ou pomme de terre.',
    normalPrice: 2500,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    prepTime: '12 min',
    calories: '790 kcal',
    spicyLevel: 'none',
    tags: ['Gourmand', 'Double Steak']
  },
  {
    id: 'm9',
    name: 'Panini Poulet Fondu Cheddar & Mozza',
    category: 'fastfood',
    description: 'Pain panini ciabatta croustillant pressé à chaud, émincé de poulet épicé, fromage cheddar fondu et mozzarella filante.',
    normalPrice: 2000,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800',
    prepTime: '8 min',
    calories: '610 kcal',
    spicyLevel: 'none',
    tags: ['Fromage Fondu', 'Chaud & Croustillant']
  },
  {
    id: 'm11',
    name: 'Wrap Poulet Croustillant & Sauce Blanche',
    category: 'fastfood',
    description: 'Tortilla de blé roulée garnie de tenders de poulet pané croustillant, tomates fraîches, salade croquante et sauce blanche aux herbes.',
    normalPrice: 1900,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=800',
    prepTime: '7 min',
    calories: '540 kcal',
    spicyLevel: 'none',
    tags: ['Fresh', 'Poulet Crispy']
  },
  {
    id: 'm12',
    name: 'Pizza Campus Reine (Poulet & Fromage)',
    category: 'fastfood',
    description: 'Pizza artisanale cuite au four, sauce tomate aromatisée, généreuse mozzarella, dés de poulet rôti, champignons frais et origan.',
    normalPrice: 3200,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    prepTime: '15 min',
    calories: '850 kcal',
    spicyLevel: 'none',
    tags: ['Pizza Artisanale', 'À Partager']
  },
  {
    id: 'm13',
    name: 'Bucket 10 Nuggets Croustillants & Frites',
    category: 'fastfood',
    description: '10 nuggets de filet de poulet pur croustillants accompagnés d\'une grande frite et de 2 sauces au choix (BBQ, Mayo, Ketchup).',
    normalPrice: 2600,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    prepTime: '10 min',
    calories: '710 kcal',
    spicyLevel: 'none',
    tags: ['Bucket', '10 Pièces']
  },
  {
    id: 'm14',
    name: 'Pastels au Poisson (Portion de 6)',
    category: 'fastfood',
    description: 'Petits beignets dorés croustillants farcis au poisson assaisonné au persil et ail, servis avec sauce tomate épicée.',
    normalPrice: 1200,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 min',
    calories: '380 kcal',
    spicyLevel: 'spicy',
    tags: ['Snack', 'Populaire']
  },

  // ------------------- JUS & BOISSONS FRAÎCHES (STRICTEMENT SANS CAFÉ) -------------------
  {
    id: 'm15',
    name: 'Jus de Bissap Rouge Frais (50cl)',
    category: 'boissons',
    description: 'Infusion artisanale de fleurs d’hibiscus du Sénégal parfumée à la menthe fraîche, vanille et une touche de fleur d’oranger.',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: bissapImage,
    prepTime: 'Immédiat',
    calories: '120 kcal',
    spicyLevel: 'none',
    tags: ['Nectar Sénégalais', '100% Naturel', 'Très Frais'],
    options: [
      { name: 'Glaçons', choices: ['Bien Glacé', 'Température Ambiante'] }
    ]
  },
  {
    id: 'm16',
    name: 'Jus de Bouye Pur Baobab (50cl)',
    category: 'boissons',
    description: 'Jus traditionnel crémeux au pain de singe (fruit du baobab), concentré de lait et vanille. Énergétique et idéal pour les révisions !',
    normalPrice: 800,
    isFreeForNewStudents: true,
    image: bouyeImage,
    prepTime: 'Immédiat',
    calories: '210 kcal',
    spicyLevel: 'none',
    tags: ['Crémeux', 'Boost Énergie', 'Favori']
  },
  {
    id: 'm17',
    name: 'Jus de Ditakh Frais (50cl)',
    category: 'boissons',
    description: 'Boisson rafraîchissante couleur émeraude à base du fruit exotique Ditakh, riche en vitamine C.',
    normalPrice: 700,
    isFreeForNewStudents: true,
    image: ditakhImage,
    prepTime: 'Immédiat',
    calories: '110 kcal',
    spicyLevel: 'none',
    tags: ['Vitamine C', 'Artisanal']
  },
  {
    id: 'm18',
    name: 'Jus de Gingembre Épicé & Ananas (50cl)',
    category: 'boissons',
    description: 'Pressage de gingembre frais relevé de jus d\'ananas sucré et de menthe poivrée. Un booster tonique rafraîchissant.',
    normalPrice: 700,
    isFreeForNewStudents: true,
    image: gingembreImage,
    prepTime: 'Immédiat',
    calories: '130 kcal',
    spicyLevel: 'mild',
    tags: ['Gingembre Frais', 'Tonique', 'Glace']
  },
  {
    id: 'm19',
    name: 'Cocktail Fruits Exotiques Frais (50cl)',
    category: 'boissons',
    description: 'Mélange glacé 100% fruits frais : Mangue sénégalaise, Fruit de la passion, Ananas et jus d\'orange fraîchement pressé.',
    normalPrice: 1000,
    isFreeForNewStudents: true,
    image: cocktailImage,
    prepTime: '3 min',
    calories: '160 kcal',
    spicyLevel: 'none',
    tags: ['Cocktail Vitaminé', '100% Fruits']
  },
  {
    id: 'm20',
    name: 'Citronnade Menthe Fraîche Glacée (50cl)',
    category: 'boissons',
    description: 'Jus de citrons verts pressés à froid avec feuilles de menthe pilées et glace pilée. Hyper désaltérant sous le soleil de Dakar.',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    prepTime: '2 min',
    calories: '90 kcal',
    spicyLevel: 'none',
    tags: ['Citronnade', 'Ultra Désaltérant']
  },
  {
    id: 'm21',
    name: 'Smoothie Mangue Papaye Onctueux (50cl)',
    category: 'boissons',
    description: 'Smoothie velouté aux mangues de Sangalkam et papaye fraîche mixées au yaourt doux et touche de miel.',
    normalPrice: 1200,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 min',
    calories: '220 kcal',
    spicyLevel: 'none',
    tags: ['Smoothie Velouté', 'Mangue Douce']
  },
  {
    id: 'm22',
    name: 'Jus d\'Orange Pressé 100% Pur Jus (50cl)',
    category: 'boissons',
    description: 'Oranges douces pressées à la commande, sans aucun sucre ajouté. Plein de vitamine C pur.',
    normalPrice: 900,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    prepTime: '2 min',
    calories: '140 kcal',
    spicyLevel: 'none',
    tags: ['Pur Jus', 'Vitamine C']
  },

  // ------------------- DESSERTS & SUCRÉS -------------------
  {
    id: 'm23',
    name: 'Thiakry / Dêguë Crémeux (Bol)',
    category: 'desserts',
    description: 'Couscous de mil cuit à la vapeur mélangé avec du yaourt crémeux, du lait concentré, du sucre vanillé et de la noix de coco râpée.',
    normalPrice: 1000,
    isFreeForNewStudents: true,
    image: thiakryImage,
    prepTime: 'Immédiat',
    calories: '340 kcal',
    spicyLevel: 'none',
    tags: ['Dessert Onctueux', 'Tradition']
  },
  {
    id: 'm24',
    name: 'Crêpe Gourmande Nutella Banane & Noisettes',
    category: 'desserts',
    description: 'Grande crêpe faite maison garnie de Nutella fondant, rondelles de bananes fraîches et éclats de noisettes torréfiées.',
    normalPrice: 1500,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    prepTime: '6 min',
    calories: '480 kcal',
    spicyLevel: 'none',
    tags: ['Crêpe Chaud', 'Nutella']
  },
  {
    id: 'm25',
    name: 'Gaufre Croustillante Chocolat & Chantilly',
    category: 'desserts',
    description: 'Gaufre liégeoise dorée et croustillante, nappée de sauce chocolat chaud et d\'un dôme de crème chantilly vanillée.',
    normalPrice: 1600,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
    prepTime: '7 min',
    calories: '520 kcal',
    spicyLevel: 'none',
    tags: ['Gaufre Liégeoise', 'Chantilly']
  },
  {
    id: 'm26',
    name: 'Milkshake Onctueux Vanille OREO',
    category: 'desserts',
    description: 'Crème glacée vanille artisanale mixée au lait frais et biscuits OREO concassés, surmontée de chantilly et d\'un biscuit OREO entier.',
    normalPrice: 1800,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    prepTime: '4 min',
    calories: '560 kcal',
    spicyLevel: 'none',
    tags: ['Milkshake Glacé', 'Oreo Crush']
  },
  {
    id: 'm27',
    name: 'Parfait Glacé Mangue-Passion & Coulis',
    category: 'desserts',
    description: 'Verrine glacée superposant de la glace vanille, des dés de mangue fraîche croquante et un coulis pur fruit de la passion.',
    normalPrice: 1400,
    isFreeForNewStudents: true,
    image: parfaitMangueImage,
    prepTime: '2 min',
    calories: '310 kcal',
    spicyLevel: 'none',
    tags: ['Frais & Glacé', 'Mangue-Passion']
  },
  {
    id: 'm28',
    name: 'Fondant au Chocolat Cœur Coulant',
    category: 'desserts',
    description: 'Gâteau moelleux au chocolat noir intense avec un cœur chaud et coulant, servi tiède.',
    normalPrice: 1300,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 min',
    calories: '420 kcal',
    spicyLevel: 'none',
    tags: ['Chocolat Noir', 'Cœur Coulant']
  },
  {
    id: 'm29',
    name: 'Tiramisu Speculoos & Caramel Beurre Salé',
    category: 'desserts',
    description: 'Crémeux mascarpone léger, biscuits Speculoos croustillants imbibés et coulis de caramel au beurre salé.',
    normalPrice: 1700,
    isFreeForNewStudents: true,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    prepTime: 'Immédiat',
    calories: '450 kcal',
    spicyLevel: 'none',
    tags: ['Speculoos', 'Mascarpone']
  },
  {
    id: 'm30',
    name: 'Salade de Fruits Fraîcheur Exotique',
    category: 'desserts',
    description: 'Mélange rafraîchissant de dés d\'ananas, raisins, cerises, melon et poire dans leur jus naturel, servi bien frais.',
    normalPrice: 1200,
    isFreeForNewStudents: true,
    image: fruitSaladImage,
    prepTime: 'Immédiat',
    calories: '180 kcal',
    spicyLevel: 'none',
    tags: ['Vitamines & Frais', '100% Naturel']
  }
];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'pav_a',
    name: 'Pavillon A (Résidence Étudiante)',
    type: 'pavillon',
    description: 'Zone d’habitation universitaire principale (A1 à A8)'
  },
  {
    id: 'pav_b',
    name: 'Pavillon B (Résidence Étudiante)',
    type: 'pavillon',
    description: 'Pavillon des étudiants en licence et master'
  },
  {
    id: 'pav_c',
    name: 'Pavillon C (Nouveaux Blocs)',
    type: 'pavillon',
    description: 'Nouveaux bâtiments de logement universitaire ESP'
  },
  {
    id: 'pav_g',
    name: 'Pavillon G (Résidence Étudiante)',
    type: 'pavillon',
    description: 'Pavillon G de la résidence universitaire ESP'
  },
  {
    id: 'dept_info',
    name: 'Génie Informatique (DGI)',
    type: 'departement',
    description: 'Laboratoires de code, Salles TP et Amphi Info'
  },
  {
    id: 'dept_elec',
    name: 'Génie Électrique (DGE)',
    type: 'departement',
    description: 'Ateliers et laboratoires d’électricité'
  },
  {
    id: 'dept_meca',
    name: 'Génie Mécanique (DGM)',
    type: 'departement',
    description: 'Ateliers de conception et fabrication mécanique'
  },
  {
    id: 'dept_chim',
    name: 'Génie Chimique & Biologie (DGCBA)',
    type: 'departement',
    description: 'Laboratoires de chimie et biologie appliquée'
  },
  {
    id: 'dept_gest',
    name: 'Département Gestion (DEG)',
    type: 'departement',
    description: 'Salles de cours et administration management'
  },
  {
    id: 'amphi_central',
    name: 'Grand Amphi Amadou Lamine Ndiaye',
    type: 'amphi',
    description: 'Amphithéâtre central pour conférences et cours magistraux'
  },
  {
    id: 'foyer',
    name: 'Foyer des Étudiants ESP',
    type: 'service',
    description: 'Espace détente, babyfoot et terrasse'
  },
  {
    id: 'biblio',
    name: 'Bibliothèque Universitaire ESP',
    type: 'service',
    description: 'Salle de lecture silencieuse et espace recherche'
  }
];

export const DEPARTMENTS_LIST = [
  'Génie Informatique (DGI)',
  'Génie Électrique (DGE)',
  'Génie Mécanique (DGM)',
  'Génie Chimique (DGCBA)',
  'Gestion & Administration (DEG)',
  'Génie Civil (DGC)'
];

export const LEVELS_LIST = [
  'DUT 1ère Année (Nouvel Étudiant)',
  'DST 1ère Année (Nouvel Étudiant)',
  'DIC 1ère Année (Ingénieur Nouveau)',
  'Licence'
];
