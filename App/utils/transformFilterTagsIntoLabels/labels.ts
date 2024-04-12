export type LabelValueItem = {
  label: string;
  value: string;
  count?: number;
  trackingId?: string;
};

export type SearchListItem = {
  label: string;
  value: string | Array<LabelValueItem>;
  trackingId?: string;
  count?: number;
  icon?: string;
  isModelItem?: boolean;
};

export const distanceByCode: Record<number, string> = {
  1: '10',
  2: '20',
  3: '50',
  4: '100',
  5: '200',
};

export const autovizaLabel = 'Historique du véhicule';
export const priceDropLabel = 'Baisse de prix récente';
export const conversionBonusEligibilityLabel = 'Prime à la conversion';
export const firstHandLabel = 'Première main';
export const fourWheelDriveLabel = '4 roues motrices';

export const critAirFilterLabel = "CRIT'AIR";
export const customerFamilyFilterLabel = 'TYPE DE VENDEUR';
export const ownersFilterLabel = 'NOMBRE DE PROPRIÉTAIRE';
export const seatsFilterLabel = 'NOMBRE DE PLACES';

export const ownersMaxPlaceholder = 'Maximum de propriétaires';

export const networkWarrantyLabel = 'Véhicule certifié';
export const networkWarrantiesLabel = 'Labels de certification';

export const autonomyLabel = 'Autonomie';
export const autonomyUnit = 'km';
export const batteryCapacityLabel = 'Capacité';
export const batteryCapacityUnit = 'kw';
export const batteryConsumptionLabel = 'Consommation';
export const batteryConsumptionUnit = 'kw/100km';

export const priceLabels = {
  price: 'Prix',
  monthlyPrice: 'Mensualité',
};

export const priceLabelByIndex = {
  price: 0,
  monthlyPrice: 1,
};

export const goodDealLabel = {
  VERY_GOOD_DEAL: 'Très bonne affaire',
  GOOD_DEAL: 'Bonne affaire',
  EQUITABLE_DEAL: 'Offre équitable',
  BAD_DEAL: 'Au-dessus du marché',
  OFF_MARKET: 'Hors marché',
  NOT_COMPUTED: 'Analyse indisponible',
};

export const longLabelByVertical = {
  car: 'voiture',
  carTruck: 'voiture',
  truck: 'utilitaire',
  moto: 'moto',
  scooter: 'scooter',
  quad: 'quad',
};

export const labelByVerticalWithIcon = {
  car: 'berline',
  carTruck: 'berline',
  truck: 'fourgon',
  moto: 'moto',
  scooter: 'scooter',
  quad: 'quad',
};

export const prefixByVertical = {
  car: 'de ',
  carTruck: 'de ',
  truck: "d'",
  moto: 'de ',
  scooter: 'de ',
  quad: 'de ',
};

export const labelByMainVerticals = {
  // car: 'Voitures',
  carTruck: 'Voitures',
  truck: 'Utilitaires',
  moto: 'Motos',
};

export const labelByMotoVerticals = {
  moto: 'Motos',
  scooter: 'Scooters',
  quad: 'Quads',
};

export const homeLabelByVertical = {
  ...labelByMainVerticals,
  ...labelByMotoVerticals,
};

export const homeLabelByMotoIndexVertical = {
  moto: 0,
  scooter: 1,
  quad: 2,
};

export const shortLabelByVertical = {
  car: 'auto',
  carTruck: 'auto',
  truck: 'utilitaire',
  moto: 'moto',
  scooter: 'scooter',
  quad: 'quad',
};

export const labelByCategory = {
  '40': 'Citadine',
  '41_42': 'Berline',
  '43': 'Break',
  '44': 'Monospace',
  '45': 'Coupé',
  '46': 'Cabriolet',
  '47': '4x4, SUV & Crossover',
  '48': 'Sans permis',
  '50': 'Pick-up',
  '60': 'Custom',
  '61': 'Offroad',
  '62': 'Roadster',
  '63': 'GT',
  '64': 'Mini moto',
  '65': 'Mobylette',
  '66': 'Supermotard',
  '67': 'Trail',
  '68': 'Sportive',
  '69': 'Side-car',
  '70': 'Quad',
  '71': 'Scooter',
  '80': 'Voiture société, commerciale',
  '81': 'Fourgon (moins de 3,5 t)',
  '82': 'Bus et minibus',
  '83': 'Camion (plus de 3,5 t)',
  '85': 'Fourgonnette',
};

