import petitsPrix from '../../../assets/images/petitsPrix.png';
import familiales from '../../../assets/images/familiale.png';
import electrique from '../../../assets/images/electrique.png';
import hybrides from '../../../assets/images/hybride.png';
import automatique from '../../../assets/images/automatique.png';
import citadines from '../../../assets/images/citadine.png';

const SHORTCUTS = [
  {
    name: 'Petits prix',
    image: petitsPrix,
    originalImageWidth: 529,
    originalImageHeight: 216,
    url: '?priceMax=10000',
  },
  {
    name: 'Familiales',
    image: familiales,
    originalImageWidth: 518,
    originalImageHeight: 216,
    url: '?categories=43%2C44',
  },
  {
    name: 'Électriques',
    image: electrique,
    originalImageWidth: 529,
    originalImageHeight: 216,
    url: '?energies=elec',
  },
  {
    name: 'Hybrides',
    image: hybrides,
    originalImageWidth: 581,
    originalImageHeight: 216,
    url: '?energies=hyb',
  },
  {
    name: 'Automatiques',
    image: automatique,
    originalImageWidth: 519,
    originalImageHeight: 216,
    url: '?gearbox=AUTO',
  },
  {
    name: 'Citadines',
    image: citadines,
    originalImageWidth: 432,
    originalImageHeight: 216,
    url: '?categories=40',
  },
];

export default SHORTCUTS;
