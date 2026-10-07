import { MenuItem, CampusLocation } from '../types';
import heroImage from '../assets/images/esp_hero_food_1786275292789.jpg';
import burgerPouletImg from '../assets/images/burger_poulet_menu_1791318581191.jpg';
import burgerViandeImg from '../assets/images/burger_viande_menu_1791318596477.jpg';
import burgerHotDogImg from '../assets/images/hot_dog_gourmet_1791358676387.jpg';
import fatayaImg from '../assets/images/fataya_senegal_menu_1791318612059.jpg';
import fatayaCompletImg from '../assets/images/fataya_complet_plat_1791358663894.jpg';
import fritesImg from '../assets/images/frites_sauce_menu_1791318626889.jpg';
import ketchupImg from '../assets/images/sauce_ketchup_1791319621583.jpg';
import mayonnaiseImg from '../assets/images/sauce_mayonnaise_1791319677329.jpg';
import sauceSamouraiImg from '../assets/images/sauce_samourai_1791319699425.jpg';
import sauceBarbecueImg from '../assets/images/sauce_barbecue_1791319735502.jpg';
import dessertsImg from '../assets/images/desserts_fruits_boissons_1791318642017.jpg';
import agrumesImg from '../assets/images/schweppes_agrumes_1791359847096.jpg';
import cocaImg from '../assets/images/coca_bouteille_1791358718613.jpg';
import spriteImg from '../assets/images/sprite_bouteille_1791358696303.jpg';
import fantaImg from '../assets/images/fanta_bouteille_1791358687294.jpg';
import chawarmaImage from '../assets/images/chawarma_poulet_frais_1786367300599.jpg';
import chawarmaViandeImg from '../assets/images/chawarma_viande_1791319532323.jpg';
import bissapImage from '../assets/images/bissap_frais_jus_1786281830766.jpg';
import ditakhImage from '../assets/images/ditakh_frais_jus_1786282107666.jpg';
import bouyeImage from '../assets/images/bouye_creme_baobab_1786282668294.jpg';
import fruitSaladImage from '../assets/images/salade_fruits_frais_1786368634287.jpg';
import parfaitMangueImage from '../assets/images/parfait_mangue_passion_1786368164841.jpg';
import ananasImg from '../assets/images/ananas_lamelles_1791359338000.jpg';
import mangueImg from '../assets/images/mangue_fraiche_1791359352929.jpg';
import orangesImg from '../assets/images/oranges_fraiches_1791359364462.jpg';
import mandarineImg from '../assets/images/mandarine_fraiche_1791359373551.jpg';
import pommesImg from '../assets/images/pommes_fraiches_1791359385191.jpg';
import bananesImg from '../assets/images/bananes_fraiches_1791359394486.jpg';

export const HERO_IMAGE_URL = heroImage;

export const RESTAURANT_CONTACT = {
  phone: '+221 33 844 01 01',
  phoneRaw: '+221338440101',
  name: 'Les Polytechniciens • Resto ESP',
  location: 'École Supérieure Polytechnique (UCAD Dakar)'
};