export const labelByCategoryWithIcon = {
  40: 'citadine',
  '41_42': 'berline',
  43: 'break',
  44: 'monospace',
  45: 'coupe',
  46: 'cabriolet',
  47: '4x4',
  48: 'citadine',
  50: 'pickup',
  64: 'miniMoto',
  70: 'quad',
  71: 'scooter',
  80: 'citadine',
  81: 'fourgon',
  82: 'busMinibus',
  83: 'camion',
  85: 'fourgonnette',
  60: 'custom',
  61: 'offroad',
  62: 'roadster',
  63: 'gt',
  65: 'mobylette',
  66: 'supermotard',
  67: 'trail',
  68: 'sportive',
  69: 'side-car',
};

export const categoryByLabel = {
  citadine: 40,
  berline: '41_42',
  break: 43,
  monospace: 44,
  coupe: 45,
  cabriolet: 46,
  '4x4': 47,
  suv_4x4_crossover: 47,
  pickup: 50,
  miniMoto: 64,
  quad: 70,
  scooter: 71,
  fourgon: 85,
  busMinibus: 82,
  camion: 83,
  fourgonnette: 85,
  custom: 60,
  offroad: 61,
  roadster: 62,
  gt: 63,
  mobylette: 65,
  supermotard: 66,
  trail: 67,
  sportive: 68,
  'side-car': 69,
  voitures_societes_commerciales: 80,
  fourgons_moins_de_3_5_t: 81,
  camions_plus_de_3_5_t: 83,
};

export const labelByCustomerType = {
  PART: 'Particulier',
  PRO: 'Professionnel',
  COLLABORATEUR: 'Collaborateur',
};

export const labelByCustomerFamily = {
  AGENT: 'Agent',
  CENTRE_MULTIMARQUES: 'Centre multimarques',
  CONCESSIONNAIRE: 'Concessionnaire',
  GARAGISTE: 'Garagiste',
  LOUEUR: 'Loueur',
  PART: 'Particulier',
  REPARATEUR_AGREE: 'Réparateur agréé',
  INTERMEDIAIRE: 'Intermédiaire',
  DISTANCE: '100% à distance',
};

export const labelByEnergy = {
  dies: 'Diesel',
  ess: 'Essence',
  elec: 'Électrique',
  hyb: 'Hybrides',
  plug_hyb: 'Hybrides rechargeables',
  not_plug_hyb: 'Hybrides non rechargeables',
  gpl: 'Bicarburation essence / GPL',
  eth: 'Bicarburation essence bioéthanol',
  alt: 'Autres énergies alternatives',
};

export const labelByOptionEquipement: Record<string, string> = {
  TOIT_OUVRANT: 'Toit ouvrant',
  ATTELAGE: 'Attelage',
  CLIMATISATION: 'Climatisation',
  GPS: 'GPS',
  CAMERA_RECUL: 'Caméra de recul',
  RADAR_RECUL: 'Radar de recul',
  CUIR: 'Cuir',
  BLUETOOTH: 'Bluetooth',
  TOIT_PANORAMIQUE: 'Toit panoramique',
  REGULATEUR: 'Régulateur',
  CARPLAY: 'Carplay',
  PALETTE: 'Palette',
  GRIP_CONTROL: 'Grip control',
};

export const labelByEquipmentLevel = {
  3: 'Très bien équipé',
  2: 'Bien équipé',
  1: 'Equipement standard',
};

export const labelByGearbox = {
  AUTO: 'Boîte automatique',
  MANUAL: 'Boîte manuelle',
};

export const shortLabelByGearbox = {
  AUTO: 'Automatique',
  MANUAL: 'Manuelle',
};

export const labelByMedia: Record<string, string> = {
  1: 'Photo(s)',
  4: '360°',
  3: 'Diaporama',
};

