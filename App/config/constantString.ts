export const titleButtons = {
  refresh: 'Réessayer',
  connectCreate: 'Se connecter/Créer un compte',
  disconnect: 'Se déconnecter',
  resellCar: 'Faire racheter mon véhicule',
  newAnnounce: 'Déposer une annonce',
  quotation: 'Cote La centrale',
};
export const textBody = {
  textAccount: 'Connectez-vous pour bénéficier de toutes nos fonctionnalités !',
  myAccount: 'Mon Compte',
  noSavedSearch: 'Vous n’avez aucune recherche enregistrée',
  notificationsPush: 'Notifications push',
  connectModal: 'Vous devez vous connecter pour accéder à cette fonctionnalité',
  offerPro: 'Obtenez une offre de rachat express par un professionnel',
  sellManagement:
    'Gérez vous même gratuitement la vente de votre véhicule sur La Centrale',
  quotationDetail: 'Calculez la valeur d’un véhicule d’occasion',
};
export const myAccount = {
  MyProfile: 'Mon profil',
  MessageScreen: 'Mes messages',
  SavedSearchs: 'Mes recherches enregistrées',
  AdsScreen: 'Mes annonces',
  MyAppointments: 'Mes rendez-vous',
  Parameters: 'Paramètres',
};
export const parameters = {
  termsAndConditions: 'Conditions générales',
  legaleNotice: 'Mentions légales',
  classementInformation: 'Information sur le classement',
  cookiesPolicy: 'Charte cookies',
  privacyPolicies: 'Politiques de confidentialité',
};
export const INJECTION_JAVASCRIPT = `window.ReactNativeWebView.postMessage(JSON.stringify({data:window.localStorage.getItem('bookmarks'),type:"Favoris"}));
let prevFavs;`;
// export const INJECT_TC_VARS_GET_INFO = `if(window?.tc_vars){
//   window.ReactNativeWebView.postMessage(JSON.stringify(window.tc_vars));
// }
// `;
// export const INJECT_SUMMARY_INFO_DATA_GET_INFO = `if(window?.SummaryInformationData?.classified?.classified){
//   window.ReactNativeWebView.postMessage(JSON.stringify(SummaryInformationData?.classified?.classified));
// }
// `;
export const INJECT_BOOKMARKS_ONLY = `window.ReactNativeWebView.postMessage(JSON.stringify({data:window.localStorage.getItem('bookmarks'),type:"Favoris"}));`;
export const INJECT_JS_GET_COOKIES =
  'window.ReactNativeWebView.postMessage(document.cookie);';

export const STATUS = {
  online: 'ONLINE',
};
