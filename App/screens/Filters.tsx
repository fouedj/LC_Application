import React, {useLayoutEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {getHeaderTitle} from '@react-navigation/elements';
import DeviceInfo, {isTablet} from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {WebViewUrlsHelpers} from '../config/constants';
import {useSetFiltersParam, useGetFiltersParam} from '../recoil/filtersParam';
import {
  initTCServerSide,
  generateAppVisitorId,
  addAppVisitorId,
  addAppCmpMode,
  sendPageFilters,
  addUserCategory,
} from '../utils/tagCommander';
import userIdStorage from '../storage/userId';
import SplashScreen from 'react-native-splash-screen';
import {Box, Header} from '../components';
import LCWebView from '../components/CustomWebView';
import {getRestOfStringFrom, getCookie} from '../utils/functionString';
import {FavoriteState} from '../recoil';
import {
  INJECTION_JAVASCRIPT,
  INJECT_JS_GET_COOKIES,
} from '../config/constantString';
import {areEquals} from '../utils/compareArray';
import {useIsFocused} from '@react-navigation/native';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import VisitorIdState from '../recoil/tracking';
import {processCookies} from '../utils/processCookies';
import {DeviceEventEmitter} from 'react-native';
import generateUserAgent from '../utils/generateUserAgent';
import useIsExpiredToken from '../hooks/useIsExpiredToken';
import {transformApiToUrl} from '../utils/transformFilterTagsIntoLabels/serviceSearchModels';
import {getIsConnected} from '../utils/getUserInformations';
import {updateAccessToken} from '../utils/cmpStoreManager';
import {PermissionsAndroid} from 'react-native';

export default function Filters({navigation}: {navigation: any}) {
  const setFilters = useSetFiltersParam();
  const webViewRef = useRef<WebView>(null);
  const [userId, setUserId] = useState(null);
  const [areTrackingValuesSet, setAreTrackingValuesSet] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [key, setKey] = useState(1);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const [notifPayload, setNotifPayload] = useState(null);
  const setFavorites = FavoriteState.useSet();
  const setVisitorId = useSetRecoilState(VisitorIdState.visitor_id);
  const paramFilter = useGetFiltersParam();
  const setFilterWebViewRef = FavoriteState.useSetWebViewRefFilter();
  const isFocused = useIsFocused();
  const jsCode = INJECTION_JAVASCRIPT + INJECT_JS_GET_COOKIES;
  const favoritesNotConnected = FavoriteState.useGet()?.favoriteNotConnected;
  useIsExpiredToken(webViewRef);

  const setTabletAndAppVisitorId = `
     window.localStorage.setItem("os", "${Platform.OS}");
     window.localStorage.setItem("appVersion", "${DeviceInfo.getVersion()}");
     window.localStorage.removeItem("isTablet");
     window.localStorage.setItem("isTablet", ${isTablet() ? 'true' : 'false'});
     window.localStorage.removeItem("app_visitor_id");
     window.localStorage.setItem("app_visitor_id", "${userId}");
     window.localStorage.setItem("user_agent", "${generateUserAgent()}");
     window.ReactNativeWebView.postMessage("[setTabletAndAppVisitorId]" + window.localStorage.getItem("user_agent"));
   `;

  React.useEffect(() => {
    SplashScreen.hide();
    if(Platform.OS === "android"){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } else {
      Geolocation.requestAuthorization();
    }
  
    async function initTagCoAndSetUserId() {
      await initTCServerSide();
      let myUserId = await userIdStorage.getUserId();
      if (!myUserId) {
        myUserId = await generateAppVisitorId();
        await userIdStorage.createUserId(myUserId);
      } else {
        setAreTrackingValuesSet(true);
      }
      await addAppVisitorId(myUserId);
      const atPrivacy = await AsyncStorage.getItem('atPrivacy');
      await addAppCmpMode(atPrivacy);
      setUserId(myUserId);
      if (getIsConnected()) {
        addUserCategory('particulier');
      }
    }
    initTagCoAndSetUserId();

    //Detect if a notification is taken
    DeviceEventEmitter.addListener(
      'NotificationReceived',
      async notifParams => {
        const urlParams = transformApiToUrl(notifParams.data.criterias);
        setNotifPayload(urlParams);
      },
    );
  }, []);

  React.useEffect(() => {
    if (userId && isPageLoaded) {
      // We have to be sure that the page is fully loaded to send datas to the local storage
      webViewRef.current?.injectJavaScript(setTabletAndAppVisitorId);
      setAreTrackingValuesSet(true);
    }
  }, [userId, isPageLoaded]);

  React.useEffect(() => {
    if (notifPayload && isPageLoaded) {
      setFilters(notifPayload);
      navigation.navigate('Listing', {previous_screen: 'Filters'});
    }
  }, [notifPayload, isPageLoaded]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props =>
        Header(
          isHeaderHidden,
          getHeaderTitle(props.options, props.route.name),
          false,
        ),
    });
  }, [isHeaderHidden, navigation]);

  useLayoutEffect(() => {
    if (webViewRef && isFocused) {
      webViewRef.current?.injectJavaScript(
        `window.location.href=("${WebViewUrlsHelpers?.filtersPage}?${paramFilter}");`,
      );
      sendPageFilters();
    }
    setSearchModalIsOpen(false);
  }, [isFocused, navigation]);

  return (
    <>
      {/* <Header /> */}
      <Box className={'flex-1 pt-2 bg-white'} testID="filterContainer">
        {areTrackingValuesSet
          ? <LCWebView
          testID="filters-Announce-webview"
          key={key}
          screen="Filters"
          ref={webViewRef}
          url={WebViewUrlsHelpers?.filtersPage}
          injectedJavaScriptBeforeContentLoaded={jsCode}
          //when our webView starts loading i make the reference in atom
          onLoadStart={() =>
            webViewRef &&
            webViewRef?.current &&
            setFilterWebViewRef(webViewRef.current)
          }
          onLoad={event => {
            const title = event.nativeEvent.title;
            if (title && title !== 'Webpage not available') {
              globalThis.isFilterLoaded = true;
            }
            setIsPageLoaded(true);
          }}
          onMessage={event => {
            const response = event.nativeEvent.data;
            if (response.includes('visitor_id')) {
              const visitor_id = getCookie(response, 'visitor_id');
              setVisitorId(visitor_id);
            } else if (response && response === 'openSaveSearchModal') {
              setSearchModalIsOpen(true);
            } else if (response.includes('hideHeader')) {
              setIsHeaderHidden(true);
            } else if (response.includes('showHeader')) {
              setIsHeaderHidden(false);
            }
            if (
              response.includes('type:"Favoris"') ||
              response.includes('"type":"Favoris"')
            ) {
              const object = JSON.parse(response);
              if (object.data) {
                let parsedArrayFavorits = JSON.parse(object.data);

                if (parsedArrayFavorits.length > 0) {
                  // ajouter addDate de localstorage vers data api car l'api ne contient pas addDate

                  parsedArrayFavorits =
                    parsedArrayFavorits &&
                    parsedArrayFavorits.length !== 0 &&
                    parsedArrayFavorits.map(fav => {
                      return {
                        ...fav,
                      };
                    });
                  const referencesLocalstorage = parsedArrayFavorits
                    .map(fav => fav && fav.classifiedReference)
                    .filter(Boolean);
                  const referencesAtom = favoritesNotConnected
                    .map(fav => {
                      if (fav.classifiedReference) {
                        return fav.classifiedReference;
                      }
                      if (fav.classified && fav.classified.reference) {
                        return fav.classified.reference;
                      }
                    })
                    .filter(Boolean);
                  // Update the list of favorites if needed
                  if (!areEquals(referencesAtom, referencesLocalstorage)) {
                    setFavorites((prev: any) => ({
                      ...prev,
                      favoriteNotConnected: parsedArrayFavorits,
                    }));
                  }
                } else {
                  // Clear the list of favorites if it was populated to be make sure all the the list be empty
                  if (favoritesNotConnected.length) {
                    setFavorites((prev: any) => ({
                      ...prev,
                      favoriteNotConnected: [],
                    }));
                  }
                }
              }
            } else if (response.includes('{"cmpData":')) {
              const cmpDataInfo = JSON.parse(response);
              if (cmpDataInfo && cmpDataInfo.cmpData) {
                updateAccessToken(
                  cmpDataInfo.cmpData === 'accepté' ? 'optin' : 'exempt',
                );
              }
              webViewRef.current?.injectJavaScript(INJECT_JS_GET_COOKIES);
            } else if (response.includes('atPrivacy=')) {
              processCookies(event);
            }
          }}
          onShouldStartLoadWithRequest={state => {
            //const filterParam = getRestOfStringFrom(state.url, '?');
            if (state.url.includes(WebViewUrlsHelpers?.listingPage)) {
              webViewRef.current?.stopLoading();
              if (state.url.includes('?')) {
                //check if worth to set Filters

                setFilters(getRestOfStringFrom(state.url, '?'));
              } else {
                // no filters selected
                setFilters('');
                webViewRef.current?.injectJavaScript(
                  `window.location.href=("${WebViewUrlsHelpers?.filtersPage}");`,
                );
              }
              if (searchModalIsOpen) {
                navigation.navigate('Listing', {buttonSavedClicked: true});
                return false;
              } else {
                navigation.navigate('Listing', {previous_screen: 'Filters'});
                return false;
              }
            }
            return true;
          }}
        />
        : <LCWebView 
          ref={webViewRef}
          key={key}
          screen="AppEmptyBeforeFilters"
          url={WebViewUrlsHelpers.webEmpty}
          onLoad={() => {
            setIsPageLoaded(true);
          }}
          onShouldStartLoadWithRequest={() => true}
        />
        }
        
      </Box>
    </>
  );
}
