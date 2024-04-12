import invert from 'lodash/invert';
import {CategoriesKeys, Vertical} from './searchModels';
import {categoryByLabel} from './labels';

// prettier-ignore
export const categoriesByVertical: { [key: string]: Array<CategoriesKeys> } = {
  car: ['47', '40', '41_42', '43', '46', '45', '44', '50', '48'],
  carTruck: ['47', '40', '41_42', '43', '46', '45', '44', '82', '85', '81', '50', '80', '48', '83'],
  truck: ['83', '81', '82', '85', '50', '80'],
  moto: ['60', '61', '62', '63', '64', '65', '66', '67', '69', '68'],
  quad: ['70'],
  scooter: ['71'],
};

export const verticalByCategory: Record<CategoriesKeys, Vertical> = {
  '40': 'carTruck',
  '41_42': 'carTruck',
  '43': 'carTruck',
  '44': 'carTruck',
  '45': 'carTruck',
  '46': 'carTruck',
  '47': 'carTruck',
  '48': 'carTruck',
  '50': 'carTruck',
  '80': 'truck',
  '81': 'truck',
  '82': 'truck',
  '83': 'truck',
  '85': 'truck',
  '60': 'moto',
  '61': 'moto',
  '62': 'moto',
  '63': 'moto',
  '64': 'moto',
  '65': 'moto',
  '66': 'moto',
  '67': 'moto',
  '69': 'moto',
  '68': 'moto',
  '70': 'quad',
  '71': 'scooter',
};

export const familiesByVertical = {
  car: 'AUTO',
  carTruck: 'AUTO,UTILITY',
  truck: 'UTILITY',
  moto: 'MOTO',
  quad: 'QUAD',
  scooter: 'SCOOTER',
};

export const verticalByFamily: Record<string, Vertical> = {
  AUTO: 'carTruck',
  UTILITY: 'truck',
  MOTO: 'moto',
  QUAD: 'quad',
  SCOOTER: 'scooter',
};

export const categoriesByGroup = {
  '40': 'CITADINE',
  '41_42': 'BERLINE',
  '43': 'BREAK',
  '44': 'MONOSPACE',
  '45': 'COUPE',
  '46': 'CABRIOLET',
  '47': 'SUV_4X4_CROSSOVER',
  '48': 'VOITURE_SANS_PERMIS',
  '50': 'PICK_UP',
  '60': 'CUSTOM',
  '61': 'OFFROAD',
  '62': 'ROADSTER',
  '63': 'GT',
  '64': 'MINI_MOTO',
  '65': 'MOBYLETTE',
  '66': 'SUPERMOTARD',
  '67': 'TRAIL',
  '68': 'SPORTIVE',
  '69': 'SIDE_CARS',
  '70': 'QUAD',
  '71': 'SCOOTER',
  '80': 'VOITURES_SOCIETES_COMMERCIALES',
  '81': 'FOURGONS_MOINS_DE_3_5_T',
  '82': 'BUS_ET_MINIBUS',
  '83': 'CAMIONS_PLUS_DE_3_5_T',
  '85': 'FOURGONNETTE',
};

export const groupByCategory = invert(categoriesByGroup);
groupByCategory.BERLINE = '41_42';

export function getCategoryCodesByGroup(group: string) {
  return group === '41_42' ? ['41', '42'] : [group];
}

export const energiesByGroup: {[key: string]: any} = {
  dies: 'DIESEL',
  ess: 'ESSENCE',
  elec: 'ELECTRIC',
  hyb: 'HYBRID',
  plug_hyb: 'PLUGIN_HYBRID',
  not_plug_hyb: 'NOT_PLUGIN_HYBRID',
  gpl: 'BIO_ESSENCE_GPL',
  eth: 'BICARBURATION_ESSENCE_BIOETHANOL',
  alt: 'OTHER',
};

export const energiesByGroupToUrl: {[key: string]: any} = {
  DIESEL: 'dies',
  ESSENCE: 'ess',
  ELECTRIC: 'elec',
  HYBRID: 'hyb',
  PLUGIN_HYBRID: 'plug_hyb',
  NOT_PLUGIN_HYBRID: 'not_plug_hyb',
  BIO_ESSENCE_GPL: 'gpl',
  BICARBURATION_ESSENCE_BIOETHANOL: 'eth',
  OTHER: 'alt',
};

export const groupByEnergy = invert(energiesByGroup);

