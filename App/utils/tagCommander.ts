import {NativeModules, Platform} from 'react-native';
import { isTablet } from 'react-native-device-info';
import { getSystemVersionForTracking, getOsVersionForTracking, getPianoSiteIDForTracking } from '../utils/functionString'
import TrackingInfoSingleton from '../utils/singleton/TrackingInfoSingleton'
import { some } from 'lodash';

export const {TagCommanderModule} = NativeModules;

///INIT METHODS

export const initTCServerSide = async () => {
  console.log('[initTCServerSide]', getSystemVersionForTracking());
  await TagCommanderModule.initTCServerSide(
    getPianoSiteIDForTracking(),
    isTablet(),
    getSystemVersionForTracking(),
    getOsVersionForTracking()
  );
};

export const generateAppVisitorId = async () => {
  console.log('[generateAppVisitorId]');
  return await TagCommanderModule.generateAppVisitorId();
};

export const addAppVisitorId = async (app_visitor_id: string) => {
  console.log('[addAppVisitorId]');
  await TagCommanderModule.addAppVisitorId(app_visitor_id);
};

export const addUserCategory = async (user_category: string) => {
  console.log('[addUserCategory]');
  await TagCommanderModule.addUserCategory(user_category);
};

export const removeUserCategory = async () => {
  console.log('[removeUserCategory]');
  await TagCommanderModule.removeUserCategory();
};

export const addAppCmpMode = async (cmpMode: string) => {
  console.log('[addAppCmpMode] : ', cmpMode);
  var vc = '0';
  if (!cmpMode) {
    cmpMode = 'exempt';
  } else if (cmpMode === 'optin') {
    vc = '1';
  }
  await TagCommanderModule.addAppCmpMode(cmpMode, vc);
};

///PAGES TRACKING
export const sendPageMesFavoris = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'mesFavoris',
  'page_$' : 'mesFavoris',
  'page_full_name' : 'mesFavoris',
  'site_level2' : 'compte',
  'site_level_3' : 'favoris',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'mesFavoris';
  TrackingInfoSingleton.previousEventPageZone = 'mesFavoris';
}

export const sendPageVendre = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'vendreMenu',
  'page_$' : 'vendreMenu',
  'page_full_name' : 'vendreMenu',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'vendreMenu';
  TrackingInfoSingleton.previousEventPageZone = 'vendreMenu';
}

export const sendPageMyAccountHome = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'homeCompte',
  'page_$' : 'homeCompte',
  'page_full_name' : 'homeCompte',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'homeCompte';
  TrackingInfoSingleton.previousEventPageZone = 'body';
}

export const sendPageParameters = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'parametres',
  'page_$' : 'parametres',
  'page_full_name' : 'parametres',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'parametres';
  TrackingInfoSingleton.previousEventPageZone = 'parametres';
}

export const sendPageSavedSearch = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'mesRecherchesEnregistrees',
  'page_$' : 'mesRecherchesEnregistrees',
  'page_full_name' : 'mesRecherchesEnregistrees',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'parametres';
  TrackingInfoSingleton.previousEventPageZone = 'parametres';
}

export const sendPageNotification = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'notifications',
  'page_$' : 'notifications',
  'page_full_name' : 'notifications',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'parametres';
  TrackingInfoSingleton.previousEventPageZone = 'parametres';
}

export const sendPageMessagerie = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'maMessagerie',
  'page_$' : 'maMessagerie',
  'page_full_name' : 'maMessagerie',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'maMessagerie';
  TrackingInfoSingleton.previousEventPageZone = 'maMessagerie';
}

export const sendPageError = () => {
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'erreurAutres',
  'page_$' : 'erreurAutres',
  'page_full_name' : 'erreurAutres',
  'site_level2' : 'autres',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('page.display', generalData, null);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.previousEventPage = 'erreurAutres';
  TrackingInfoSingleton.previousEventPageZone = 'erreurAutres';
}

