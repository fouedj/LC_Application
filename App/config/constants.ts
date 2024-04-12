import {Config} from 'react-native-config';
import {Dimensions, Platform} from 'react-native';
export const ENABLE_LOG = true;

export const Environment = {
  environment: Config.ENV || '',
};

export const WebViewUrlsHelpers = {
  webListingPage: Config.URL_WEB_LISTING || '',
  listingPage: Config.URL_LISTING || '',
  filtersPage: Config.URL_FILTERS || '',
  webFiltersPage: Config.URL_WEB_FILTERS || '',
  autoAnnouceDetails: Config.URL_AUTO_ANNOUNCE_DETAILS || '',
  utilAnounceDetails: Config.URL_UTIL_ANNOUNCE_DETAILS || '',
  quadAnounceDetails: Config.URL_QUAD_ANNOUNCE_DETAILS || '',
  motoAnounceDetails: Config.URL_MOTO_ANNOUNCE_DETAILS || '',
  scooterAnounceDetails: Config.URL_SCOOTER_ANNOUNCE_DETAILS || '',
  anyAnnounceDetails: [
    Config.URL_AUTO_ANNOUNCE_DETAILS || '',
    Config.URL_UTIL_ANNOUNCE_DETAILS || '',
    Config.URL_QUAD_ANNOUNCE_DETAILS || '',
    Config.URL_MOTO_ANNOUNCE_DETAILS || '',
    Config.URL_SCOOTER_ANNOUNCE_DETAILS || '',
  ],
  baseUrl: Config?.BASE_URL || '',
  baseUrl2: Config?.BASE_URL2 || '',
  baseUrlLight: Config?.BASE_URL_LIGHT || '',
  detailsAnnounce: (id: string, vertical: string) =>
    `${Config?.URL_ANNONCE_DETAILS_CLASSIFIED}${id}&vertical=${vertical}`,
  technicalSheet: Config.URL_TECHNICAL_SHEET || '',
  prosUrl: Config.URL_PROS,
  authentication: Config.URL_AUTH || '',
  verifAuth: Config.URL_VERIF_AUTH || '',
  messagePage: Config.URL_MESSAGING || '',
  cmpPage: Config.URL_CMP || '',
  charteCookiesPage: Config.URL_CHARTE_COOKIE || '',
  webCgu: Config.URL_WEB_CGU || '',
  rachatExpressPage: Config.URL_RACHAT_EXPRESS || '',
  webRachatUrls: [
    Config.URL_WEB_MVC || '',
    Config.URL_WEB_RACHAT_EXPRESS || '',
  ],
  depositPage: Config.URL_DEPOSIT || '',
  webDepositPage: Config.URL_WEB_DEPOSIT || '',
  authenticationApp: Config.URL_AUTH_APP || '',
  baseUrlAuth: Config.BASE_URL_AUTH || '',
  myAdsPage: Config.URL_ANNONCES_LIST || '',
  myAdsAccountPage: Config.URL_APP_ACCOUNT_ADS || '',
  webMyAppointmentsPage: Config.URL_WEB_MY_APPOINTMENTS_LIST || '',
  myAppointmentsPage: Config.URL_MY_APPOINTMENTS_LIST || '',
  disconnectPage: Config.URL_DISCONNECT_ACCOUNT || '',
  webMyAdsUrl: Config.URL_WEB_ANNONCES_LIST || '',
  myProfile: Config.URL_MY_PROFILE || '',
  myProfileWeb: Config.URL_MY_PROFILE_WEB || '',
  webDepositConfirmation: Config.URL_WEB_DEPOT_CONFIRMATION || '',
  depositConfirmation: Config.URL_DEPOT_CONFIRMATION || '',
  webEditAdUrl: Config.URL_WEB_ANNONCES_EDIT || '',
  quotationLanding: Config.URL_QUOTATION_LANDING || '',
  webEditMyAdUrl: (id: string) =>
    `${Config?.URL_WEB_ANNONCES_EDIT}${id}/modification?mobileapp=true`,
  webQuotationDetail: Config.URL_WEB_QUOTATION_DETAIL || '',
  webQuotationDetail2: Config.URL_WEB_QUOTATION_DETAIL_2 || '',
  quotationDetail: (vehiculeType: string) =>
    `${Config?.URL_QUOTATION_DETAIL}${vehiculeType}`,
  webEmpty: Config.URL_EMPTY || '',
};
export const ApiBaseUrl = {
  baseUrlBookmarkApi: Config.BOOKMARK_API_BASE_URL || '',
  refreshTokenApi: Config.TOKEN_API_BASE_URL || '',
  baseUrlSearchSaved: Config.SEARCH_SAVED_API_BASE_URL,
};

export const PagesToOpenInBrowser = [
  'lacentrale.fr/conseils',
  'lacentrale.fr/informations/politique-confidentialite',
  'https://leafletjs.com/',
  WebViewUrlsHelpers?.prosUrl,
];

export const PagesToOpenInInAppBrowser = [
  'lacentrale.fr/conseils/livraison',
  'www.ecologie.gouv.fr/certificats-qualite-lair-critair',
  'primealaconversion.gouv.fr/dboneco/accueil',
  'lacentrale.fr/informations/politique-confidentialite',
  'lacentrale.fr/informations/conditions-generales',
  'lacentrale.fr/informations/mentions-legales',
  'lacentrale.fr/faq/deposer-une-annonce',
  'lacentrale.fr/conseils',
  'lacentrale.fr/conseils/vente-voiture/bien-vendre.php',
  'lacentrale.fr/conseils/vente-voiture/controle-technique.php',
  'lacentrale.fr/conseils/vente-voiture/securitel.php',
  'lacentrale.fr/cote_inter.php',
  'digital.santanderconsumer.fr',
  'axa.fr',
  'autoviza.fr',
  'fr.trustpilot.com/review',
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const DimensionScreen = {
  windowHeight,
  windowWidth,
};
export const device = Platform.OS === 'android' ? 'android' : 'ios';