export const energyCodesByGroup = {
  dies: ['2'],
  ess: ['1'],
  elec: ['4'],
  hyb: ['8', '9'],
  gpl: ['3'],
  eth: ['10'],
  alt: ['5', '6', '7', '11'],
};

export const financingTypesByGroup = {
  CLASSIC: 'CLASSIC',
  // LOA: 'LOA' to be re-enabled later when we have CGI leasing among others
};

// prettier-ignore
export const departmentsByRegion: { [key: string]: Array<string> } = {
  'FR-ARA': ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'], // Auvergne-Rhône-Alpes
  'FR-BFC': ['21', '25', '39', '58', '70', '71', '89', '90'], // Bourgogne-Franche-Comté
  'FR-BRE': ['22', '29', '35', '56'], // Bretagne
  'FR-CVL': ['18', '28', '36', '37', '41', '45'], // Centre-Val de Loire
  'FR-COR': ['2A', '2B', '20'], // Corse
  'FR-GES': ['08', '10', '51', '52', '54', '55', '57', '67', '68', '88'], // Grand Est
  'FR-HDF': ['02', '59', '60', '62', '80'], // Hauts-de-France
  'FR-IDF': ['75', '77', '78', '91', '92', '93', '94', '95'], // Île-de-France
  'FR-NOR': ['14', '27', '50', '61', '76'], // Normandie
  'FR-NAQ': ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'], // Nouvelle-Aquitaine
  'FR-OCC': ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'], // Occitanie
  'FR-PDL': ['44', '49', '53', '72', '85'], // Pays de la Loire
  'FR-PAC': ['04', '05', '06', '13', '83', '84', '98'], // Provence-Alpes-Côte d'Azur
};

export const zipCodeDistances = [
  null,
  '10km',
  '20km',
  '50km',
  '100km',
  '200km',
];
export const transformValuesToApi = ({criteria}: any) => {
  return {
    criteria,
    type: 'SEARCH',
  };
};

export const transformApiToUrl = (values: {key: any}) => {
  var dicValue = {};

  for (let key in values) {
    let value = values[key];
    if (key === 'categories') {
      const catArray = value.split(',');
      var catString = '';
      catArray.forEach(cat => {
        catString += categoryByLabel[cat.toLowerCase()] + ',';
      });
      dicValue[key] = catString.slice(0, -1);
    } else if (key === 'energies') {
      const catArray = value.split(',');
      var energyString = '';
      catArray.forEach(energy => {
        energyString += energiesByGroupToUrl[energy] + ',';
      });
      dicValue[key] = energyString.slice(0, -1);
    } else {
      dicValue[key] = value;
    }
  }
  dicValue['isSavedSearch'] = true;
  return new URLSearchParams(dicValue).toString();
};

export const transformSavedSearchApiToUrl = (values: {[key: string]: any}) => {
  var dicValue = {};

  for (let key in values) {
    let value = values[key];
    if (key === 'categories') {
      const catArray = value.split(',');
      var catString = '';
      catArray.forEach(cat => {
        catString += categoryByLabel[cat.toLowerCase()] + ',';
      });
      dicValue[key] = catString.slice(0, -1);
    } else if (key === 'energies') {
      const catArray = value.split(',');
      var energyString = '';
      catArray.forEach(energy => {
        energyString += energiesByGroupToUrl[energy] + ',';
      });
      dicValue[key] = energyString.slice(0, -1);
    } else if(key === 'zipCode'){
      dicValue["dptCp"] = value;
    } else if(key === 'zipCodeDistance'){
      const distanceValue = parseInt(value.match(/\d+/)[0]);
      if (distanceValue === 10) {
        dicValue["distance"] = 1;
      } else if (distanceValue === 20) {
        dicValue["distance"] = 2;
      } else if (distanceValue === 50) {
        dicValue["distance"] = 3;
      } else if (distanceValue === 100) {
        dicValue["distance"] = 4;
      } else if (distanceValue === 200) {
        dicValue["distance"] = 5;
      }
    } else if (key !== 'delivery' && value !== false) {
      if (value !== undefined && value.includes && value.includes(',')) {
        dicValue[key] = value.replace(',', ':');
      } else {
        dicValue[key] = value;
      }
    } else {
      dicValue[key] = value
    }
  }
  dicValue['isSavedSearch'] = true;
  return new URLSearchParams(dicValue).toString();
};