export const labelAllWarranty = 'Toutes garanties';

export const labelByRegion: Record<string, string> = {
  'FR-ARA': 'Auvergne-Rhône-Alpes',
  'FR-BFC': 'Bourgogne-Franche-Comté',
  'FR-BRE': 'Bretagne',
  'FR-CVL': 'Centre-Val de Loire',
  'FR-COR': 'Corse',
  'FR-GES': 'Grand Est',
  'FR-HDF': 'Hauts-de-France',
  'FR-IDF': 'Île-de-France',
  'FR-NOR': 'Normandie',
  'FR-NAQ': 'Nouvelle-Aquitaine',
  'FR-OCC': 'Occitanie',
  'FR-PDL': 'Pays de la Loire',
  'FR-PAC': "Provence-Alpes-Côte d'Azur",
};

export const labelByDepartment: Record<string, string> = {
  '01': 'Ain',
  '02': 'Aisne',
  '03': 'Allier',
  '04': 'Alpes-de-Haute-Provence',
  '05': 'Hautes-Alpes',
  '06': 'Alpes-Maritimes',
  '07': 'Ardèche',
  '08': 'Ardennes',
  '09': 'Ariège',
  '10': 'Aube',
  '11': 'Aude',
  '12': 'Aveyron',
  '13': 'Bouches-du-Rhône',
  '14': 'Calvados',
  '15': 'Cantal',
  '16': 'Charente',
  '17': 'Charente-Maritime',
  '18': 'Cher',
  '19': 'Corrèze',
  '2A': 'Corse-du-Sud',
  '2B': 'Haute-Corse',
  '20': 'Corse',
  '21': "Côte-d'Or",
  '22': "Côtes-d'Armor",
  '23': 'Creuse',
  '24': 'Dordogne',
  '25': 'Doubs',
  '26': 'Drôme',
  '27': 'Eure',
  '28': 'Eure-et-Loir',
  '29': 'Finistère',
  '30': 'Gard',
  '31': 'Haute-Garonne',
  '32': 'Gers',
  '33': 'Gironde',
  '34': 'Hérault',
  '35': 'Ille-et-Vilaine',
  '36': 'Indre',
  '37': 'Indre-et-Loire',
  '38': 'Isère',
  '39': 'Jura',
  '40': 'Landes',
  '41': 'Loir-et-Cher',
  '42': 'Loire',
  '43': 'Haute-Loire',
  '44': 'Loire-Atlantique',
  '45': 'Loiret',
  '46': 'Lot',
  '47': 'Lot-et-Garonne',
  '48': 'Lozère',
  '49': 'Maine-et-Loire',
  '50': 'Manche',
  '51': 'Marne',
  '52': 'Haute-Marne',
  '53': 'Mayenne',
  '54': 'Meurthe-et-Moselle',
  '55': 'Meuse',
  '56': 'Morbihan',
  '57': 'Moselle',
  '58': 'Nièvre',
  '59': 'Nord',
  '60': 'Oise',
  '61': 'Orne',
  '62': 'Pas-de-Calais',
  '63': 'Puy-de-Dôme',
  '64': 'Pyrénées-Atlantiques',
  '65': 'Hautes-Pyrénées',
  '66': 'Pyrénées-Orientales',
  '67': 'Bas-Rhin',
  '68': 'Haut-Rhin',
  '69': 'Rhône',
  '70': 'Haute-Saône',
  '71': 'Saône-et-Loire',
  '72': 'Sarthe',
  '73': 'Savoie',
  '74': 'Haute-Savoie',
  '75': 'Paris',
  '76': 'Seine-Maritime',
  '77': 'Seine-et-Marne',
  '78': 'Yvelines',
  '79': 'Deux-Sèvres',
  '80': 'Somme',
  '81': 'Tarn',
  '82': 'Tarn-et-Garonne',
  '83': 'Var',
  '84': 'Vaucluse',
  '85': 'Vendée',
  '86': 'Vienne',
  '87': 'Haute-Vienne',
  '88': 'Vosges',
  '89': 'Yonne',
  '90': 'Territoire-de-Belfort',
  '91': 'Essonne',
  '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne',
  '95': "Val-d'Oise",
  '98': 'Monaco',
};