export const reloadPageError = () => {
  TrackingInfoSingleton.previousEventPage = 'erreurAutres';
  TrackingInfoSingleton.previousEventPageZone = 'body';

  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : 'reessayer',
  'click_$' : 'reessayer',
  'click_full_name' : 'reessayer',
  'site_level2' : 'autres',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, null);

  TrackingInfoSingleton.tcVars = {};
}


export const sendPageFilters = () => {

  //in this view, the tracking is send by the webview, so we just upadate previousEventPage & previousEventPageZone
  TrackingInfoSingleton.previousEventPage = 'filtresRecherche';
  TrackingInfoSingleton.previousEventPageZone = 'filtresRecherche';
}

export const sendPageListing = () => {

  //in this view, the tracking is send by the webview, so we just upadate previousEventPage & previousEventPageZone
  TrackingInfoSingleton.previousEventPage = 'listingPA';
  TrackingInfoSingleton.previousEventPageZone = 'listingPA';
}

export const sendPageAnnonceDetail = () => {

  //in this view, the tracking is send by the webview, so we just upadate previousEventPage & previousEventPageZone
  TrackingInfoSingleton.previousEventPage = 'detailPA';
  TrackingInfoSingleton.previousEventPageZone = 'detailPA';
}

///TABBAR TRACKING

export const sendTabBarActionClick = (clickName: String, eventName: String, siteLevel2: String) => {
  TrackingInfoSingleton.previousEventPageZone = 'tabBar';
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : TrackingInfoSingleton.previousEventPageZone,
  'click_page_name' : clickName,
  'click_$' : clickName,
  'click_full_name' : clickName,
  'site_level2' : siteLevel2,
  'visitor_type' : 'vendeur'};
  console.log('generalData:', generalData);

  TagCommanderModule.sendTagCommanderTracking(eventName, generalData, TrackingInfoSingleton.tcVars);

  TrackingInfoSingleton.tcVars = {};
}

///GOBACK ACTION TRACKING

export const sendGoBackActionClick = (clickName: String, siteLevel2: String) => {
  TrackingInfoSingleton.previousEventPage = clickName;
  TrackingInfoSingleton.previousEventPageZone = 'header';
  if(TrackingInfoSingleton.isErrorPageDisplayed) {
    TrackingInfoSingleton.previousEventPage = 'erreurAutres';
  }
  const generalData =
  {'event_page' : TrackingInfoSingleton.previousEventPage,
  'event_page_zone' : 'header',
  'click_page_name' : 'retour',
  'click_$' : 'retour',
  'click_full_name' : 'retour',
  'site_level2' : TrackingInfoSingleton.isErrorPageDisplayed ? 'autres' : siteLevel2,
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, TrackingInfoSingleton.tcVars);

  TrackingInfoSingleton.tcVars = {};
  TrackingInfoSingleton.isErrorPageDisplayed = false;
}


///ACTION TRACKING

export const sendClickInfoMessagerie = () => {
  const generalData =
  {'event_page' : 'maMessagerie',
  'event_page_zone' : 'header',
  'click_page_name' : 'rechercheInfo',
  'click_$' : 'rechercheInfo',
  'click_full_name' : 'rechercheInfo',
  'visitor_type' : 'vendeur',
  'site_level2' : 'compte'};
  return TagCommanderModule.sendTagCommanderTracking('plusinfos.click', generalData, null);
}

export const sendClickOnParametersList = (clickName: String) => {
  const generalData =
  {'event_page' : 'parametres',
  'event_page_zone' : 'body',
  'click_page_name' : clickName,
  'click_$' : clickName,
  'click_full_name' : clickName,
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  return TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, null);
}

///LISTING PAGE ACTION TRACKING

