import React, {useEffect, useLayoutEffect} from 'react';
import 'react-native-url-polyfill/auto';
import {PagesToOpenInBrowser, WebViewUrlsHelpers} from '../config/constants';
import AnnounceState from '../recoil/announce';
import {ErrorState, FavoriteState} from '../recoil';
import {useGetFiltersParam} from '../recoil/filtersParam';
import {
  Animated,
  DeviceEventEmitter,
  Linking,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {BellIcon, CheckedIcon, ErrorIconToast} from '../components/Icon';
import {useSetRecoilState} from 'recoil';
import LCWebView from '../components/CustomWebView';

import {useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {
  INJECT_BOOKMARKS_ONLY,
  INJECT_TC_VARS_GET_INFO,
  INJECT_JS_GET_COOKIES,
} from '../config/constantString';
import {areEquals} from '../utils/compareArray';
import {
  getConvertedAnnounceIdToAscii,
  renderTitleModal,
} from '../utils/functionString';
import {tcVarsWebToTcVarsNative} from '../utils/functionHashMap';
import TrackingInfoSingleton from '../utils/singleton/TrackingInfoSingleton';
import {
  sendPageListing,
  sendGoBackActionClick,
  sendOpenSavedSearchModal,
  sendOpenSavedSearchConnectionModal,
  sendClickOnSavedSearchConnectionModal,
  sendClickOnSavedSearchModal,
} from '../utils/tagCommander';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import mainStyles from '../styles/styles';
import {
  BottomModal,
  Box,
  LoginModalContent,
  SearchParamsModalContent,
  Header,
  Text,
  BottomConnexionModal,
} from '../components';
import classNames from 'classnames';
import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import useBottomModal from '../hooks/useBottomModal';
import {getIsConnected, getToken} from '../utils/getUserInformations';
import {processCookies} from '../utils/processCookies';
import savedSearchesStorage from '..//storage/savedSearch';
import UserState from '../recoil/connectedUser';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {addSearchSaved} from '../hooks/useSavedSearch';
import {transformValuesToApi} from '../utils/transformFilterTagsIntoLabels/serviceSearchModels';

//if width of device >600 like ipad we inject this script into meta to chage the width
const viewPort = `var metaTag = document.createElement('meta');
// Set attributes for the meta element
metaTag.setAttribute('name', 'viewport');
metaTag.setAttribute('content', 'user-scalable=no, width=800, shrink-to-fit=no');
// Get the head element of the document
var head = document.head || document.getElementsByTagName('head')[0];
// Append the meta element to the head
head.appendChild(metaTag)`;

export default function Listing({navigation}: {navigation: any}) {
  const setAnnounceId = useSetRecoilState(AnnounceState.announce);
  const route = useRoute();
  const isConnected = getIsConnected();
  const buttonSavedClicked = route.params?.buttonSavedClicked || false;
  const {width, height} = useWindowDimensions();
  const ANIMATED_MAX_BUTTON_WIDTH = width - 40;
  const ANIMATED_MIN_BUTTON_WIDTH = 48;
  const jsCode = `${width > 800 ? viewPort : ''}
  window.ReactNativeWebView.postMessage(document.cookie);
  window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    window.ReactNativeWebView.postMessage(JSON.stringify({action:"scroll",scroll}));//to recuperate the position of vertical scorlling in number and make it on action attribute
});
  `; //(for tablet)to limit the page width
  const favoritesNotConnected = FavoriteState.useGet()?.favoriteNotConnected;
  const setFavorites = FavoriteState.useSet();
  const [sortBy, setSortBy] = useState('');
  const webViewRef = useRef<WebView>(null);
  //its a value in which i make the initial value of width animated
  const scaleAnimate = useRef(
    new Animated.Value(ANIMATED_MAX_BUTTON_WIDTH),
  ).current;
  const filtersParam = useGetFiltersParam();

  const [key, _] = React.useState(1);
  const setWebViewRef = FavoriteState.useSetWebViewRefListing();
  const announce = AnnounceState.useGet();
  const announceConverted = getConvertedAnnounceIdToAscii(announce);
  const isFocused = useIsFocused();
  const [searchButtonShown, setSearchButtonShown] = React.useState(false);
  const favorieStateChange = FavoriteState.useGetFavorieStateChange();
  const setFavorieStateChange = FavoriteState.useSetFavorieStateChange();
  const [favoriteIsClicked, setFavoriteIsClicked] = React.useState(false);
  //its a state when i recuperate the position of scrolling i saved here
  const [scroll, setScroll] = React.useState(0);
  //here i am making the position of CTA
  const {actionSheetRef, onCloseActionSheet} = useBottomModal();
  const [position, setPosition] = React.useState('start');
  const [saveIsSubmited, setSaveIsSubmited] = React.useState(false);
  const [modalBottomDisplay, setModalBottomDisplay] = React.useState(
    'SearchParamsModalContent',
  );
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = React.useState(false);
  const modalSavedButton = useRef(false);
  const ctaState = useRef(false);
  const [headerTitle, setHeaderTitle] = React.useState('');
  const [listingIsPaginated, setListingIsPaginated] =
    React.useState<boolean>(false);
  const [savedSearchValue, setSavedSearchValue] = React.useState({});
  const setLoginPageState = UserState.useSetActiveAccountTabPage();
  const errors = ErrorState.useGet();
  const {error} = errors;
  const [isNotificationSearchSave, setIsNotificationSearchSave] =
    React.useState(false);
  const [savedSearchLabels, setSavedSearchLabels] = React.useState<string[]>(
    [],
  );

  const [urlWithPagination, setUrlWithPagination] = React.useState('');
  React.useEffect(() => {
    const subscribe = navigation.addListener('blur', () => {
      Platform.OS === 'android' && webViewRef?.current?.clearCache(true); //in android we must to clean ram cache to avoid the cumulate js injection but with iOS useKit do this automaticlly
    });

    return subscribe;
  }, [webViewRef, navigation]);

  const updateSortAndPage = (url: string) => {
    setListingIsPaginated(true);
    webViewRef.current?.injectJavaScript(
      `window.location.href=("${url.replace(
        '.fr/listing',
        '.fr/app-listing',
      )}");`,
    );
  };

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('listingPA', 'annonce');
    });
    DeviceEventEmitter?.addListener('reloadListing', () => {
      webViewRef?.current?.reload();
    });
  }, [navigation]);

  React.useEffect(() => {
    if (isPageLoaded) {
      // We have to be sure that the page is fully loaded to get tc_vars
      webViewRef &&
        webViewRef?.current &&
        webViewRef.current?.injectJavaScript(
          INJECT_BOOKMARKS_ONLY + INJECT_TC_VARS_GET_INFO,
        );
    }
  }, [isPageLoaded]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => Header(isHeaderHidden, headerTitle),
    });
  }, [isHeaderHidden, headerTitle, navigation]);

  React.useEffect(() => {
    if (isFocused) {
      sendPageListing();
      if (!isConnected) {
        webViewRef.current?.injectJavaScript(INJECT_JS_GET_COOKIES);
        globalThis.listingIsLoaded = true;
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (webViewRef && isFocused) {
      // if (favorieStateChange && listingIsPaginated && urlWithPagination) {
      //   updateSortAndPage(urlWithPagination);
      //  }
      if (announce) {
        Platform?.OS === 'android' &&
          webViewRef?.current?.injectJavaScript(`window.location.reload();`);
        setAnnounceId('');
      } else if (favorieStateChange) {
        webViewRef.current?.injectJavaScript(
          `window.location.href=("${WebViewUrlsHelpers?.listingPage}?${
            filtersParam + (sortBy ? `&${sortBy}` : '')
          }");`,
        );
      }
      setFavorieStateChange(false);
      // set state change false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, navigation, favorieStateChange]);
  const _renderAnimation = response => {
    const object = JSON.parse(response);

    if (object.scroll > 0 && scroll === 0) {
      setScroll(object.scroll);
      setPosition('end');
      //here to make bull animation without text
      Animated.timing(scaleAnimate, {
        toValue: ANIMATED_MIN_BUTTON_WIDTH,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {});
      //here to make animation with text when i have search saved
    } else {
      if (scroll !== 0 && object.scroll === 0) {
        setScroll(0);
        Animated.timing(scaleAnimate, {
          toValue: ANIMATED_MAX_BUTTON_WIDTH,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          setPosition('center');
        });
      }
    }
  };

  const _saveParams = (isOn: boolean) => {
    setIsNotificationSearchSave(isOn);
    sendClickOnSavedSearchModal(
      isOn,
      buttonSavedClicked ? 'filtresRecherche' : 'listingPA',
    );
    if (!isConnected) {
      sendOpenSavedSearchConnectionModal();
      setModalBottomDisplay('LoginModalContent');
      setSaveIsSubmited(true);
      modalSavedButton.current = false;
    } else {
      //save params script when i am already connected
      actionSheetRef.current.setModalVisible(false);
      const searchParams = transformValuesToApi(savedSearchValue);

      addSearchSaved(
        {token: getToken(), searchParams, isOn},
        (err: any, response: any) => {
          if (err) {
            if (err.toString().includes('403')) {
              return;
            }
            showMessage({
              renderCustomContent: () => (
                //i will refaco this after when i have time
                <Box style={mainStyles.toastSuccess}>
                  <Box className="mr-[8]">
                    <ErrorIconToast />
                  </Box>
                  <Box>
                    <Text style={mainStyles.toastText}>
                      Une erreur est survenue, réessayer
                    </Text>
                  </Box>
                </Box>
              ),
              message: '',
              backgroundColor: 'transparent',
              duration: 1000,
            });
            return;
          }
          if (response === 200 || response === 201) {
            showMessage({
              renderCustomContent: () => (
                //i will refaco this after when i have time
                <Box
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={mainStyles.toastSuccess}>
                  <Box className="mr-[8]">
                    <CheckedIcon />
                  </Box>
                  <Box>
                    <Text style={mainStyles.toastText}>
                      Votre recherche a bien été enregistrée
                    </Text>
                  </Box>
                </Box>
              ),
              message: '',
              backgroundColor: 'transparent',
              duration: 1000,
            });
            setSearchButtonShown(false);
          }
        },
      );
      setSearchButtonShown(false);
      savedSearchesStorage.setNewSavedSearch(filtersParam);
      setSaveIsSubmited(false);
      ctaState.current = false;
      modalSavedButton.current = true;
    }
  };
  useFocusEffect(() => {
    if (isConnected && saveIsSubmited) {
      //save params when login succeded
      _saveParams(isNotificationSearchSave);
      setSaveIsSubmited(false);
    }
  });
  const IsVertical = (filter: string) => {
    if (
      filter === 'vertical=truck' ||
      filter === 'vertical=moto' ||
      filter === 'vertical=scooter' ||
      filter === 'vertical=quad'
    ) {
      return true;
    } else {
      return false;
    }
  };
  React.useEffect(() => {
    const savedSearchLabelsLength = savedSearchLabels.filter(Boolean).length;
    if (
      buttonSavedClicked &&
      filtersParam &&
      // nativeEvent.url.includes('app-listing') &&
      savedSearchLabelsLength >= 1 &&
      modalSavedButton.current === false
    ) {
      actionSheetRef.current?.setModalVisible(true);
    }
    if (!isConnected && favoriteIsClicked) {
      actionSheetRef.current?.setModalVisible(true);
    }
  }, [savedSearchLabels, saveIsSubmited, isConnected, favoriteIsClicked]);
  const onShoulStart = ({url, mainDocumentURL}: any) => {
    if (
      url.includes(WebViewUrlsHelpers.autoAnnouceDetails) ||
      url.includes(WebViewUrlsHelpers.utilAnounceDetails) ||
      url.includes(WebViewUrlsHelpers.quadAnounceDetails) ||
      url.includes(WebViewUrlsHelpers.motoAnounceDetails) ||
      url.includes(WebViewUrlsHelpers.scooterAnounceDetails)
    ) {
      const announceId = url.slice(
        url.lastIndexOf('-') + 1,
        url.lastIndexOf('.html'),
      );
      const matchResult = url.match(/\b(moto|auto)\b/i);
      let vertical = 'auto';
      if (matchResult) {
        vertical = matchResult[0];
      }
      setAnnounceId(announceId);
      webViewRef?.current?.stopLoading();
      navigation.navigate('AnnounceDetail', {
        announceId,
        vertical,
      });
      return true;
    } else if (url.includes(WebViewUrlsHelpers.filtersPage)) {
      navigation.goBack();
    } else if (
      PagesToOpenInBrowser.some(urlToCatch => url.includes(urlToCatch)) ||
      (!url.includes(WebViewUrlsHelpers.baseUrl) &&
        !mainDocumentURL.includes(WebViewUrlsHelpers.baseUrl)) //check the url and mainDocumentURL to check if we need to open the phone's browser
    ) {
      Linking.openURL(url);
      return false;
    }
    if (
      url.includes(WebViewUrlsHelpers.listingPage) &&
      url.includes('&page=')
    ) {
      const newUrl = new URL(url);
      const pageParam = newUrl.searchParams.get('page');
      if (pageParam !== null && !url.includes('#')) {
        setUrlWithPagination(url);
      }
    } else if (
      url.includes(WebViewUrlsHelpers.listingPage) &&
      !url.includes('&page=') &&
      url.includes('sortBy=')
    ) {
      const newUrl = new URL(url);
      const pageParam = newUrl.searchParams.get('sortBy');
      setUrlWithPagination('');

      setSortBy(pageParam ? `sortBy=${pageParam}` : '');
    }
    return true;
  };

  return (
    <>
      {/* <Header /> */}
      <Box className="flex-1" testID="searchContainer">
        <LCWebView
          testID="webview"
          screen="Listing"
          key={key}
          ref={webViewRef}
          injectedJavaScript={jsCode}
          onLoadStart={() => {
            webViewRef &&
              webViewRef?.current &&
              setWebViewRef(webViewRef.current);
          }}
          url={
            WebViewUrlsHelpers?.listingPage +
            '?' +
            filtersParam +
            (sortBy ? `&${sortBy}` : '')
          }
          onShouldStartLoadWithRequest={onShoulStart}
          onMessage={event => {
            //console.log({event: event.nativeEvent.data});
            const response = event.nativeEvent.data;
            if (response.includes('app:click:favorite')) {
              setFavoriteIsClicked(!favoriteIsClicked);
            }
            if (response.includes('savedSearch')) {
              const object = JSON.parse(response);
              setSavedSearchValue(object?.savedSearch);
              const finalArray: any = Object.values(object.savedSearchLabels)
                .flat(Infinity)
                .filter(Boolean);
              const widthPerWordLength = width / 110;
              const slice = finalArray.slice(0, Math.trunc(widthPerWordLength));
              const restOfArray = finalArray.length - slice.length;
              if (restOfArray > 0) {
                slice.push('+' + restOfArray);
              }
              object && setSavedSearchLabels(slice);
            }

            //here when im recuperating the scroll value i can do my script
            if (response.includes('"action":"scroll"')) {
              _renderAnimation(response);
            } else if (
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
                    .map(fav => fav.classifiedReference)
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
            } else if (response.includes('Piano_')) {
              //tc_vars datas
              if (tcVarsWebToTcVarsNative(JSON.parse(response)) != null) {
                TrackingInfoSingleton.tcVars = tcVarsWebToTcVarsNative(
                  JSON.parse(response),
                );
              }
            } else if (response.includes('atPrivacy=')) {
              processCookies(event);
            } else if (response.includes('hideHeader')) {
              setIsHeaderHidden(true);
            } else if (response.includes('showHeader')) {
              setIsHeaderHidden(false);
            } else if (response.includes('{"searchData":{"announceCount":')) {
              const searchInfos = JSON.parse(response);
              setHeaderTitle(
                (searchInfos.searchData.announceCount || '') + ' annonces',
              );
            }
          }}
          onLoad={({nativeEvent}) => {
            setIsPageLoaded(true);
            if (
              filtersParam &&
              !listingIsPaginated &&
              !modalSavedButton.current
            ) {
              // setSearchButtonShown(true);
              ctaState.current = true;
            }
            setIsHeaderHidden(nativeEvent.url.includes('#modal'));
          }}
        />
        {/* to display the button when i have only one parameter of search */}
        {filtersParam &&
          ctaState.current === true &&
          !buttonSavedClicked &&
          !filtersParam.includes('isSavedSearch=true') &&
          !IsVertical(filtersParam) &&
          error === null &&
          !isHeaderHidden && (
            <Box
              className={classNames({
                'absolute bottom-1 p-2 right-5 left-4 flex flex-row justify-center':
                  true,
                'justify-end': position === 'end',
              })}>
              <ButtonWithIcon
                leftIcon={<BellIcon />}
                showTitle={scroll === 0}
                onPress={() => {
                  if (isConnected) {
                    sendOpenSavedSearchModal();
                  }
                  actionSheetRef.current.setModalVisible(true);
                }}
                title="Enregistrer ma recherche"
                textStyle={mainStyles.textAnimatedButton}
                style={{
                  ...mainStyles.animatedButtonFlatButton,
                  width: scaleAnimate,
                }}
              />
            </Box>
          )}
        <BottomModal
          title={renderTitleModal(isConnected, modalBottomDisplay)}
          height={modalBottomDisplay === 'SearchParamsModalContent' ? 266 : 242}
          closeOnTouchBackdrop={true}
          style={mainStyles.actionSheetContainerSearch}
          actionSheetRef={actionSheetRef}
          onClose={() => {
            actionSheetRef.current.setModalVisible(false);
            modalSavedButton.current = true;
            setModalBottomDisplay('SearchParamsModalContent');
          }}>
          {!isConnected &&
          modalBottomDisplay === 'LoginModalContent' &&
          modalSavedButton.current === false ? (
            <LoginModalContent
              onPress={() => {
                !isConnected &&
                  modalBottomDisplay === 'LoginModalContent' &&
                  modalSavedButton.current === false &&
                  actionSheetRef.current.setModalVisible(false);
                sendClickOnSavedSearchConnectionModal();
                setLoginPageState('LOGIN');
                navigation.navigate('Login', {lastScreen: 'Listing'});
                modalSavedButton.current === true;
              }}
            />
          ) : (
            <SearchParamsModalContent
              onSaveParams={_saveParams}
              searchParam={savedSearchLabels}
            />
          )}
        </BottomModal>

        <BottomConnexionModal
          actionSheetRef={actionSheetRef}
          onClose={onCloseActionSheet}
        />

        <FlashMessage position="bottom" />
      </Box>
    </>
  );
}
