import {Platform} from 'react-native';
import {getSystemVersion, isTablet} from 'react-native-device-info';
import {getIsConnected} from './getUserInformations';
import {WebViewUrlsHelpers} from '../config/constants';
import Config from 'react-native-config';

export function getInfoFromWebPage(
  wholeHtml: string,
  keyToExtract: string,
): string {
  var mySubString = wholeHtml.substring(
    //take the whole webpage's source and substring the first key/data from 'keyToExtract'
    wholeHtml.indexOf(keyToExtract),
    wholeHtml.lastIndexOf('}</script>'),
  );
  let mySubStringList = mySubString.split(';'); //convert the string to a array with all the datas from the webpage
  if (mySubStringList != null) {
    let resultString = mySubStringList[0]; //take the first one (the one we want)
    if (resultString != null && resultString.length > keyToExtract.length) {
      let numberOfAdsString = resultString.substring(
        resultString.length,
        keyToExtract.length,
      ); //remove the key
      // remove the useless characteres
      if (numberOfAdsString.startsWith('"')) {
        numberOfAdsString = numberOfAdsString.substring(1);
      }
      if (numberOfAdsString.endsWith('"')) {
        numberOfAdsString = numberOfAdsString.slice(0, -1);
      }
      return numberOfAdsString;
    }
  }
  return '';
}

export function getRestOfStringFrom(string: string, from: string): string {
  if (string.lastIndexOf(from) === -1) return ''; //il faut changer la façon de tester sur la valeur from
  return string.substring(string.lastIndexOf(from) + 1, string.length);
}

export const getUrl = (url: string) => {
  if (!url) {
    return '';
  }
  let finalUrl = url.startsWith('http') ? url : 'https://' + url;
  if (finalUrl.includes('/listing')) {
    finalUrl = finalUrl.replace('/listing', '/app-listing');
  }
  return finalUrl;
};

export function getCookie(cookie: string, key: string): string {
  let myCookieVal;
  //Get the cookie value from its name, stripping everything else that comes before
  myCookieVal = cookie.substr(cookie.indexOf(key) + key.length + 1);
  //Scrap the rest of the full cookie string, using the ; to stop
  myCookieVal = myCookieVal.substr(0, myCookieVal.indexOf(';'));
  return myCookieVal;
}

export function formatPrice(chaine: string) {
  let newChaine =
    chaine && typeof chaine !== 'string' ? chaine.toString() : chaine;
  if (newChaine && newChaine.length > 4 && newChaine !== undefined) {
    const deuxPremiersCaracteres = newChaine.slice(0, 2);
    const resteDeLaChaine = newChaine.slice(2);
    return `${deuxPremiersCaracteres} ${resteDeLaChaine}`;
  } else {
    return chaine; // Retourner la chaine intacte si elle a moins de 4 caractères
  }
}
export const getConvertedAnnounceIdToAscii = (announceId: string): string => {
  if (!announceId) {
    return null;
  }
  // Check if the number has at least two digits
  if (announceId && announceId.length < 2) {
    throw new Error('Number must have at least two digits.');
  }
  // Take the first two characters from the string and convert them to ASCII characters
  const asciiChars = announceId.substring(0, 2);
  return (
    String.fromCharCode(parseInt(asciiChars)) +
    announceId.substring(2, announceId.length)
  );
};
export const getConvertedAsciiToAnnounceId = (
  announceId: string,
): string | null => {
  if (!announceId) {
    return null;
  }
  if (announceId.length < 1) {
    throw new Error('Input string must have at least two characters.');
  }
  const asciiValue1 = announceId.charCodeAt(0);
  if (isNaN(asciiValue1)) {
    throw new Error('Invalid ASCII characters in the input.');
  }
  const restOfString = announceId.substring(1, announceId.length);
  return asciiValue1 + restOfString;
};

export function getPianoSiteIDForTracking(): (string | undefined) {
  if(Platform.OS === "android"){
    if(isTablet()){
      return Config?.PIANO_SITE_ID_AND_TAB;
    }
    return Config?.PIANO_SITE_ID_AND;
  } else if(Platform.OS === 'ios'){
    if(isTablet()){
      return Config?.PIANO_SITE_ID_IOS_TAB;
    }
    return Config?.PIANO_SITE_ID_IOS;
  }
}

export function getSystemVersionForTracking(): string {
  let systemVersion = Platform.OS === 'android' ? 'Android' : 'iOS';
  if (getSystemVersion().includes('.')) {
    systemVersion =
      systemVersion +
      ' ' +
      (getSystemVersion().substring(
        0,
        getSystemVersion().lastIndexOf('.') + 1,
      ) +
        'x');
  } else {
    systemVersion = systemVersion + ' ' + getSystemVersion() + '.x';
  }
  return systemVersion;
}

export function getOsVersionForTracking(): string {
  return getSystemVersion();
}

export function createUrlConnected(url: string): string {
  if (getIsConnected() && globalThis.refreshToken) {
    return (
      WebViewUrlsHelpers.baseUrl +
      '/auth.php?jwt=' +
      globalThis.refreshToken +
      '&callback=' +
      url
    );
  }
  return null;
}
export const renderTitleModal = (isConnected, modalBottomDisplay) => {
  let result = '';
  if (!isConnected && modalBottomDisplay === 'SearchParamsModalContent') {
    result = 'Enregistrer ma recherche';
  } else if (!isConnected && modalBottomDisplay === 'LoginModalContent') {
    result = 'Connectez-vous pour enregistrer votre recherche';
  } else if (isConnected && modalBottomDisplay === 'SearchParamsModalContent') {
    result = 'Enregistrer ma recherche';
  }
  return result;
};

export function extractQueryString(url: string): string | null {
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex !== -1) {
    return url.substring(queryStringIndex + 1);
  }
  return null;
}

export function parseUrl(url: string): Record<string, string> {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