export const sendOpenSavedSearchModal = () => {
  TrackingInfoSingleton.previousEventPage = 'listingPA';
  TrackingInfoSingleton.previousEventPageZone = 'popinRechercheEnregistree';

  const generalData =
  {'event_page' : 'listingPA',
  'event_page_zone' : 'popinRechercheEnregistree',
  'click_page_name' : 'sauvegarder',
  'click_$' : 'sauvegarder',
  'click_full_name' : 'sauvegarder',
  'site_level2' : 'annonce',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('popin_connectee.display', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnSavedSearchModal = (hasSearchAlertActivated: boolean, event_page: string) => {
  TrackingInfoSingleton.previousEventPage = event_page;
  TrackingInfoSingleton.previousEventPageZone = 'popinRechercheEnregistree';

  const generalData =
  {'event_page' : event_page,
  'event_page_zone' : 'popinRechercheEnregistree',
  'click_page_name' : 'sauvegarder',
  'click_$' : 'sauvegarder',
  'click_full_name' : 'sauvegarder',
  'has_search_alert_activated' : hasSearchAlertActivated ? true : false,
  'site_level2' : 'annonce',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.action', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnSavedSearchNofication = (hasSearchAlertActivated: boolean) => {
  TrackingInfoSingleton.previousEventPage = 'mesRecherchesEnregistrees';
  TrackingInfoSingleton.previousEventPageZone = 'toggle';

  const generalData =
  {'event_page' : 'mesRecherchesEnregistrees',
  'event_page_zone' : 'toggle',
  'click_page_name' : 'notification',
  'click_$' : 'notification',
  'click_full_name' : 'notification',
  'has_search_alert_activated' : hasSearchAlertActivated ? true : false,
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.action', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendOpenSavedSearchConnectionModal = () => {
  TrackingInfoSingleton.previousEventPage = 'listingPA';
  TrackingInfoSingleton.previousEventPageZone = 'popinRechercheEnregistree';

  const generalData =
  {'event_page' : 'listingPA',
  'event_page_zone' : 'popinRechercheEnregistree',
  'click_page_name' : 'connexionCreation',
  'click_$' : 'connexionCreation',
  'click_full_name' : 'connexionCreation',
  'site_level2' : 'annonce',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('publisher.display', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnSavedSearchConnectionModal = (hasSearchAlertActivated: boolean) => {
  TrackingInfoSingleton.previousEventPage = 'listingPA';
  TrackingInfoSingleton.previousEventPageZone = 'popinRechercheEnregistree';

  const generalData =
  {'event_page' : 'listingPA',
  'event_page_zone' : 'popinRechercheEnregistree',
  'click_page_name' : 'connexionCreation',
  'click_$' : 'connexionCreation',
  'click_full_name' : 'connexionCreation',
  'site_level2' : 'annonce',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

///DETAIL PAGE ACTION TRACKING

export const sendClickOnShareDetailPage = () => {
  TrackingInfoSingleton.previousEventPage = 'detailPA';
  TrackingInfoSingleton.previousEventPageZone = 'header';

  const generalData =
  {'event_page' : 'detailPA',
  'event_page_zone' : 'header',
  'click_page_name' : 'partage',
  'click_$' : 'partage',
  'click_full_name' : 'partage',
  'site_level2' : 'annonce',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('intention_partage.click', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickAjoutFavoriDetailPage = (isFavorite: boolean, classifiefRef: String) => {
  const generalData =
  {'event_page' : 'detailPA',
  'event_page_zone' : 'header',
  'click_page_name' : (isFavorite ? 'ajoutFavori' : 'suppressionFavori'),
  'classified_ref' : classifiefRef,
  'click_$' : (isFavorite ? 'ajoutFavori' : 'suppressionFavori'),
  'click_full_name' : (isFavorite ? 'ajoutFavori' : 'suppressionFavori'),
  'site_level2' : 'annonce'};
  return TagCommanderModule.sendTagCommanderTracking((isFavorite ? "ajout_favori.click" : "click.action"), generalData, TrackingInfoSingleton.tcVars);
}

///MY_ACCOUNT PAGE ACTION TRACKING

export const sendClickOnMyAccountGoToPage = (pageName:String) => {
  TrackingInfoSingleton.previousEventPage = 'homeCompte';
  TrackingInfoSingleton.previousEventPageZone = 'body';
  console.log(pageName);
  let clickName = '';
  if(pageName === 'MessageScreen') {
    clickName = 'maMessagerie';
  } else if(pageName === 'SavedSearchs') {
    clickName = 'mesRecherchesEnregistrees';
  } else if(pageName === 'AdsScreen') {
    clickName = 'mesAnnonces';
  } else if(pageName === 'MyProfile') {
    clickName = 'monProfil';
  } else if(pageName === 'MyAppointments') {
    clickName = 'mesRdv';
  } else if(pageName === 'Parameters') {
    clickName = 'parametres';
  } 
  const generalData =
  {'event_page' : 'homeCompte',
  'event_page_zone' : 'body',
  'click_page_name' : clickName,
  'click_$' : clickName,
  'click_full_name' : clickName,
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnDisconnectMyAccountPage = () => {
  TrackingInfoSingleton.previousEventPage = 'homeCompte';
  TrackingInfoSingleton.previousEventPageZone = 'body';

  const generalData =
  {'event_page' : 'homeCompte',
  'event_page_zone' : 'body',
  'click_page_name' : 'seDeconnecter',
  'click_$' : 'seDeconnecter',
  'click_full_name' : 'seDeconnecter',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.action', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnConnectMyAccountPage = () => {
  TrackingInfoSingleton.previousEventPage = 'homeCompte';
  TrackingInfoSingleton.previousEventPageZone = 'popinCompte';

  const generalData =
  {'event_page' : 'homeCompte',
  'event_page_zone' : 'popinCompte',
  'click_page_name' : 'connexionCreation',
  'click_$' : 'connexionCreation',
  'click_full_name' : 'connexionCreation',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('publisher.display', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

///SAVED SEARCH PAGE ACTION TRACKING
export const sendClickOnSavedSearchPage = () => {
  TrackingInfoSingleton.previousEventPage = 'mesRecherchesEnregistrees';
  TrackingInfoSingleton.previousEventPageZone = 'annonces';

  const generalData =
  {'event_page' : 'mesRecherchesEnregistrees',
  'event_page_zone' : 'annonces',
  'click_page_name' : 'rechercheAnnonces',
  'click_$' : 'rechercheAnnonces',
  'click_full_name' : 'rechercheAnnonces',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('recherche_annonces.click', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnConfirmDeleteSavedSearchPage = () => {
  TrackingInfoSingleton.previousEventPage = 'mesRecherchesEnregistrees';
  TrackingInfoSingleton.previousEventPageZone = 'body';

  const generalData =
  {'event_page' : 'mesRecherchesEnregistrees',
  'event_page_zone' : 'body',
  'click_page_name' : 'supprimerConfirmation',
  'click_$' : 'supprimerConfirmation',
  'click_full_name' : 'supprimerConfirmation',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.action', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

export const sendClickOnCancelDeleteSavedSearchPage = () => {
  TrackingInfoSingleton.previousEventPage = 'mesRecherchesEnregistrees';
  TrackingInfoSingleton.previousEventPageZone = 'body';

  const generalData =
  {'event_page' : 'mesRecherchesEnregistrees',
  'event_page_zone' : 'body',
  'click_page_name' : 'annuler',
  'click_$' : 'annuler',
  'click_full_name' : 'annuler',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.action', generalData, TrackingInfoSingleton.tcVars);

  // TrackingInfoSingleton.tcVars = {};
}

///FAVORITE PAGE ACTION TRACKING

export const sendClickFavoriteTri = (sortAndOrder: String) => {
  console.log(sortAndOrder)
  const generalData =
  {'event_page' : 'mesFavoris',
  'event_page_zone' : 'tri',
  'click_page_name' : 'tri',
  'click_$' : 'tri',
  'click_full_name' : 'tri',
  'site_level2' : 'compte',
  'sort_and_order': sortAndOrder,
  'visitor_type' : 'vendeur'};
  return TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, null);
}

export const sendClickFavoriteDelete = () => {
  const generalData =
  {'event_page' : 'mesFavoris',
  'event_page_zone' : 'annonce',
  'click_page_name' : 'suppressionFavori',
  'click_$' : 'suppressionFavori',
  'click_full_name' : 'suppressionFavori',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  return TagCommanderModule.sendTagCommanderTracking('click.action', generalData, null);
}

export const sendClickFavoriteDeleteAllCancel = () => {
  const generalData =
  {'event_page' : 'mesFavoris',
  'event_page_zone' : 'popin',
  'click_page_name' : 'annuler',
  'click_$' : 'annuler',
  'click_full_name' : 'annuler',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  return TagCommanderModule.sendTagCommanderTracking('click.action', generalData, null);
}

export const sendClickFavoriteDeleteAllValidate = () => {
  const generalData =
  {'event_page' : 'mesFavoris',
  'event_page_zone' : 'popin',
  'click_page_name' : 'supprimerConfirmation',
  'click_$' : 'supprimerConfirmation',
  'click_full_name' : 'supprimerConfirmation',
  'site_level2' : 'compte',
  'visitor_type' : 'vendeur'};
  return TagCommanderModule.sendTagCommanderTracking('click.action', generalData, null);
}

///SELL PAGE ACTION TRACKING

export const sendClickGoToQuotePage = () => {
  const generalData =
  {'event_page' : 'vendreMenu',
  'event_page_zone' : 'body',
  'click_page_name' : 'homeCote',
  'click_$' : 'homeCote',
  'click_full_name' : 'homeCote',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('home_cote.click', generalData, null);
}

export const sendClickGoToIcoPage = () => {
  const generalData =
  {'event_page' : 'vendreMenu',
  'event_page_zone' : 'body',
  'click_page_name' : 'rachatVehicule',
  'click_$' : 'rachatVehicule',
  'click_full_name' : 'rachatVehicule',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, null);
}

export const sendClickGoToIcoPageConnectFirst = () => {
  const generalData =
  {'event_page' : 'vendreMenu',
  'event_page_zone' : 'popinRachat',
  'click_page_name' : 'connexionCreation',
  'click_$' : 'connexionCreation',
  'click_full_name' : 'connexionCreation',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('publisher.display', generalData, null);
}

export const sendClickGoToDepotPage = () => {
  const generalData =
  {'event_page' : 'vendreMenu',
  'event_page_zone' : 'body',
  'click_page_name' : 'intentionDepotAnnonce',
  'click_$' : 'intentionDepotAnnonce',
  'click_full_name' : 'intentionDepotAnnonce',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('intention_depot.click', generalData, null);
}

export const sendClickGoToDepotPageConnectFirst = () => {
  const generalData =
  {'event_page' : 'vendreMenu',
  'event_page_zone' : 'popinDepot',
  'click_page_name' : 'connexionCreation',
  'click_$' : 'connexionCreation',
  'click_full_name' : 'connexionCreation',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('publisher.display', generalData, null);
}

export const sendClickGoToLoginFromIcoDepot = (isDepot : boolean) => {
  console.log('sendClickGoToLoginFromIcoDepot', isDepot);
  const generalData =
  {'event_page' : 'vendreMenu',
  'event_page_zone' : isDepot ? 'popinDepot' : 'popinRachat',
  'click_page_name' : 'connexionCreation',
  'click_$' : 'connexionCreation',
  'click_full_name' : 'connexionCreation',
  'site_level2' : 'depot',
  'visitor_type' : 'vendeur'};
  TagCommanderModule.sendTagCommanderTracking('click.navigation', generalData, null);
}