export const MENU_ITEMS: MenuItem[] = [
  // ----------------------------------------------------
  // 1. FAST FOOD (1 seul au choix par étudiant)
  // ----------------------------------------------------
  {
    id: 'ff-1',
    name: 'Burger Poulet',
    category: 'fastfood',
    description: 'Filet de poulet croustillant et doré, fromage fondu, salade fraîche et sauce burger douce dans un pain brioché aux graines de sésame.',
    normalPrice: 2200,
    isFreeForNewStudents: true,
    image: burgerPouletImg,
    prepTime: '8-10 min',
    calories: '540 kcal',
    spicyLevel: 'none',
    tags: ['Best-Seller', 'Poulet Croustillant', 'Fast Food'],
    options: [
      { name: 'Cuisson & Saveur', choices: ['Classique fondant', 'Extra grillé'] }
    ]
  },
  {
    id: 'ff-2',
    name: 'Burger Hot-Dog + Fromage',
    category: 'fastfood',
    description: 'Pain toasté moelleux garni de saucisse savoureuse, fromage fondu généreux, moutarde douce et oignons dorés caramélisés.',
    normalPrice: 2000,
    isFreeForNewStudents: true,
    image: burgerHotDogImg,
    prepTime: '6-8 min',
    calories: '490 kcal',
    spicyLevel: 'none',
    tags: ['Fromage Fondu', 'Gourmand', 'Fast Food']
  },
  {
    id: 'ff-3',
    name: 'Burger Viande',
    category: 'fastfood',
    description: 'Steak pur bœuf haché grillé à la flamme, cheddar fondant, tomate, oignons rouges et sauce maison onctueuse.',
    normalPrice: 2400,
    isFreeForNewStudents: true,
    image: burgerViandeImg,
    prepTime: '8-10 min',
    calories: '580 kcal',
    spicyLevel: 'none',
    tags: ['Pur Bœuf', 'Cheddar', 'Incontournable']
  },
  {
    id: 'ff-4',
    name: 'Chawarma Poulet',
    category: 'fastfood',
    description: 'Émincé de poulet tendre mariné aux épices douces, crème à l\'ail toum libanaise et frites croustillantes roulés dans du pain libanais chaud.',
    normalPrice: 2300,
    isFreeForNewStudents: true,
    image: chawarmaImage,
    prepTime: '7-9 min',
    calories: '520 kcal',
    spicyLevel: 'none',
    tags: ['Poulet Mariné', 'Pain Libanais', 'Culte ESP']
  },
  {
    id: 'ff-5',
    name: 'Chawarma Viande',
    category: 'fastfood',
    description: 'Fines lamelles de bœuf assaisonnées et saisies à la plancha, sauce tahina au sésame, persil, oignons et tomates fraîches.',
    normalPrice: 2500,
    isFreeForNewStudents: true,
    image: chawarmaViandeImg,
    prepTime: '7-9 min',
    calories: '560 kcal',
    spicyLevel: 'none',
    tags: ['Bœuf Plancha', 'Sauce Sésame', 'Savoureux']
  },
  {
    id: 'ff-6',
    name: 'Fataya Simple',
    category: 'fastfood',
    description: 'Chausson doré sénégalais croustillant et feuilleté, généreusement farci à la viande hachée bien épicée et servi avec sa sauce tomate kaani.',
    normalPrice: 1800,
    isFreeForNewStudents: true,
    image: fatayaImg,
    prepTime: '5-7 min',
    calories: '430 kcal',
    spicyLevel: 'mild',
    tags: ['Spécialité Sénégalaise', 'Croustillant', 'Sauce Kaani']
  },
  {
    id: 'ff-7',
    name: 'Fataya Complet',
    category: 'fastfood',
    description: 'Grand fataya sénégalais croustillant complet garni de viande hachée mijotée, œuf et frites fondantes, un vrai régal réconfortant.',
    normalPrice: 2200,
    isFreeForNewStudents: true,
    image: fatayaCompletImg,
    prepTime: '6-8 min',
    calories: '590 kcal',
    spicyLevel: 'mild',
    tags: ['Complet avec Œuf', 'Ultra Rassasiant', 'Favori Campus']
  },

  // ----------------------------------------------------
  // 2. ACCOMPAGNANTS (1 seul au choix par étudiant)
  // ----------------------------------------------------
  {
    id: 'acc-1',
    name: 'Frites',
    category: 'accompagnants',
    description: 'Portion généreuse de frites de pommes de terre fraîches dorées à souhait, croustillantes à l\'extérieur et moelleuses à l\'intérieur.',
    normalPrice: 1000,
    isFreeForNewStudents: true,
    image: fritesImg,
    prepTime: '5 min',
    calories: '310 kcal',
    spicyLevel: 'none',
    tags: ['Frites Dorées', 'Croustillantes', 'Accompagnant']
  },
  {
    id: 'acc-2',
    name: 'Ketchup',
    category: 'accompagnants',
    description: 'Sauce ketchup onctueuse, douce et fruitée à base de tomates mûres de première qualité.',
    normalPrice: 300,
    isFreeForNewStudents: true,
    image: ketchupImg,
    prepTime: 'Instantané',
    calories: '40 kcal',
    spicyLevel: 'none',
    tags: ['Sauce Douce', 'Tomate']
  },
  {
    id: 'acc-3',
    name: 'Mayonnaise',
    category: 'accompagnants',
    description: 'Sauce mayonnaise crémeuse et onctueuse préparée dans la tradition pour accompagner vos snacks.',
    normalPrice: 300,
    isFreeForNewStudents: true,
    image: mayonnaiseImg,
    prepTime: 'Instantané',
    calories: '90 kcal',
    spicyLevel: 'none',
    tags: ['Sauce Onctueuse', 'Crémeuse']
  },
  {
    id: 'acc-4',
    name: 'Sauce Samourai',
    category: 'accompagnants',
    description: 'Sauce samouraï relevée et pimentée à la perfection, pour les étudiants qui aiment le goût épicé.',
    normalPrice: 400,
    isFreeForNewStudents: true,
    image: sauceSamouraiImg,
    prepTime: 'Instantané',
    calories: '85 kcal',
    spicyLevel: 'spicy',
    tags: ['Pimenté', 'Sauce Épicée', 'Samouraï']
  },
  {
    id: 'acc-5',
    name: 'Sauce Barbecue',
    category: 'accompagnants',
    description: 'Sauce barbecue fumée aux arômes caramélisés intenses pour napper vos frites et burgers.',
    normalPrice: 400,
    isFreeForNewStudents: true,
    image: sauceBarbecueImg,
    prepTime: 'Instantané',
    calories: '55 kcal',
    spicyLevel: 'none',
    tags: ['Fumée', 'Caramélisée', 'BBQ']
  },

  // ----------------------------------------------------
  // 3. DESSERTS (Boissons fraîches & Fruits) (1 seul au choix par étudiant)
  // ----------------------------------------------------
  {
    id: 'des-1',
    name: 'Coca Cola',
    category: 'desserts',
    description: 'Bouteille en verre fraîche de Coca-Cola classique bien glacée avec fines bulles pétillantes.',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: cocaImg,
    prepTime: 'Immédiat',
    calories: '140 kcal',
    tags: ['Bouteille Verre', 'Glacé', 'Sodas']
  },
  {
    id: 'des-2',
    name: 'Sprite',
    category: 'desserts',
    description: 'Bouteille fraîche de Sprite citron-lime ultra rafraîchissante et désaltérante.',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: spriteImg,
    prepTime: 'Immédiat',
    calories: '130 kcal',
    tags: ['Bouteille', 'Citron-Lime', 'Sodas']
  },
  {
    id: 'des-3',
    name: 'Fanta',
    category: 'desserts',
    description: 'Bouteille fraîche de Fanta orange pétillant aux saveurs fruitées et vitaminées.',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: fantaImg,
    prepTime: 'Immédiat',
    calories: '135 kcal',
    tags: ['Bouteille', 'Saveur Orange', 'Sodas']
  },
  {
    id: 'des-4',
    name: 'Agrumes',
    category: 'desserts',
    description: 'Boisson gazeuse fraîche aux extraits d\'agrumes ensoleillés (orange, pamplemousse, mandarine).',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: agrumesImg,
    prepTime: 'Immédiat',
    calories: '120 kcal',
    tags: ['Agrumes', 'Désaltérant', 'Frais']
  },
  {
    id: 'des-5',
    name: 'Bouye',
    category: 'desserts',
    description: 'Pur jus naturel de pain de singe (fruit du baobab sénégalais) onctueux, riche en vitamine C et parfumé.',
    normalPrice: 800,
    isFreeForNewStudents: true,
    image: bouyeImage,
    prepTime: 'Frais',
    calories: '180 kcal',
    tags: ['Jus Naturel', 'Baobab Pur', 'Local Sénégal']
  },
  {
    id: 'des-6',
    name: 'Bissap',
    category: 'desserts',
    description: 'Infusion froide traditionnelle de fleurs d\'hibiscus rouge du Sénégal avec touche de menthe fraîche.',
    normalPrice: 700,
    isFreeForNewStudents: true,
    image: bissapImage,
    prepTime: 'Frais',
    calories: '110 kcal',
    tags: ['Hibiscus Rouge', 'Menthe', 'Boisson Locale']
  },
  {
    id: 'des-7',
    name: 'Ditakh',
    category: 'desserts',
    description: 'Jus sauvage de ditakh frais du pays, couleur verte naturelle, acidulé, savoureux et plein d\'énergie.',
    normalPrice: 800,
    isFreeForNewStudents: true,
    image: ditakhImage,
    prepTime: 'Frais',
    calories: '125 kcal',
    tags: ['Ditakh Sauvage', 'Frais & Énergisant', 'Local']
  },
  {
    id: 'des-8',
    name: 'Banane',
    category: 'desserts',
    description: 'Banane fraîche et mûre du Sénégal, douce et nourrissante pour faire le plein d\'énergie après les cours.',
    normalPrice: 500,
    isFreeForNewStudents: true,
    image: bananesImg,
    prepTime: 'Immédiat',
    calories: '105 kcal',
    tags: ['Fruit Frais', 'Naturel', 'Énergie']
  },
  {
    id: 'des-9',
    name: 'Pomme',
    category: 'desserts',
    description: 'Pomme entière rouge ou bicolore, bien croquante, juteuse et rafraîchissante.',
    normalPrice: 600,
    isFreeForNewStudents: true,
    image: pommesImg,
    prepTime: 'Immédiat',
    calories: '85 kcal',
    tags: ['Fruit Croquant', 'Vitamines', 'Frais']
  },
  {
    id: 'des-10',
    name: 'Mandarine',
    category: 'desserts',
    description: 'Mandarine de saison juteuse, facile à éplucher avec un parfum d\'agrume tonique.',
    normalPrice: 500,
    isFreeForNewStudents: true,
    image: mandarineImg,
    prepTime: 'Immédiat',
    calories: '50 kcal',
    tags: ['Mandarine', 'Agrume Frais', 'Sucré']
  },
  {
    id: 'des-11',
    name: 'Orange',
    category: 'desserts',
    description: 'Belle orange fraîche de table, gorgée de jus naturel et riche en vitamine C.',
    normalPrice: 500,
    isFreeForNewStudents: true,
    image: orangesImg,
    prepTime: 'Immédiat',
    calories: '65 kcal',
    tags: ['Orange', 'Vitamine C', 'Fruit']
  },
  {
    id: 'des-12',
    name: 'Salade de fruits',
    category: 'desserts',
    description: 'Coupe gourmande de fruits frais de saison coupés en dés (mangue, ananas, papaye, orange) au jus de passion.',
    normalPrice: 1200,
    isFreeForNewStudents: true,
    image: fruitSaladImage,
    prepTime: 'Frais',
    calories: '130 kcal',
    tags: ['Cocktail de Fruits', 'Frais du Jour', 'Gourmand']
  },
  {
    id: 'des-13',
    name: 'Mangue',
    category: 'desserts',
    description: 'Portion de mangue sénégalaise mûre et parfumée, chair dorée sucrée et fondante en bouche.',
    normalPrice: 800,
    isFreeForNewStudents: true,
    image: mangueImg,
    prepTime: 'Frais',
    calories: '95 kcal',
    tags: ['Mangue du Pays', 'Fondante', 'Sucrée']
  },
  {
    id: 'des-14',
    name: 'Lamelles d\'ananas',
    category: 'desserts',
    description: 'Tranches d\'ananas frais pelées et découpées en lamelles, juteuses, acidulées et dorées.',
    normalPrice: 800,
    isFreeForNewStudents: true,
    image: ananasImg,
    prepTime: 'Frais',
    calories: '80 kcal',
    tags: ['Ananas Frais', 'Lamelles', 'Exotique']
  }
];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'pav_a',
    name: 'Pavillon A (Résidence Étudiante)',
    type: 'pavillon',
    description: 'Chambres des nouveaux étudiants - Couloir Principal'
  },
  {
    id: 'pav_b',
    name: 'Pavillon B (Résidence Universitaire)',
    type: 'pavillon',
    description: 'Chambres universitaires bloc B'
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