export const labelBySortOption: Record<string, string> = {
  default: 'Le choix La Centrale',
  priceAsc: 'Prix croissant',
  priceDesc: 'Prix décroissant',
  proximityAsc: 'Distance croissante',
  mileageAsc: 'Kilométrage croissant',
  firstOnlineDateAsc: 'Annonces les moins récentes',
  firstOnlineDateDesc: 'Annonces les plus récentes',
  proximityDesc: 'Distance décroissante',
  firstTrafficDateDesc: 'Véhicules les plus récents',
};

export const labelBySortOptionMobile = {
  firstOnlineDateAsc: 'Récence',
  firstOnlineDateDesc: 'Récence',
  priceAsc: 'Prix',
  priceDesc: 'Prix',
  makeAsc: 'Marque',
  makeDesc: 'Marque',
  mileageAsc: 'Km.',
  mileageDesc: 'Km.',
  yearAsc: 'Année',
  yearDesc: 'Année',
  visitPlaceAsc: 'Dpt.',
  visitPlaceDesc: 'Dpt.',
  proximityAsc: 'Distance',
  proximityDesc: 'Distance',
  goodDealBadgeAsc: 'Affaire',
  goodDealBadgeDesc: 'Affaire',
  equipmentLevel: 'Niveau équipement',
};

export const labelByExternalColor = {
  Argent: 'silver',
  Beige: 'beige',
  Blanc: 'white',
  Bleu: 'blue',
  Bordeaux: 'burgundy',
  Gris: 'grey',
  Ivoire: 'ivory',
  Jaune: 'yellow',
  Marron: 'brown',
  Noir: 'black',
  Orange: 'orange',
  Rose: 'pink',
  Rouge: 'red',
  Vert: 'green',
  Violet: 'purple',
};

export const labelByInternalColor = {
  Beige: 'beige',
  Blanc: 'white',
  Bleu: 'blue',
  Fauve: 'fawn',
  Gris: 'grey',
  Ivoire: 'ivory',
  Marron: 'brown',
  Noir: 'black',
  Rouge: 'red',
  Vert: 'green',
};

export const vatLabel = 'TVA récupérable';

export const energyLabels = {
  ESSENCE: 'Essence',
  DIESEL: 'Diesel',
  BIO_ESSENCE_GPL: 'Bicarburation essence / gpl',
  ELECTRIC: 'Électrique',
  HYBRID_ESSENCE_ELECTRIC: 'Hybrides',
  PLUGIN_HYBRID_ESSENCE_ELECTRIC: 'Hybrides',
  PLUGIN_HYBRID: 'Hybrides rechargeables',
  NOT_PLUGIN_HYBRID: 'Hybrides non rechargeables',
  BICARBURATION_ESSENCE_BIOETHANOL: 'Bicarburation essence bioéthanol',
  OTHER: 'Autres énergies alternatives',
};

export const labelByFinancingType: Record<string, string> = {
  CLASSIC: 'Crédit',
  LOA: 'Leasing (LOA)',
};

export const exhaustiveFinancingTypes: Record<string, string> = {
  CLASSIC: 'CLASSIC',
  LOA: 'LOA',
};

export const stockLabels: SearchListItem[] = [
  {label: 'National', value: 'network', trackingId: 'stockNational'},
  {label: 'Local', value: 'pro', trackingId: 'stockLocal'},
];

export const labelBySeats = {
  1: '1 place',
  2: '2 places',
  3: '3 places',
  4: '4 places',
  5: '5 places',
  6: '6 places',
  7: '7 places',
  8: '8 places',
  9: '9 places',
};

export const labelByDoors = {
  2: '2 portes',
  3: '3 portes',
  4: '4 portes',
  5: '5 portes',
  6: '6 portes ou plus',
};

export const cubicsValue = [
  50, 80, 125, 250, 400, 500, 600, 700, 850, 1000, 1200, 1400, 1600, 1800, 2000,
];
